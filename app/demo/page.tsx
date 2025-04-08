"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAudio } from "@/components/audio-manager"
import NeuralConnectionEffect from "@/components/neural-connection-effect"
import ChatInterface from "@/components/chat-interface"
import ModesPanel from "@/components/modes-panel"
import MashbotMinter from "@/components/mashbot-minter"
import MapPanel from "@/components/map-panel"
import LoadingScreen from "@/components/loading-screen"
import NavigationBar from "@/components/navigation-bar"
import OnboardingOverlay from "@/components/onboarding-overlay"
import DemoScenarios from "@/components/demo-scenarios"
import TokenVisualization from "@/components/token-visualization"
import { Volume2, VolumeX, Zap, HelpCircle, Maximize2, Minimize2, Activity, Radio, BotIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import KeyboardShortcutsHandler from "@/components/keyboard-shortcuts-handler"
// Import the NotificationSystem component
import NotificationSystem, { type Notification } from "@/components/notification-system"
import MashwavRadioSimple from "@/components/mashwav-radio-simple"

export default function DemoPage() {
  const [loading, setLoading] = useState(true)
  const [activeMode, setActiveMode] = useState("synthdev")
  const [activeTab, setActiveTab] = useState("modes")
  const [mostActiveAI, setMostActiveAI] = useState("user")
  const [currentEmotion, setCurrentEmotion] = useState("Neutral")
  const [isMuted, setIsMuted] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showTokens, setShowTokens] = useState(false)
  const [tokenCount, setTokenCount] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const { playSound, toggleMute } = useAudio()
  const chatRef = useRef<HTMLDivElement>(null)
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false)
  // Add state for notifications
  const [notifications, setNotifications] = useState<Notification[]>([])
  // Reference to the main container for scrolling
  const mainContainerRef = useRef<HTMLDivElement>(null)
  // Reference to track token timeout
  const tokenTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true)

  // Set isMounted to false when component unmounts
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Add function to add notifications
  const addNotification = (type: "success" | "warning" | "info", message: string, duration = 5000) => {
    if (!isMountedRef.current) return

    const id = Date.now().toString()
    setNotifications((prev) => [...prev, { id, type, message, duration }])

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        if (isMountedRef.current) {
          dismissNotification(id)
        }
      }, duration)
    }
  }

  // Add function to dismiss notifications
  const dismissNotification = (id: string) => {
    if (!isMountedRef.current) return
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        setLoading(false)
        playSound("/sounds/boot.mp3")
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [playSound])

  // Add effect to show welcome notification after loading
  useEffect(() => {
    if (!loading && isMountedRef.current) {
      const timer1 = setTimeout(() => {
        if (isMountedRef.current) {
          addNotification("info", "Welcome to MindMash.AI Demo! Explore the collaborative AI experience.", 8000)
        }
      }, 1000)

      const timer2 = setTimeout(() => {
        if (isMountedRef.current) {
          addNotification("success", "AI models synchronized successfully. Ready for collaboration!", 5000)
        }
      }, 5000)

      const timer3 = setTimeout(() => {
        if (isMountedRef.current) {
          addNotification("warning", "Network latency detected. Running in optimized mode.", 5000)
        }
      }, 12000)

      const timer4 = setTimeout(() => {
        if (isMountedRef.current) {
          addNotification("info", "Keyboard shortcuts: F (fullscreen), M (mute), ? (help)", 10000)
        }
      }, 3000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [loading])

  // Add a useEffect to demonstrate mode changes
  useEffect(() => {
    if (!loading && isMountedRef.current) {
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          addNotification(
            "info",
            `Active mode: ${
              activeMode === "synthdev"
                ? "SynthDev"
                : activeMode === "echodev"
                  ? "EchoDev"
                  : activeMode === "coredev"
                    ? "CoreDev"
                    : "SocialDev"
            }`,
            5000,
          )
        }
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [activeMode, loading])

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (tokenTimeoutRef.current) {
        clearTimeout(tokenTimeoutRef.current)
      }
    }
  }, [])

  // Handle AI activity
  const handleAIActivity = (aiType: string) => {
    if (!isMountedRef.current) return

    setMostActiveAI(aiType)

    // Randomly award tokens when AI is active
    if (Math.random() > 0.7) {
      const newTokens = Math.floor(Math.random() * 3) + 1
      setTokenCount((prev) => prev + newTokens)

      // Make sure to set showTokens to true and keep it true long enough for animation
      setShowTokens(true)

      // Clear any existing timeout to prevent premature hiding
      if (tokenTimeoutRef.current) {
        clearTimeout(tokenTimeoutRef.current)
      }

      // Set a new timeout to hide tokens after animation completes
      tokenTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setShowTokens(false)
        }
      }, 5000)

      // Show notification about tokens
      addNotification("success", `You earned ${newTokens} Mash.BiT tokens for meaningful AI interaction!`, 4000)
    }

    // Occasionally show AI insight notification
    if (Math.random() > 0.85) {
      const insights = [
        "GPT-4 and Gemini models are showing 87% agreement on approach.",
        "Cross-model analysis reveals a novel hybrid solution not identified by any single AI.",
        "Sentiment analysis detected a shift toward more positive engagement.",
        "Knowledge graph expanded with 3 new connections from this interaction.",
      ]

      addNotification("info", insights[Math.floor(Math.random() * insights.length)], 6000)
    }
  }

  // Handle mode change
  const handleModeChange = (mode: string) => {
    if (!isMountedRef.current) return

    console.log("Mode changed to:", mode)
    setActiveMode(mode)
    playSound("/sounds/tech-select.mp3")

    // Add a notification to confirm the mode change
    const modeName =
      mode === "synthdev" ? "SynthDev" : mode === "echodev" ? "EchoDev" : mode === "coredev" ? "CoreDev" : "SocialDev"

    addNotification("success", `Switched to ${modeName} collaboration mode`, 3000)
  }

  // Handle emotion change
  const handleEmotionChange = (emotion: string) => {
    if (!isMountedRef.current) return

    console.log("Emotion changed to:", emotion)
    setCurrentEmotion(emotion)
    playSound("/sounds/button-click.mp3")
  }

  // Handle AI node click
  const handleAINodeClick = (aiType: string) => {
    if (!isMountedRef.current) return

    setMostActiveAI(aiType)
    playSound("/sounds/feature-select.mp3")
  }

  // Handle mute toggle
  const handleMuteToggle = () => {
    if (!isMountedRef.current) return

    setIsMuted(!isMuted)
    toggleMute()
    playSound("/sounds/button-click.mp3")
  }

  // Handle prompt selection from demo scenarios
  const handlePromptSelect = (prompt: string) => {
    if (!isMountedRef.current) return

    // Add the prompt to the chat interface
    console.log("Selected prompt:", prompt)

    // Show a notification to confirm the prompt was selected
    addNotification("info", "Prompt selected: " + prompt.substring(0, 40) + "...", 3000)

    // Flash the chat interface to draw attention to it
    if (chatRef.current) {
      chatRef.current.classList.add("ring-2", "ring-cyan-500", "ring-opacity-100")
      setTimeout(() => {
        if (chatRef.current && isMountedRef.current) {
          chatRef.current.classList.remove("ring-2", "ring-cyan-500", "ring-opacity-100")
        }
      }, 1000)
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isMountedRef.current) return

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
    playSound("/sounds/button-click.mp3")
  }

  // Toggle help overlay
  const toggleHelp = () => {
    if (!isMountedRef.current) return

    setShowHelp(!showHelp)
    playSound("/sounds/button-click.mp3")
  }

  const handleToggleFullscreen = () => {
    toggleFullscreen()
  }

  const handleToggleMute = () => {
    if (!isMountedRef.current) return

    setIsMuted(!isMuted)
    toggleMute()
  }

  const handleToggleHelp = () => {
    toggleHelp()
  }

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div
      ref={mainContainerRef}
      className="w-full bg-black text-white font-mono"
      style={{ height: "auto", minHeight: "100vh", overflowY: "auto", paddingBottom: "100px" }}
    >
      {/* Background with grid and scanlines */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="fixed inset-0 bg-scanline opacity-5 pointer-events-none"></div>
      <div className="fixed inset-0 pointer-events-none">
        <NeuralConnectionEffect className="opacity-20" />
      </div>

      {/* Onboarding overlay */}
      {showOnboarding && <OnboardingOverlay onClose={() => setShowOnboarding(false)} />}

      {/* Token visualization */}
      <TokenVisualization isActive={showTokens} tokenCount={tokenCount} />

      {/* Main dashboard */}
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-black/90 backdrop-filter backdrop-blur-md border-b border-cyan-900/50 p-3 shadow-lg shadow-black/50">
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center header-logo">
                <div className="relative mr-2">
                  <img
                    src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafybeia5skhvck24266qahayvxuhc5k3ez27xnmscrlwfjnwloeal5rdam"
                    alt="MindMash.AI Logo"
                    className="h-8 w-8 relative z-10"
                  />
                  <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-md -z-10 glow-effect"></div>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  MindMash.AI
                </h1>
              </div>

              {/* Notification system moved between logo and demo mode text */}
              <div className="flex-1 max-w-md">
                <NotificationSystem notifications={notifications} onDismiss={dismissNotification} />
              </div>

              <div className="text-sm text-gray-400">
                <span className="text-cyan-400 font-semibold">DEMO MODE</span> | Colosseum Hackathon 2025
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="mr-2 border-cyan-500 text-cyan-400 hover:bg-cyan-900/20"
                onClick={() => {
                  window.location.href = "/"
                  playSound("/sounds/button-click.mp3")
                }}
              >
                ← Back to Pitch Deck
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-cyan-900/20 transition-colors"
                onClick={() => {
                  setShowPerformanceMetrics(!showPerformanceMetrics)
                  playSound("/sounds/button-click.mp3")
                }}
              >
                <Activity className="h-4 w-4 text-cyan-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-cyan-900/20 transition-colors"
                onClick={handleMuteToggle}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-gray-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-cyan-400" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-cyan-900/20 transition-colors"
                onClick={toggleHelp}
              >
                <HelpCircle className="h-4 w-4 text-cyan-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-cyan-900/20 transition-colors"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4 text-cyan-400" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-cyan-400" />
                )}
              </Button>
              <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs px-3 py-1 rounded-full flex items-center shadow-lg shadow-purple-500/20 token-display">
                <Zap className="h-3 w-3 mr-1" />
                <span>{tokenCount} Mash.BiT</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-grow py-4" id="main-content">
          <div className="container mx-auto p-2 max-w-7xl">
            <div className="grid grid-cols-12 gap-4">
              {/* Middle column - Chat Interface */}
              <div className="col-span-12 md:col-span-6 md:order-2 flex flex-col">
                <div ref={chatRef} className="h-[580px] chat-interface transition-all duration-300">
                  <ChatInterface
                    onAIActivity={handleAIActivity}
                    currentEmotion={currentEmotion}
                    onEmotionChange={handleEmotionChange}
                  />
                </div>

                <div className="mt-3">
                  <NavigationBar />
                </div>
              </div>

              {/* Left column - Modes Panel or MashBot Minter or MashWAV Radio */}
              <div className="col-span-12 md:col-span-3 md:order-1 flex flex-col">
                <div className="border border-gray-800 bg-black/80 rounded-md p-4 h-[625px] flex flex-col overflow-hidden">
                  {activeTab === "modes" ? (
                    <ModesPanel activeMode={activeMode} onModeChange={handleModeChange} />
                  ) : activeTab === "nft" ? (
                    <MashbotMinter />
                  ) : (
                    <MashwavRadioSimple />
                  )}
                </div>
                <div className="mt-3">
                  <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-0 bg-black border border-gray-800">
                      <TabsTrigger value="modes" className="data-[state=active]:text-cyan-400">
                        Modes
                      </TabsTrigger>
                      <TabsTrigger value="nft" className="data-[state=active]:text-fuchsia-400 nft-tab">
                        <BotIcon className="h-3 w-3 mr-1" />
                        Mash.BoT
                      </TabsTrigger>
                      <TabsTrigger value="radio" className="data-[state=active]:text-amber-400 radio-tab">
                        <Radio className="h-3 w-3 mr-1" />
                        Mash.WAV
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* Right column - Collaboration Map */}
              <div className="col-span-12 md:col-span-3 md:order-3 flex flex-col">
                <div className="h-[670px] map-panel">
                  <MapPanel activeNode={mostActiveAI} onNodeClick={handleAINodeClick} tokenCount={tokenCount} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-2 pb-8 max-w-7xl mt-4" id="demo-scenarios">
          <DemoScenarios onSelectPrompt={handlePromptSelect} />
        </div>

        {/* Extra content to ensure scrolling */}
        <div className="container mx-auto p-2 pb-32 max-w-7xl mt-4" id="extra-content">
          <div className="border border-gray-800 bg-black/80 rounded-md p-6 text-center">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
              Experience the Future of AI Collaboration
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              MindMash.AI represents the next evolution in collaborative intelligence, where multiple AI models work
              together with humans to create solutions greater than the sum of their parts.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                onClick={() => scrollToSection("main-content")}
              >
                Back to Top
              </Button>
              <Button
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-900/20"
                onClick={() => window.open("https://github.com/MindMashAI", "_blank")}
              >
                GitHub Repository
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black/80 border-t border-gray-800 py-4 mt-auto">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
              <div className="flex items-center">
                <span className="text-gray-400">© 2025 MindMash.AI</span>
                <span className="mx-2 text-gray-600">|</span>
                <a
                  href="https://www.colosseum.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center"
                >
                  <span>Colosseum Hackathon</span>
                </a>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4">
                <span className="text-gray-500 mr-2">Powered by:</span>

                <a
                  href="https://solana.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-black/60 px-3 py-1.5 rounded-md border border-cyan-900/50 hover:border-cyan-500/70 transition-all group"
                >
                  <img
                    src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafkreie6sj4qrzz6ppmblvwb6bz2b3vbdej23kmrn5mwoyaj2tqhhs52kq"
                    alt="Solana"
                    className="h-4 w-auto"
                  />
                </a>

                <a
                  href="https://crossmint.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-black/60 px-3 py-1.5 rounded-md border border-fuchsia-900/50 hover:border-fuchsia-500/70 transition-all group"
                >
                  <img
                    src="https://www.crossmint.com/assets/crossmint/logo.svg"
                    alt="Crossmint"
                    className="h-4 w-auto"
                  />
                </a>

                <a
                  href="https://solflare.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-black/60 px-3 py-1.5 rounded-md border border-amber-900/50 hover:border-amber-500/70 transition-all group"
                >
                  <img
                    src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafkreidcu55wibsgxbw4yh2j5bpjv4d2ia6sswt2amuvd7fabugh2tvkcq"
                    alt="Solflare"
                    className="h-4 w-auto"
                  />
                </a>

                <a
                  href="https://supabase.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-black/60 px-3 py-1.5 rounded-md border border-green-900/50 hover:border-green-500/70 transition-all group"
                >
                  <img
                    src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafkreihqfls4w5hhppc3wvtz3pj7gl4k73gecpkabcew5lfzu5enrdiw7i"
                    alt="Supabase"
                    className="h-4 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Keyboard shortcuts handler */}
      <KeyboardShortcutsHandler
        onToggleFullscreen={handleToggleFullscreen}
        onToggleMute={handleToggleMute}
        onToggleHelp={handleToggleHelp}
      />

      {/* Help overlay */}
      {showHelp && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="bg-black/90 border border-cyan-500 rounded-lg p-6 max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
              MindMash.AI Demo Help
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-cyan-400 font-medium mb-2">Key Features</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>
                      <strong>AI Collaboration Map:</strong> See how different AI models interact and collaborate in
                      real-time
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>
                      <strong>Collaboration Modes:</strong> Switch between different AI collaboration strategies
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>
                      <strong>Multi-AI Chat:</strong> Chat with multiple AI models simultaneously
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>
                      <strong>Mash.BiT Tokens:</strong> Earn tokens through meaningful interactions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>
                      <strong>Mash.BoT NFTs:</strong> Mint custom AI assistants to join your collaborations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>
                      <strong>Mash.WAV Radio:</strong> Listen to music NFTs and mint your own tracks
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-cyan-400 font-medium mb-2">Keyboard Shortcuts</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-900 rounded border border-gray-700 text-gray-300 mr-2">Tab</kbd>
                    <span>Navigate UI elements</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-900 rounded border border-gray-700 text-gray-300 mr-2">F</kbd>
                    <span>Toggle fullscreen</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-900 rounded border border-gray-700 text-gray-300 mr-2">M</kbd>
                    <span>Toggle mute</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-900 rounded border border-gray-700 text-gray-300 mr-2">?</kbd>
                    <span>Show this help</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-cyan-400 font-medium mb-2">Demo Scenarios</h4>
                <p className="text-gray-300">
                  Try the pre-configured demo scenarios to see MindMash.AI in action across different use cases.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                onClick={() => setShowHelp(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
