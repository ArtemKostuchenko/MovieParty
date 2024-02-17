import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { json } from 'body-parser';
import connectToDB from './db/connection';
import authRouter from './routes/auth.route';
import genreRouter from './routes/genre.route';
import listRouter from './routes/list.route';
import countryRouter from './routes/country.route';
import actorRouter from './routes/actor.route';
import directorRouter from './routes/director.route';
import partRouter from './routes/part.route';
import selectionRouter from './routes/selection.route';
import reviewRouter from './routes/review.route';
import videoContentRouter from './routes/content.route';
import roomRouter from './routes/room.route';
import errorMiddleware from './middlewares/error.middleware';
import RoomRepository from './repositories/room.repository';
import MessageRepository from './repositories/message.repository';
import { Types } from 'mongoose';
import passport from 'passport';
import './config/passportGoogleAuth';
import './config/passportJWT';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { authenticatedUser } from './middlewares/auth.middleware';


dotenv.config();

const app = express();

app.use(json());

app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.1.59:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(cookieParser());

app.use(cookieSession({
    name: 'google-auth-session',
    keys: [process.env.COOKIE_SECRET as string]
}));

app.use(passport.initialize());
app.use(passport.session());

// routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/lists', listRouter);
app.use('/api/v1/countries', countryRouter);
app.use('/api/v1/actors', actorRouter);
app.use('/api/v1/directors', directorRouter);
app.use('/api/v1/parts', partRouter);
app.use('/api/v1/selections', selectionRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/content/v/', videoContentRouter);
app.use('/api/v1/rooms', roomRouter);

// middleware
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectToDB(process.env.MONGO_URI!);

        const server = createServer(app);

        const io = new Server(server, {
            cors: {
                origin: ['http://localhost:3000', 'http://192.168.1.59:3000'],
                credentials: true,
            }
        });

        io.on('connection', async (socket) => {
            try {
                const user = await authenticatedUser(socket.handshake.auth.user._id);

                socket.on('join_room', async (roomId) => {
                    const existUser = await RoomRepository.existUserInRoom(roomId, new Types.ObjectId(user._id));

                    if (existUser) {
                        await RoomRepository.connectUser(roomId, user._id);

                        socket.join(roomId);
                        socket.roomId = roomId;

                        console.log(`User ${user.nickname} connected to room`);
                    } else {
                        socket.emit('connection_error');
                    }

                });

                socket.on('send_message', async (data) => {
                    const roomId: string = socket.roomId as string;
                    if (roomId) {

                        await MessageRepository.addMessage({
                            roomId: new Types.ObjectId(roomId),
                            userId: user._id,
                            message: data.message
                        });

                        const messages = await MessageRepository.getLastMessagesByRoomId(roomId);

                        socket.to(roomId).emit('receive_messages', messages);
                        io.to(socket.id).emit('receive_messages', messages);
                    }
                });

                socket.on('handle_play', (data) => {
                    const roomId: string = socket.roomId as string;
                    if (roomId) {
                        socket.to(roomId).emit('control_play', data);
                    }
                });

                socket.on('handle_seek', (data) => {
                    const roomId: string = socket.roomId as string;
                    if (roomId) {
                        socket.to(roomId).emit('control_seek', data);
                    }
                });

                socket.on('save_time', async (data) => {
                    const roomId: string = socket.roomId as string;
                    if (roomId) {
                        await RoomRepository.updateTime(roomId, user._id, data);
                    }
                })

                socket.on('disconnect', async () => {
                    const roomId: string = socket.roomId as string;

                    if (roomId) {
                        await RoomRepository.disconnectUser(roomId, user._id);
                    }

                    console.log(`User ${user.nickname} disconnected room`);
                })
            } catch (err) {
                console.log(err);
            }
        });

        server.listen(port, () => {
            console.log(`Server is listening on ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start();