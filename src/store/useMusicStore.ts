import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

// Define the store's state and action types
interface MusicStore {
  albums: any[]; 
  songs: any[]; 
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/album");
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch albums" });
    } finally {
      set({ isLoading: false });
    }
  },
}));