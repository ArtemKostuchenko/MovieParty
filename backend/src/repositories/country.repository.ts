import CountryModel, { Country } from '../models/country.model';
import { BadRequestError, NotFoundError } from '../errors';

class CountryRepository {
    constructor() { }

    async createCountry(countryData: Country): Promise<Country> {
        const { name, originName, icon} = countryData;

        if (!name || !originName || !icon) {
          throw new BadRequestError(
            "Please provide name, originName and icon country"
          );
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
        const { name, originName, icon } = countryData;

        const country = await CountryModel.findById(countryId);

        if (!country) {
            throw new NotFoundError("Country not found");
        }

        country.name = name || country.name;
        country.originName = originName || country.originName;
        country.icon = icon || country.icon;

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
