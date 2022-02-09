import { StripeController } from "./stripe.controller";
import Container from "typedi";

const stripeController = Container.get(StripeController)

export { stripeController };
