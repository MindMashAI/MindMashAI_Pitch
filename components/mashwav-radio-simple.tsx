"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAudio } from "@/components/audio-manager"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  Radio,
  Sparkles,
  Zap,
  Crown,
  Clock,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  featured: boolean
  mashbits: number
  plays: number
  url: string
}

export default function MashwavRadioSimple() {
  const { playSound } = useAudio()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showMintModal, setShowMintModal] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sample tracks with direct IPFS URLs
  const tracks: Track[] = [
    {
      id: "1",
      title: "Neural Drip",
      artist: "MindMash Collective",
      duration: "2:45",
      featured: true,
      mashbits: 1250,
      plays: 3427,
      url: "https://jade-late-crow-559.mypinata.cloud/ipfs/bafybeib4liy3iljamg7v2ayudne3kookow73keskxko6mmil7mn5jezzj4",
    },
    {
      id: "2",
      title: "Outta Orbit",
      artist: "Quantum Beats",
      duration: "3:12",
      featured: false,
      mashbits: 780,
      plays: 1892,
      url: "https://jade-late-crow-559.mypinata.cloud/ipfs/bafybeiexxmbi2y3b4l5ujlvjqip2hpzlcjh4ykp4qfz4jb6rwkl6ut7iwi",
    },
  ]

  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Scroll functions
  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: -100,
        behavior: "smooth",
      })
    }
  }

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 100,
        behavior: "smooth",
      })
    }
  }

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    audio.crossOrigin = "anonymous" // Add this for CORS
    audio.src = tracks[currentTrackIndex].url
    audioRef.current = audio

    // Set up event listeners
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime)
    })

    audio.addEventListener("loadedmetadata", () => {
      console.log("Audio metadata loaded, duration:", audio.duration)
      setDuration(audio.duration)
      setIsLoading(false)
    })

    audio.addEventListener("ended", () => {
      nextTrack()
    })

    // Clean up on unmount
    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      setIsLoading(true)
      console.log("Attempting to play:", audioRef.current.src)
      audioRef.current
        .play()
        .then(() => {
          console.log("Playback started successfully")
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("Play error:", err)
          setIsPlaying(false)
          setIsLoading(false)
        })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // Handle track change
  useEffect(() => {
    if (!audioRef.current) return

    const wasPlaying = isPlaying
    if (wasPlaying) {
      audioRef.current.pause()
    }

    console.log("Changing track to:", tracks[currentTrackIndex].url)
    audioRef.current.src = tracks[currentTrackIndex].url
    setCurrentTime(0)

    if (wasPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Play error after track change:", err)
        setIsPlaying(false)
      })
    }
  }, [currentTrackIndex])

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const currentTrack = tracks[currentTrackIndex]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    playSound("/sounds/button-click.mp3")
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length)
    playSound("/sounds/tech-select.mp3")
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length)
    playSound("/sounds/tech-select.mp3")
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    playSound("/sounds/button-click.mp3")
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (isMuted && value[0] > 0) {
      setIsMuted(false)
    }
  }

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMintClick = () => {
    playSound("/sounds/feature-select.mp3")
  }

  const playTrackSelectSound = () => {
    playSound("/sounds/tech-select.mp3")
    setTimeout(() => playSound("/sounds/button-click.mp3"), 300)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Mash.WAV Radio
        </h2>
        <div className="flex items-center">
          <Radio className="h-4 w-4 text-cyan-400 mr-1" />
          <span className="text-xs text-cyan-400">LIVE</span>
        </div>
      </div>

      {/* Scroll buttons */}
      <div className="flex justify-end mb-2 space-x-2">
        <button
          onClick={scrollUp}
          className="bg-gray-800 hover:bg-gray-700 text-cyan-400 p-1 rounded"
          aria-label="Scroll up"
        >
          <ChevronUp size={16} />
        </button>
        <button
          onClick={scrollDown}
          className="bg-gray-800 hover:bg-gray-700 text-cyan-400 p-1 rounded"
          aria-label="Scroll down"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Scrollable content area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto border border-cyan-800/30 rounded-md p-4 mb-4"
        style={{
          maxHeight: "calc(100% - 150px)", // Reserve space for header and footer
          minHeight: "200px",
        }}
      >
        {/* Now Playing */}
        <div className="bg-black/60 border border-gray-800 rounded-md p-4 mb-4">
          <div className="flex items-center mb-3">
            <div className="relative mr-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-md flex items-center justify-center">
                <Music className="h-8 w-8 text-white" />
              </div>
              {currentTrack.featured && (
                <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1">
                  <Crown className="h-3 w-3 text-black" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400">{currentTrack.artist}</p>
              <div className="flex items-center mt-1">
                <div className="flex items-center text-xs text-cyan-400 mr-3">
                  <Zap className="h-3 w-3 mr-1" />
                  <span>{currentTrack.mashbits} MashBits</span>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{currentTrack.plays} plays</span>
                </div>
              </div>
            </div>
          </div>

          {/* Playback controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-800"
                  onClick={prevTrack}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className={`h-10 w-10 rounded-full ${
                    isPlaying
                      ? "bg-cyan-600 hover:bg-cyan-700"
                      : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  }`}
                  onClick={togglePlay}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-800"
                  onClick={nextTrack}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2 w-24">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-800"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Tracks */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300">Featured Tracks</h3>
            <Button variant="link" className="text-xs text-cyan-400 p-0 h-auto">
              View All
            </Button>
          </div>
          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center p-2 rounded-md cursor-pointer ${
                  currentTrackIndex === index
                    ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-cyan-800/50"
                    : "hover:bg-gray-800/50"
                }`}
                onClick={() => {
                  setCurrentTrackIndex(index)
                  setCurrentTime(0)
                  setIsPlaying(true)
                  playTrackSelectSound()
                }}
              >
                <div className="relative mr-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-md flex items-center justify-center">
                    <Music className="h-5 w-5 text-white" />
                  </div>
                  {track.featured && (
                    <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-0.5">
                      <Crown className="h-2 w-2 text-black" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{track.title}</div>
                  <div className="text-xs text-gray-400 truncate">{track.artist}</div>
                </div>
                <div className="text-xs text-gray-400 ml-2">{track.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mint Your Music */}
        <div className="mt-2">
          <div className="bg-black/60 border border-gray-800 rounded-md p-3">
            <h3 className="text-sm font-semibold text-white mb-1">Mint Your Music</h3>
            <p className="text-xs text-gray-400 mb-2">
              Turn your tracks into NFTs and earn MashBits when they get played on Mash.WAV Radio.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              onClick={handleMintClick}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Mint Music NFT
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom section with upgrade button and user info */}
      <div className="pt-4 border-t border-gray-800 flex-shrink-0">
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white"
          onClick={() => playSound("/sounds/button-click.mp3")}
        >
          <span className="mr-2">⭐</span>
          Upgrade Your Plan
        </Button>

        <div className="mt-3">
          <div className="flex items-center p-2 bg-black/40 rounded-md border border-gray-800">
            <div className="w-8 h-8 rounded-full bg-cyan-900 flex items-center justify-center text-white font-bold mr-3">
              M
            </div>
            <div>
              <div className="font-medium">Crossmint User</div>
              <div className="text-xs text-gray-400">info@MindMash.AI</div>
              <div className="text-xs text-gray-400">Cs7Ht...9vQr</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mint Modal */}
      {showMintModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowMintModal(false)}
        >
          <div
            className="bg-black/90 border border-cyan-800 rounded-lg p-6 max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
              Mint Your Music as NFT
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Upload your track, set royalty preferences, and mint it as an NFT on the Solana blockchain.
            </p>

            <div className="space-y-4 mb-6">
              <div className="border-2 border-dashed border-gray-700 rounded-md p-6 text-center">
                <Music className="h-10 w-10 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Drag & drop your audio file here</p>
                <p className="text-xs text-gray-500 mt-1">MP3, WAV, FLAC (max 50MB)</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Browse Files
                </Button>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Track Title</label>
                <input
                  type="text"
                  className="w-full bg-black/60 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  placeholder="Enter track title"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Artist Name</label>
                <input
                  type="text"
                  className="w-full bg-black/60 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  placeholder="Your artist name"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Royalty Percentage</label>
                <div className="flex items-center">
                  <Slider defaultValue={[10]} min={0} max={25} step={1} className="flex-1 mr-3" />
                  <span className="text-sm text-white">10%</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800/50"
                onClick={() => setShowMintModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                onClick={() => {
                  setShowMintModal(false)
                  playSound("/sounds/feature-select.mp3")
                }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Mint NFT
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
