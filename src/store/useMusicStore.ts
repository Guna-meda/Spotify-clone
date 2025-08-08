import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
import { create } from "zustand";

// Define the store's state and action types
interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  deleteSong: (id:string) => Promise<void>;
  deleteAlbum: (id:string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  deleteAlbum: async(id) => {
   set({ isLoading: true, error: null });
   try {
    await axiosInstance.delete(`/admin/album/${id}`);
    set((state) => ({
      albums: state.albums.filter(album => album._id !== id),
     
     songs: state.songs.map(song =>
  song.albumId === id ? { ...song, albumId: null } : song
)

    }));
   } catch (error: any) {
    set({ error: error.response?.data?.message || "Failed to delete album" });
   } finally {
    set({ isLoading: false });
   }
  },

  deleteSong: async(id) => {
   set({ isLoading: true, error: null });
   try {
    await axiosInstance.delete(`/admin/song/${id}`);
    set(state => ({
songs: state.songs.filter(song => song._id !== id)
    }));
   } catch (error: any) {
    set({ error: error.response?.data?.message || "Failed to delete song" });
   } finally {
    set({ isLoading: false });
   }
  },

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/song");
      set({ songs: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch songs" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/stat");
      set({ stats: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch stats" });
    } finally {
      set({ isLoading: false });
    }
  },

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

  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/album/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch album by id",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/song/featured");
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch featured songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/song/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch Made For You songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/song/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch trending songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
