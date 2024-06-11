import { Types } from "mongoose";
import { Actor } from "../models/actor.model";
import { Director } from "../models/director.model";
import { User, User as UserType } from "../models/user.model";

declare global {
  namespace Express {
    export interface User extends UserType {}
  }
}

declare module "socket.io" {
  interface Socket {
    roomId?: string;
    user?: User;
  }
}

export interface Room {
  roomId: string;
  isPlaying: boolean;
  time: number;
  season: number;
  episode: number;
}

export interface JWTPayload {
  _id: Types.ObjectId;
  nickname: string;
}

export interface ActorWithAge {
  actor: Actor;
  age: number | string;
}

export interface DirectorWithAge {
  director: Director;
  age: number | string;
}

export interface UserToken {
  user: UserType;
  token: string;
}
