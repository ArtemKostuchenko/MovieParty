const CountryModel = require('../models/country.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createCountry = async (req, res) => {
    const { name, code } = req.body;

    if (!name || !code) {
        throw new BadRequestError('Please provide name and code country');
    }

    const country = await CountryModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ data: country });
}

const getCountry = async (req, res) => {
    const { id: idCountry } = req.params;

    const country = await CountryModel.findById(idCountry);

    if (!country) {
        throw new NotFoundError("Country not found");
    }

    return res.status(StatusCodes.OK).json({ data: country });
}

const updateCountry = async (req, res) => {
    const { id: idCountry } = req.params;
    const { name, code } = req.body;

    const country = await CountryModel.findById(idCountry);

    if (!country) {
        throw new NotFoundError("Country not found");
    }

    country.name = name || country.name;
    country.code = code || country.code;

    const updatedCountry = await country.save();

    return res.status(StatusCodes.OK).json({ data: updatedCountry });
}

const deleteCountry = async (req, res) => {
    const { id: idCountry } = req.params;

    const country = await CountryModel.findById(idCountry);

    if (!country) {
        throw new NotFoundError("Country not found");
    }

    await country.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getCountries = async (req, res) => {
    const countries = await CountryModel.find({});

    return res.status(StatusCodes.OK).json({ data: countries });
}

module.exports = {
    createCountry,
    getCountry,
    updateCountry,
    deleteCountry,
    getCountries,
}