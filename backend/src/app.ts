import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { json } from "body-parser";
import connectToDB from "./db/connection";
import authRouter from "./routes/auth.route";
import genreRouter from "./routes/genre.route";
import listRouter from "./routes/list.route";
import countryRouter from "./routes/country.route";
import actorRouter from "./routes/actor.route";
import directorRouter from "./routes/director.route";
import partRouter from "./routes/part.route";
import selectionRouter from "./routes/selection.route";
import reviewRouter from "./routes/review.route";
import videoContentRouter from "./routes/content.route";
import roomRouter from "./routes/room.route";
import typeContentRouter from "./routes/type-content.route";
import errorMiddleware from "./middlewares/error.middleware";
import RoomRepository from "./repositories/room.repository";
import MessageRepository from "./repositories/message.repository";
import { Types } from "mongoose";
import passport from "passport";
import "./config/passportGoogleAuth";
import "./config/passportJWT";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import { authenticatedUser } from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

// static

app.use("/api/v1/static/files", express.static(__dirname + "/files"));

app.use(json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.59:3000",
      process.env.CLIENT_URL!,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(cookieParser());

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: [process.env.COOKIE_SECRET as string],
    maxAge: 24 * 60 * 60 * 1000 * 31,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/lists", listRouter);
app.use("/api/v1/countries", countryRouter);
app.use("/api/v1/actors", actorRouter);
app.use("/api/v1/directors", directorRouter);
app.use("/api/v1/parts", partRouter);
app.use("/api/v1/selections", selectionRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/content/v/", videoContentRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/content/type", typeContentRouter);

// middleware
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI!);

    const server = createServer(app);

    const io = new Server(server, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://192.168.1.59:3000",
          process.env.CLIENT_URL!,
        ],
        credentials: true,
      },
    });

    io.use(async (socket, next) => {
      try {
        const userId = socket.handshake.auth.user._id;
        const user = await authenticatedUser(userId);
        socket.user = user;
        next();
      } catch (e) {
        console.log(e);
        return next(new Error("Authentication invalid"));
      }
    });

    io.on("connection", (socket) => {
      socket.join(socket.user?._id);

      socket.on("join", async (roomId) => {
        console.log(socket.user?.nickname);

        const existUser = await RoomRepository.existUserInRoom(
          roomId,
          socket.user?._id
        );

        if (existUser) {
          await RoomRepository.connectUser(roomId, socket.user?._id);

          socket.join(roomId);
          socket.roomId = roomId;

          console.log(`User ${socket.user?.nickname} connected to room`);

          socket.to(roomId).emit("update_live");
          socket.emit("update_live");

          const messages = await MessageRepository.getLastMessagesByRoomId(
            roomId
          );

          socket.to(roomId).emit("receive_messages", messages);
          socket.emit("receive_messages", messages);
        } else {
          socket.emit("connection_error");
        }
      });

      socket.on("send_message", async (data) => {
        const roomId: string = socket.roomId!;

        if (roomId) {
          await MessageRepository.addMessage({
            roomId: new Types.ObjectId(roomId),
            userId: socket.user?._id,
            message: data.message,
          });

          const messages = await MessageRepository.getLastMessagesByRoomId(
            roomId
          );

          socket.to(roomId).emit("receive_messages", messages);
          socket.emit("receive_messages", messages);
        }
      });

      socket.on("seek", (data) => {
        const roomId: string = socket.roomId!;
        if (roomId) {
          socket.to(roomId).emit("seek", data);
        }
      });

      socket.on("disconnect", async () => {
        const roomId: string = socket.roomId!;

        if (roomId) {
          await RoomRepository.disconnectUser(roomId, socket.user?._id);
          socket.to(roomId).emit("update_live");
        }

        console.log(`User ${socket.user?.nickname} disconnected room`);
      });
    });

    server.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
