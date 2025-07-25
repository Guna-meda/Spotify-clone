import { Link } from "react-router-dom"
import { Home, MessageCircle, Library } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";

const LeftSidebar = () => {

  const { songs, albums, fetchAlbums, isLoading } = useMusicStore((state) => ({
    songs: state.songs,
    albums: state.albums,
    fetchAlbums: state.fetchAlbums,
    isLoading: state.isLoading,
  }));

  useEffect(()=> {
    fetchAlbums()
  },[])

  console.log({albums})

  return (
    <div className="h-full flex flex-col gap-2 px-2 py-4 w-[250px] bg-black border-r border-zinc-800">
      {/* Navigation menu */}
      <div className="rounded-lg bg-zinc-900 p-4 space-y-2">
        <Link to="/" className="flex items-center gap-2 text-white w-full hover:bg-zinc-800 px-3 py-2 rounded-md">
          <Home className="size-5" />
          <span className="hidden md:inline">Home</span>
        </Link>
        <Link to="/messages" className="flex items-center gap-2 text-white w-full hover:bg-zinc-800 px-3 py-2 rounded-md">
          <MessageCircle className="size-5" />
          <span className="hidden md:inline">Messages</span>
        </Link>
      </div>

      {/* Library section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white px-2">
            <Library className="size-5" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
         
          <div className="space-y-2">
           {isLoading? (
            <PlaylistSkeleton/>
           ) :("some mussic")}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default LeftSidebar
