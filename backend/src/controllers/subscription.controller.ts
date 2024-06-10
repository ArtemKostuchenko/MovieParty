import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import SubscriptionRepository from "../repositories/subscription.repository";

const createSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const subscriptionSession = await SubscriptionRepository.createSubscription(
    req.user?.id,
    req.user?.email!
  );
  return res.status(StatusCodes.CREATED).json(subscriptionSession);
};

const successPayment = async (req: Request, res: Response) => {
  await SubscriptionRepository.successPayment(req.query);

  res
    .status(StatusCodes.OK)
    .redirect(`${process.env.CLIENT_URL}/profile/subscription`);
};

const cancelPayment = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).redirect(`${process.env.CLIENT_URL}`);
};

const getSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: subscriptionId } = req.params;

  const subscription =
    await SubscriptionRepository.getSubscriptionDetailsBySubscription(
      subscriptionId
    );

  return res.status(StatusCodes.OK).json({ data: subscription });
};

const cancelSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { subscription } = req.body;
  await SubscriptionRepository.cancelSubscription(subscription, req.user?.id);
  return res.status(StatusCodes.OK).json({ success: true });
};

export {
  createSubscription,
  successPayment,
  cancelPayment,
  getSubscription,
  cancelSubscription,
};
