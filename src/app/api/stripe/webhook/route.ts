import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  createSubscription,
  deleteSubscription
} from "@/app/actions/userSubscriptions";

const relevantEvents = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(
  req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature") as string;
    const webHookSecret = process.env.NODE_ENV === "production"
      ? process.env.STRIPE_WEBHOOK_SECRET
      : process.env.STRIPE_WEBHOOK_LOCAL_SECRET || process.env.STRIPE_WEBHOOK_LOCAL_SERCRET;

    if(!webHookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
    }

    if (!sig) {
      return new Response(JSON.stringify({ error: "Missing stripe signature" }), { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      webHookSecret
    );

    const data = event.data.object as Stripe.Subscription;
    console.log(data);

    if (relevantEvents.has(event.type)) {
      switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
          await createSubscription({ stripeCustomerId: data.customer as string });
          break;
        case "customer.subscription.deleted": {
          await deleteSubscription({ stripeCustomerId: data.customer as string });
          break;
        }
        default:{
          break;
        }
      }
    }

    return new Response(
      JSON.stringify({
        received: true,
      }), {
        status: 200,
      });
  }