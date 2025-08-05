// components/Player.tsx

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/store/usePlayerStore";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Player = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayerStore();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Utility to format seconds as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = document.querySelector("audio") as HTMLAudioElement | null;
    if (!audio) return;
    audioRef.current = audio;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Left: Song Info */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </span>
                <span className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Center: Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          {/* Control buttons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:flex text-zinc-400 hover:text-white"
            >
              <Shuffle className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={playPrevious}
              disabled={!currentSong}
              className="text-zinc-400 hover:text-white"
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              onClick={togglePlay}
              disabled={!currentSong}
              className="bg-white hover:bg-white/80 text-black rounded-full w-8 h-8"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={playNext}
              disabled={!currentSong}
              className="text-zinc-400 hover:text-white"
            >
              <SkipForward className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:flex text-zinc-400 hover:text-white"
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="hidden sm:flex items-center gap-2 w-full">
            <span className="text-xs text-zinc-400">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              onValueChange={(value) => setCurrentTime(value[0])}
              onValueCommit={handleSeek}
              max={duration || 100}
              step={1}
              className="w-full h-2 appearance-none rounded-full bg-zinc-800 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:h-4 
             [&::-webkit-slider-thumb]:w-4 
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-white 
             [&::-webkit-slider-thumb]:shadow-md 
             [&::-webkit-slider-thumb]:hover:scale-110 
             [&::-webkit-slider-thumb]:transition 
             [&::-webkit-slider-runnable-track]:rounded-full 
             [&::-webkit-slider-runnable-track]:bg-gradient-to-r 
             [&::-webkit-slider-runnable-track]:from-white 
             [&::-webkit-slider-runnable-track]:to-zinc-800"
            />
            <span className="text-xs text-zinc-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume & Extras */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <Mic2 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <ListMusic className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <Laptop2 className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 w-28">
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
            >
              <Volume1 className="w-4 h-4" />
            </Button>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="w-full h-2 appearance-none rounded-full bg-zinc-800 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:h-4 
             [&::-webkit-slider-thumb]:w-4 
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-white 
             [&::-webkit-slider-thumb]:shadow-md 
             [&::-webkit-slider-thumb]:hover:scale-110 
             [&::-webkit-slider-thumb]:transition 
             [&::-webkit-slider-runnable-track]:rounded-full 
             [&::-webkit-slider-runnable-track]:bg-gradient-to-r 
             [&::-webkit-slider-runnable-track]:from-white 
             [&::-webkit-slider-runnable-track]:to-zinc-800"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Player;
