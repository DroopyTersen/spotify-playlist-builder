import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/auth/auth.server";

export const loader = () => redirect("/login");

export const action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("spotify", request);
};
