const { validateContent } = require('../utils/validations');
const { BadRequestError, NotFoundError } = require('../errors');
const ContentModel = require('../models/content.model');

class ContentRepository {
    constructor() { }

    async createContent(contentData) {
        const validContent = validateContent(contentData);

        if (!validContent) {
            throw new BadRequestError('Please provide title, originTitle, IMDb, description, releaseDate, duration, previewURL, originCountries, genres, actors and directors');
        }

        return await ContentModel.create(contentData);
    }

    async updateContentById(idContent, contentData) {
        const { title, originTitle, IMDb, description, rating, releaseDate, previewURL, backgroundURL, trailerURL, originCountries, genres, actors, directors, lists, part } = contentData;
        
        const content = await ContentModel.findById(idContent);

        if(!content){
            throw new NotFoundError('Content not found');
        }

        content.title = title || content.title;
        content.originTitle = originTitle || content.originTitle;
        content.IMDb = IMDb || content.IMDb;
        content.description = description || content.description;
        content.rating = rating || content.rating;
        content.releaseDate = releaseDate || content.releaseDate;
        content.previewURL = previewURL || content.previewURL;
        content.backgroundURL = backgroundURL || content.backgroundURL;
        content.originCountries = originCountries || content.originCountries;
        content.genres = genres || content.genres;
        content.actors = actors || content.actors;
        content.directors = directors || content.directors;
        content.lists = lists || content.lists;
        content.part = part || content.part;

        await content.save();
    }

    async deleteContentById(idContent){
        const content = await ContentModel.findById(idContent);

        if(!content){
            throw new NotFoundError('Content not found');
        }
        
        await content.deleteOne();
    }
}

module.exports = new ContentRepository();