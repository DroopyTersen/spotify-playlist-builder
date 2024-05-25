import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator, requireAuth } from "~/auth/auth.server";
import { getRecentlyPlayed } from "~/spotify/getRecentlyPlayed";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  let user = await requireAuth(request);
  console.log("🚀 | loader | user:", user);
  let recentlyPlayed = await getRecentlyPlayed(user.accessToken!);
  return {
    user,
    recentlyPlayed,
  };
};

export default function Index() {
  const { user, recentlyPlayed } = useLoaderData<typeof loader>();
  console.log("🚀 | Index | user:", user);
  console.log("🚀 | Index | recentlyPlayed:", recentlyPlayed);
  return (
    <div className="prose">
      <h1>Recently Played</h1>
      <ul>
        {recentlyPlayed.items.map((item) => (
          <li key={item.played_at}>
            {item.track.name} by {item.track.artists[0].name}
          </li>
        ))}
        <li>
          <a
            className="link link-hover link-accent"
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
