import { ActionFunctionArgs } from "@remix-run/node";
import { requireAuth } from "~/auth/auth.server";
import { playTrack } from "~/spotify/playTrack";

export const action = async ({ request }: ActionFunctionArgs) => {
  let user = await requireAuth(request);
  let data = await request.json();
  let uri = data.uri;
  if (uri) {
    playTrack(user.accessToken!, uri);
  }
};
