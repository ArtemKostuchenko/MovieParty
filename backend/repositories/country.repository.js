const CountryModel = require('../models/country.model');

class CountryRepository {
    constructor() { }

    async createCountry(countryData) {
        const { name, code } = countryData;

        if (!name || !code) {
            throw new BadRequestError('Please provide name and code country');
        }

        return await CountryModel.create(countryData);
    }

    async getCountryById(countryId) {
        const country = await CountryModel.findById(countryId);

        if (!country) {
            throw new NotFoundError("Country not found");
        }

        return country;
    }

    async updateCountryById(countryId, countryData) {
        const { name, code } = countryData;

        const country = await CountryModel.findById(countryId);

        if (!country) {
            throw new NotFoundError("Country not found");
        }

        country.name = name || country.name;
        country.code = code || country.code;

        return await country.save();
    }

    async deleteCountryById(countryId) {
        const country = await CountryModel.findById(countryId);

        if (!country) {
            throw new NotFoundError("Country not found");
        }
    
        await country.deleteOne();
    }

    async getCountries() {
        return await CountryModel.find({})
    }
}

module.exports = new CountryRepository();