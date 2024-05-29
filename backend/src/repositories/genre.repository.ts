import GenreModel, { Genre } from "../models/genre.model";
import { BadRequestError, NotFoundError } from "../errors";

interface Query {
  $or?: object[];
}

class GenreRepository {
  constructor() {}

  async createGenre(genreData: Genre): Promise<Genre> {
    const { name, originName } = genreData;

    if (!name || !originName) {
      throw new BadRequestError("Please provide genre name, originName");
    }

    return await GenreModel.create(genreData);
  }

  async getGenreById(genreId: string): Promise<Genre> {
    const genre = await GenreModel.findById(genreId);

    if (!genre) {
      throw new NotFoundError("Genre not found");
    }

    return genre;
  }

  async updateGenreById(genreId: string, genreData: Genre): Promise<Genre> {
    const { name, originName } = genreData;

    if (!name || !originName) {
      throw new BadRequestError("Please provide genre name, originName");
    }

    const genre = await GenreModel.findById(genreId);

    if (!genre) {
      throw new NotFoundError("Genre not found");
    }

    genre.name = name || genre.name;
    genre.originName = originName || genre.originName;

    return await genre.save();
  }

  async deleteGenreById(genreId: string): Promise<void> {
    const genre = await GenreModel.findById(genreId);

    if (!genre) {
      throw new NotFoundError("Genre not found");
    }

    await genre.deleteOne();
  }

  async getGenres(
    query: any
  ): Promise<{ genres: Genre[]; totalCount: number }> {
    const { name, reg, fields, sort } = query;

    const queryObj: Query = {};

    if (name) {
      if (!queryObj.$or) {
        queryObj.$or = [];
      }
      if (reg) {
        const regex = new RegExp(name, "i");
        queryObj.$or = queryObj.$or.concat([
          { name: { $regex: regex } },
          { originName: { $regex: regex } },
        ]);
      } else {
        queryObj.$or = queryObj.$or.concat([
          { name: name },
          { originName: name },
        ]);
      }
    }

    let genresQuery = GenreModel.find(queryObj);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      genresQuery = genresQuery.sort(sortList);
    }

    if (fields) {
      const fieldList = fields.split(",").join(" ");
      genresQuery = genresQuery.select(fieldList);
    }

    const genresPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * genresPerPage;

    const [genres, totalCount] = await Promise.all([
      genresQuery.skip(skip).limit(genresPerPage),
      GenreModel.countDocuments(queryObj),
    ]);

    return { genres, totalCount };
  }
}

export default new GenreRepository();
