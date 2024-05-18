import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TypeContentRepository from "../repositories/type-content.repository";

const createTypeContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typeContent = await TypeContentRepository.createTypeContent(req.body);

  return res.status(StatusCodes.CREATED).json({ data: typeContent });
};

const getTypeContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: typeContentId } = req.params;

  const typeContent = await TypeContentRepository.getTypeContentById(
    typeContentId
  );

  return res.status(StatusCodes.OK).json({ data: typeContent });
};

const updateTypeContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: typeContentId } = req.params;

  const updatedTypeContent = await TypeContentRepository.updateTypeContentById(
    typeContentId,
    req.body
  );

  return res.status(StatusCodes.OK).json({ data: updatedTypeContent });
};

const deleteTypeContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: typeContentId } = req.params;

  await TypeContentRepository.deleteTypeContentById(typeContentId);

  return res.status(StatusCodes.OK).json({ success: true });
};

const getTypesContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typesContent = await TypeContentRepository.getTypesContent(req.query);

  return res.status(StatusCodes.OK).json({ data: typesContent });
};

export {
  createTypeContent,
  getTypeContent,
  updateTypeContent,
  deleteTypeContent,
  getTypesContent,
};
