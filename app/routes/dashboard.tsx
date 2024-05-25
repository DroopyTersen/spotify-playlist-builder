import { PlusCircledIcon } from "@radix-ui/react-icons";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { requireAuth } from "~/auth/auth.server";
import { getRecentlyPlayed } from "~/spotify/getMyRecentListens";
import { useLoaderData } from "@remix-run/react";
import { AlbumArtwork } from "~/components/AlbumArtwork";
import { Sidebar } from "~/components/Sidebar";
import { Menu } from "~/components/Menu";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
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

export default function Dashboard() {
  const { user, recentlyPlayed } = useLoaderData<typeof loader>();
  console.log("🚀 | MusicPage | recentlyPlayed:", recentlyPlayed);

  return (
    <>
      <div className="w-full h-screen">
        {/* <Menu /> */}
        <div className="border-t">
          <div className="bg-background">
            <div className="grid grid-rows-[auto_1fr] lg:grid-rows-1 grid-cols-5">
              <div className="col-span-5 lg:col-span-1">
                <Sidebar playlists={[]} className="" />
              </div>
              <div className="col-span-5 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Recently Played
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your recently played tracks
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {recentlyPlayed.items.map((recentPlay) => (
                          <AlbumArtwork
                            image={recentPlay.track?.album?.images?.[0]?.url}
                            artist={recentPlay.track?.artists?.[0]?.name}
                            trackOrAlbum={recentPlay.track?.name}
                            key={recentPlay.played_at}
                            className="w-[250px]"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Made for You
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your personal playlists. Updated daily.
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4"></div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
