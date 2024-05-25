import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/auth/auth.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  console.log("🚀 | loader | request:", request.url);
  try {
    return authenticator.authenticate("spotify", request, {
      successRedirect: "/",
      failureRedirect: "/login",
      throwOnError: true,
    });
  } catch (error) {
    console.error("🚀 | loader | error:", error);
    throw error;
  }
};
