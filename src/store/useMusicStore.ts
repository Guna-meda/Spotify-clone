import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";

// Define the store's state and action types
interface MusicStore {
  albums: Album[]; 
  songs: Song[]; 
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null,

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id:string) => Promise<void>
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum:null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/album/");
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch albums" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById : async(id) => {
    set({isLoading:true , error: null});
    try {
      const response = await axiosInstance.get("/album/albumId");
      set({currentAlbum: response.data})
    } catch (error: any ) {
      set({error: error.response?.data?.message || "Failed to fetch album by id"})
    }finally {
      set({ isLoading: false })
    }
  }
}));