import CountryModel, { Country } from '../models/country.model';
import { BadRequestError, NotFoundError } from '../errors';

class CountryRepository {
    constructor() { }

    async createCountry(countryData: Country): Promise<Country> {
        const { name, code } = countryData;

        if (!name || !code) {
            throw new BadRequestError('Please provide name and code country');
        }

        return await CountryModel.create(countryData);
    }

    async getCountryById(countryId: string): Promise<Country> {
        const country = await CountryModel.findById(countryId);

        if (!country) {
            throw new NotFoundError("Country not found");
        }

        return country;
    }

    async updateCountryById(countryId: string, countryData: Country): Promise<Country> {
        const { name, code } = countryData;

        const country = await CountryModel.findById(countryId);

        if (!country) {
            throw new NotFoundError("Country not found");
        }

        country.name = name || country.name;
        country.code = code || country.code;

        return await country.save();
    }

    async deleteCountryById(countryId: string): Promise<void> {
        const country = await CountryModel.findById(countryId);

        if (!country) {
            throw new NotFoundError("Country not found");
        }

        await country.deleteOne();
    }

    async getCountries(): Promise<Country[]> {
        return await CountryModel.find({});
    }
}

export default new CountryRepository();
