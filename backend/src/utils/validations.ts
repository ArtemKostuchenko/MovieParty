import { BadRequestError } from "../errors";
import { VideoContent } from "../models/content.model";
import { Actor } from "../models/actor.model";
import { Director } from "../models/director.model";
import { Room } from "../models/room.model";
import { Message } from "../models/message.model";
import { TypeContent } from "../models/type-content.model";

const emitErrors = (errors: string[]) => {
  if (errors.length > 0) {
    throw new BadRequestError(`Please provide ${errors.join(", ")}`);
  }
};

const validateVideoContent = (videoContent: VideoContent): VideoContent => {
  const errors: string[] = [];

  if (!videoContent.title) {
    errors.push("title");
  }

  if (!videoContent.originTitle) {
    errors.push("originTitle");
  }

  if (!videoContent.typeVideoContent) {
    errors.push("typeVideoContent");
  }

  if (!videoContent.IMDb) {
    errors.push("IMDb");
  }

  if (!videoContent.description) {
    errors.push("description");
  }

  if (!videoContent.releaseDate) {
    errors.push("releaseDate videoContent");
  }

  if (!videoContent.duration) {
    errors.push("duration");
  }

  if (!videoContent.previewURL) {
    errors.push("preview videoContent");
  }

  if (!videoContent.originCountries) {
    errors.push("originCountries");
  } else if (!Array.isArray(videoContent.originCountries)) {
    videoContent.originCountries = JSON.parse(videoContent.originCountries);
    if (!Array.isArray(videoContent.originCountries)) {
      errors.push("originCountries");
    }
  } else if (videoContent.originCountries.length == 0) {
    errors.push("originCountries (must be 1 country)");
  }

  if (!videoContent.genres) {
    errors.push("genres");
  } else if (!Array.isArray(videoContent.genres)) {
    videoContent.genres = JSON.parse(videoContent.genres);
    if (!Array.isArray(videoContent.genres)) {
      errors.push("genres");
    }
  } else if (videoContent.genres.length == 0) {
    errors.push("genres (must be 1 genre)");
  }

  if (!videoContent.actors) {
    errors.push("actors");
  } else if (!Array.isArray(videoContent.actors)) {
    videoContent.actors = JSON.parse(videoContent.actors);
    if (!Array.isArray(videoContent.actors)) {
      errors.push("actors");
    }
  } else if (videoContent.actors.length == 0) {
    errors.push("actors (must be 1 actor)");
  }

  if (!videoContent.directors) {
    errors.push("directors");
  } else if (!Array.isArray(videoContent.directors)) {
    videoContent.directors = JSON.parse(videoContent.directors);
    if (!Array.isArray(videoContent.directors)) {
      errors.push("directors");
    }
  } else if (videoContent.directors.length == 0) {
    errors.push("directors (must be 1 director)");
  }

  if (!videoContent.lists) {
    errors.push("lists");
  } else if (!Array.isArray(videoContent.lists)) {
    videoContent.lists = JSON.parse(videoContent.lists);
    if (!Array.isArray(videoContent.lists)) {
      errors.push("lists");
    }
  }

  if (videoContent.soundTracks && !Array.isArray(videoContent.soundTracks)) {
    videoContent.soundTracks = JSON.parse(videoContent.soundTracks);
    if (!Array.isArray(videoContent.soundTracks)) {
      errors.push("soundTracks");
    }
  }

  if (videoContent.seasons && !Array.isArray(videoContent.seasons)) {
    if (videoContent.seasons === "undefined") {
      videoContent.seasons = [];
    } else {
      videoContent.seasons = JSON.parse(videoContent.seasons);
      if (!Array.isArray(videoContent.seasons)) {
        errors.push("seasons");
      }
    }
  }

  emitErrors(errors);

  return videoContent;
};

const validateActorDirector = (person: Actor | Director) => {
  const errors: string[] = [];

  if (!person.firstName) {
    errors.push("firstName");
  }

  if (!person.lastName) {
    errors.push("lastName");
  }

  if (!person.firstNameEng) {
    errors.push("firstNameEng");
  }

  if (!person.lastNameEng) {
    errors.push("lastNameEng");
  }

  if (!person.photoURL) {
    errors.push("photoURL");
  }

  if (!person.sex) {
    errors.push("sex");
  }

  if (!person.placeBirth) {
    errors.push("placeBirth");
  }

  emitErrors(errors);
};

const validateRoom = (room: Room) => {
  const errors: string[] = [];

  if (!room.ownerId) {
    errors.push("ownerId");
  }

  if (!room.videoContentId) {
    errors.push("videoContentId");
  }

  if (!room.title) {
    errors.push("title");
  }

  if (!room.description) {
    errors.push("description");
  }

  emitErrors(errors);
};

const validateMessage = (message: Message) => {
  const errors: string[] = [];

  if (!message.roomId) {
    errors.push("roomId");
  }

  if (!message.userId) {
    errors.push("userId");
  }

  if (!message.message) {
    errors.push("message");
  }

  emitErrors(errors);
};

const validateTypeContent = (typeContent: TypeContent) => {
  const errors: string[] = [];

  if (!typeContent.name) {
    errors.push("name");
  }

  if (!typeContent.path) {
    errors.push("path");
  }

  emitErrors(errors);
};

export {
  validateVideoContent,
  validateActorDirector,
  validateRoom,
  validateMessage,
  validateTypeContent,
};
