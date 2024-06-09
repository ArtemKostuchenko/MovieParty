import { VideoContent } from "../models/content.model";
import fs from "fs";
import path from "path";

export const generateAvatarColorHex = (): string => {
  const red: number = Math.floor(Math.random() * 128) + 64;
  const green: number = Math.floor(Math.random() * 128) + 64;
  const blue: number = Math.floor(Math.random() * 128) + 64;

  const redHex: string = red.toString(16).padStart(2, "0");
  const greenHex: string = green.toString(16).padStart(2, "0");
  const blueHex: string = blue.toString(16).padStart(2, "0");

  return `#${redHex}${greenHex}${blueHex}`;
};

export const cookieExtractor = (req: any): string | null => {
  let token: string | null = null;

  if (req && req.cookies) {
    token = req.cookies["_api_token"];
  }

  return token;
};

export const convertBodyVideoContent = (
  videoContent: VideoContent
): VideoContent => {
  if (
    videoContent.originCountries &&
    !Array.isArray(videoContent.originCountries)
  ) {
    videoContent.originCountries = JSON.parse(videoContent.originCountries);
  }

  if (videoContent.genres && !Array.isArray(videoContent.genres)) {
    videoContent.genres = JSON.parse(videoContent.genres);
  }

  if (videoContent.actors && !Array.isArray(videoContent.actors)) {
    videoContent.actors = JSON.parse(videoContent.actors);
  }

  if (videoContent.directors && !Array.isArray(videoContent.directors)) {
    videoContent.directors = JSON.parse(videoContent.directors);
  }

  if (videoContent.lists && !Array.isArray(videoContent.lists)) {
    videoContent.lists = JSON.parse(videoContent.lists);
  }

  if (videoContent.soundTracks && !Array.isArray(videoContent.soundTracks)) {
    videoContent.soundTracks = JSON.parse(videoContent.soundTracks);
  }

  if (videoContent.seasons && !Array.isArray(videoContent.seasons)) {
    if (videoContent.seasons === "undefined") {
      videoContent.seasons = [];
    } else {
      videoContent.seasons = JSON.parse(videoContent.seasons);
    }
  }

  return videoContent;
};

export const capitalizeFirstLetter = (string: string): string => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const deleteFile = async (fileName: string) => {
  try {
    fs.unlink(fileName, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {}
};
