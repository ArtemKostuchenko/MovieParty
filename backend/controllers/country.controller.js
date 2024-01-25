const CountryModel = require('../models/country.model');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const CountryRepository = require('../repositories/country.repository');

const createCountry = async (req, res) => {
    const country = await CountryRepository.createCountry(req.body);

    return res.status(StatusCodes.CREATED).json({ data: country });
}

const getCountry = async (req, res) => {
    const { id: countryId } = req.params;

    const country = await CountryRepository.getCountryById(countryId);

    return res.status(StatusCodes.OK).json({ data: country });
}

const updateCountry = async (req, res) => {
    const { id: countryId } = req.params;

    const updatedCountry = await CountryRepository.updateCountryById(countryId, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedCountry });
}

const deleteCountry = async (req, res) => {
    const { id: countryId } = req.params;

    await CountryRepository.deleteCountryById(countryId);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getCountries = async (req, res) => {
    const countries = await CountryRepository.getCountries();

    return res.status(StatusCodes.OK).json({ data: countries });
}

module.exports = {
    createCountry,
    getCountry,
    updateCountry,
    deleteCountry,
    getCountries,
}