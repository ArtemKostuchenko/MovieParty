import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CountryRepository from '../repositories/country.repository';

const createCountry = async (req: Request, res: Response): Promise<Response> => {
    req.body.icon = req.file?.filename as string;
    
    const country = await CountryRepository.createCountry(
      req.body,
    );
    
    return res.status(StatusCodes.CREATED).json({ data: country });
}

const getCountry = async (req: Request, res: Response): Promise<Response> => {
    const { id: countryId } = req.params;

    const country = await CountryRepository.getCountryById(countryId);

    return res.status(StatusCodes.OK).json({ data: country });
}

const updateCountry = async (req: Request, res: Response): Promise<Response> => {
    const { id: countryId } = req.params;

    const updatedCountry = await CountryRepository.updateCountryById(countryId, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedCountry });
}

const deleteCountry = async (req: Request, res: Response): Promise<Response> => {
    const { id: countryId } = req.params;

    await CountryRepository.deleteCountryById(countryId);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getCountries = async (req: Request, res: Response): Promise<Response> => {
    const countries = await CountryRepository.getCountries(req.query);

    return res.status(StatusCodes.OK).json({ data: countries });
}

export {
    createCountry,
    getCountry,
    updateCountry,
    deleteCountry,
    getCountries,
};
