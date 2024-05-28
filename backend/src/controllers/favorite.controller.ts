import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import FavoriteRepository from "../repositories/favorite.repository";

const addFavoriteVideoContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await FavoriteRepository.addFavoriteVC(req.body, req.user?.id);
  return res.status(StatusCodes.OK).json({
    success: true,
  });
};

const getFavoriteVideoContentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: contentId } = req.params;

  const favorite = await FavoriteRepository.getFavoriteVCById(
    contentId,
    req.user?.id
  );

  return res.status(StatusCodes.OK).json({
    data: favorite,
  });
};

const deleteFavoriteVideoContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: contentId } = req.params;

  await FavoriteRepository.deleteFavoriteVC(contentId, req.user?.id);

  return res.status(StatusCodes.OK).json({
    success: true,
  });
};

const getFavoritesVideoContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const favorites = await FavoriteRepository.getFavoritesVC(req.user?.id);

  return res.status(StatusCodes.OK).json({
    data: favorites,
    totalCount: favorites?.favorites?.length,
  });
};

export {
  addFavoriteVideoContent,
  getFavoriteVideoContentById,
  deleteFavoriteVideoContent,
  getFavoritesVideoContent,
};
