import CountryModel, { Country } from "../models/country.model";
import { BadRequestError, NotFoundError } from "../errors";

interface Query {
  name?: { $regex: string; $options: string };
}

class CountryRepository {
  constructor() {}

  async createCountry(countryData: Country): Promise<Country> {
    const { name, originName, icon } = countryData;

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

  async updateCountryById(
    countryId: string,
    countryData: Country
  ): Promise<Country> {
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

  async getCountries(
    query: any
  ): Promise<{ countries: Country[]; totalCount: number }> {
    const { name, fields, sort } = query;

    const queryObj: Query = {};

    if (name) {
      queryObj.name = { $regex: name, $options: "i" };
    }

    let countriesQuery = CountryModel.find(queryObj);

    // Застосовуємо сортування
    if (sort) {
      const sortList = sort.split(",").join(" ");
      countriesQuery = countriesQuery.sort(sortList);
    }

    // Вибірка полів
    if (fields) {
      const fieldList = fields.split(",").join(" ");
      countriesQuery = countriesQuery.select(fieldList);
    }

    const countriesPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * countriesPerPage;

    const [countries, totalCount] = await Promise.all([
      countriesQuery.skip(skip).limit(countriesPerPage),
      CountryModel.countDocuments(queryObj),
    ]);

    return { countries, totalCount };
  }
}

export default new CountryRepository();
