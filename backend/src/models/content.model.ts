import mongoose, { Schema, Document, Types } from "mongoose";

interface M3U8Link extends Document {
  quality: string;
  m3u8URL: string;
}

interface SoundTrack extends Document {
  title: string;
  m3u8Links: M3U8Link[];
}

interface Episode extends Document {
  name: string;
  status: string;
  available: boolean;
  releaseDate: Date;
  soundTracks: SoundTrack[];
}

interface Season extends Document {
  title: string;
  previewURL: string;
  backgroundURL?: string;
  episodes: Episode[];
}

export interface VideoContent extends Document {
  title: string;
  originTitle: string;
  typeVideoContent: Types.ObjectId;
  IMDb: number;
  description: string;
  rating: number;
  releaseDate: Date;
  duration: string;
  previewURL: string;
  backgroundURL?: string;
  trailerURL?: string;
  originCountries: Types.ObjectId[];
  genres: Types.ObjectId[];
  actors: Types.ObjectId[];
  directors: Types.ObjectId[];
  lists: { idList: Types.ObjectId; placeInList?: number }[];
  part: Types.ObjectId;
  reviews: Types.ObjectId[];
  soundTracks: SoundTrack[];
  seasons: Season[];
}

const M3U8LinkSchema: Schema = new Schema({
  quality: {
    type: String,
    required: [true, "Please provide title"],
  },
  m3u8URL: {
    type: String,
    required: [true, "Please provide m3u8URL"],
  },
});

const SoundTrackSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  m3u8Links: [M3U8LinkSchema],
});

const EpisodeSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  status: {
    type: String,
    required: [true, "Please provide status"],
  },
  available: {
    type: Boolean,
    default: false,
  },
  releaseDate: {
    type: Date,
    required: [true, "Please provide releaseDate"],
  },
  soundTracks: [SoundTrackSchema],
});

const SeasonSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  previewURL: {
    type: String,
    required: [true, "Please provide previewURL"],
  },
  backgroundURL: {
    type: String,
  },
  episodes: [EpisodeSchema],
});

const VideoContentSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  originTitle: {
    type: String,
    required: [true, "Please provide originTitle"],
  },
  typeVideoContent: {
    type: Types.ObjectId,
    required: true,
  },
  IMDb: {
    type: Number,
    required: [true, "Please provide IMDb"],
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  releaseDate: {
    type: Date,
    required: [true, "Please provide releaseDate"],
  },
  duration: {
    type: String,
    required: [true, "Please provide duration"],
  },
  previewURL: {
    type: String,
    required: [true, "Please provide previewURL"],
  },
  backgroundURL: {
    type: String,
  },
  trailerURL: {
    type: String,
  },
  originCountries: [
    {
      type: Types.ObjectId,
      ref: "Country",
    },
  ],
  genres: [
    {
      type: Types.ObjectId,
      ref: "Genre",
    },
  ],
  actors: [
    {
      type: Types.ObjectId,
      ref: "Actor",
    },
  ],
  directors: [
    {
      type: Types.ObjectId,
      ref: "Director",
    },
  ],
  lists: [
    {
      idList: {
        type: Types.ObjectId,
        ref: "List",
      },
      placeInList: {
        type: Number,
      },
    },
  ],
  part: {
    type: Types.ObjectId,
    ref: "Part",
  },
  reviews: [
    {
      type: Types.ObjectId,
      ref: "Review",
    },
  ],
  soundTracks: [SoundTrackSchema],
  seasons: [SeasonSchema],
});

export default mongoose.model<VideoContent>("VideoContent", VideoContentSchema);
