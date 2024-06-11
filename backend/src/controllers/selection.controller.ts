import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import SelectionRepository from "../repositories/selection.repository";

const createSelection = async (req: Request, res: Response) => {
  req.body.previewURL = req.file?.filename as string;
  const selection = await SelectionRepository.createSelection(req.body);

  return res.status(StatusCodes.CREATED).json({ data: selection });
};

const getSelection = async (req: Request, res: Response) => {
  const { id: idSelection } = req.params;

  const selection = await SelectionRepository.getSelectionById(idSelection);

  return res.status(StatusCodes.OK).json({ data: selection });
};

const updateSelection = async (req: Request, res: Response) => {
  const { id: idSelection } = req.params;
  req.body.previewURL = req.file?.filename as string;

  const updatedSelection = await SelectionRepository.updateSelectionById(
    idSelection,
    req.body
  );

  return res.status(StatusCodes.OK).json({ data: updatedSelection });
};

const deleteSelection = async (req: Request, res: Response) => {
  const { id: idSelection } = req.params;

  await SelectionRepository.deleteSelectionById(idSelection);

  return res.status(StatusCodes.OK).json({ success: true });
};

const getSelections = async (req: Request, res: Response) => {
  const selections = await SelectionRepository.getSelections(req.query);

  return res.status(StatusCodes.OK).json({ data: selections });
};

export {
  createSelection,
  getSelection,
  updateSelection,
  deleteSelection,
  getSelections,
};
