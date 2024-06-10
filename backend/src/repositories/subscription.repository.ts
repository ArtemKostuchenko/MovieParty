import dotenv from "dotenv";
import Stripe from "stripe";
import UserModel from "../models/user.model";
import { BadRequestError } from "../errors";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

class SubscriptionRepository {
  constructor() {}

  async createSubscription(userId: string, email: string) {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: "price_1PQ4i5F7epOvJnbvMkgGXdiG",
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5000/api/v1/subscription/successPayment?sessionId={CHECKOUT_SESSION_ID}&userId=${userId}`,
      cancel_url: `http://localhost:5000/api/v1/subscription/cancelPayment`,
    });

    return session;
  }

  async successPayment(sessionData: any) {
    const { sessionId, userId } = sessionData;
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const user = await UserModel.findById(userId);
      if (user) {
        if (!user.subscription) {
          user.subscription = session.subscription
            ? session.subscription.toString()
            : "";
          await user.save();
        }
      }
    } catch (e) {}
  }

  async getSubscriptionDetailsBySubscription(subscription: string) {
    try {
      if (!subscription) {
        return null;
      }
      return await stripe.subscriptions.retrieve(subscription);
    } catch (e) {
      return null;
    }
  }

  async cancelSubscription(subscription: string, userId: string) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new BadRequestError("Subscription not found");
      }
      if (!user.subscription) {
        throw new BadRequestError("Subscription not found");
      }
      const delSubscription = await stripe.subscriptions.cancel(subscription);
      console.log(delSubscription);
    } catch (e) {
      throw new BadRequestError("Subscription not found");
    }
  }
}

export default new SubscriptionRepository();
