"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal, Shield, Cpu, Wifi, AlertTriangle, Maximize, Minimize } from "lucide-react"
import Slide from "@/components/slide"
import CyberpunkTerminal from "@/components/cyberpunk-terminal"
import DashboardPanel from "@/components/dashboard-panel"
import StatusBar from "@/components/status-bar"
import NavigationControls from "@/components/navigation-controls"
import SlideContent from "@/components/slide-content"
import ManifestoSlide from "@/components/manifesto-slide"
import { Button } from "@/components/ui/button"
import NeuralConnectionEffect from "@/components/neural-connection-effect"
import SystemAlerts from "@/components/system-alerts"
import LiveMetrics from "@/components/live-metrics"
import KeyboardShortcuts from "@/components/keyboard-shortcuts"
import ProgressBar from "@/components/progress-bar"
import OrientationWarning from "@/components/orientation-warning"
import { useAudio } from "@/components/audio-manager"
import { useMobile } from "@/hooks/use-mobile"
import MobileLayout from "@/components/mobile-layout"

function XLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [booting, setBooting] = useState(true)
  const [systemStatus, setSystemStatus] = useState("initializing")
  const [terminalMinimized, setTerminalMinimized] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<{ type: string; content: string }[]>([
    { type: "system", content: "MindMash.AI Neural Interface v1.0.4" },
    { type: "system", content: "Initializing system..." },
    { type: "system", content: "Type 'help' for available commands." },
  ])

  const totalSlides = 11 // Total slides including manifesto
  const terminalRef = useRef<HTMLDivElement>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [powerLevel, setPowerLevel] = useState(85)
  const [initialized, setInitialized] = useState(false)
  const { playSound, isAudioSupported } = useAudio()

  const { isMobile, isPortrait } = useMobile()
  const mainRef = useRef<HTMLDivElement>(null)

  // Boot sequence
  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBooting(false)
      setSystemStatus("online")
      addTerminalMessage("system", "System online. Neural interface activated.")
      addTerminalMessage("system", "Presentation mode: ACTIVE")
      addTerminalMessage("system", "Current slide: 1/11 - MindMash.AI Introduction")
    }, 3000)

    return () => clearTimeout(bootTimer)
  }, [])

  // Handle terminal input
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!terminalInput.trim()) return

    // Add user input to history
    addTerminalMessage("user", `> ${terminalInput}`)

    // Process command
    processCommand(terminalInput)

    // Clear input
    setTerminalInput("")
  }

  // Add message to terminal history
  const addTerminalMessage = (type: string, content: string) => {
    setTerminalHistory((prev) => [...prev, { type, content }])

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 50)
  }

  // Process terminal commands
  const processCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()

    // Navigation commands
    if (command === "next" || command === "n") {
      if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1)
        addTerminalMessage("system", `Navigating to slide ${currentSlide + 2}`)
      } else {
        addTerminalMessage("error", "Already at the last slide")
      }
      return
    }

    if (command === "prev" || command === "p" || command === "previous") {
      if (currentSlide > 0) {
        goToSlide(currentSlide - 1)
        addTerminalMessage("system", `Navigating to slide ${currentSlide}`)
      } else {
        addTerminalMessage("error", "Already at the first slide")
      }
      return
    }

    if (command.startsWith("goto ")) {
      const slideNum = Number.parseInt(command.split(" ")[1])
      if (isNaN(slideNum) || slideNum < 1 || slideNum > totalSlides) {
        addTerminalMessage("error", `Invalid slide number. Use a number between 1 and ${totalSlides}`)
      } else {
        goToSlide(slideNum - 1)
        addTerminalMessage("system", `Navigating to slide ${slideNum}`)
      }
      return
    }

    // Help command
    if (command === "help") {
      addTerminalMessage("system", "Available commands:")
      addTerminalMessage("system", "- next (n): Go to the next slide")
      addTerminalMessage("system", "- prev (p): Go to the previous slide")
      addTerminalMessage("system", `- goto [num]: Go to a specific slide (1-${totalSlides})`)
      addTerminalMessage("system", "- info: Show information about current slide")
      addTerminalMessage("system", "- list: List all slides")
      addTerminalMessage("system", "- clear: Clear terminal history")
      addTerminalMessage("system", "- status: Show system status")
      addTerminalMessage("system", "- neural_scan: Analyze neural network activity")
      addTerminalMessage("system", "- syndicate_info: Show information about syndicates")
      return
    }

    // Clear command
    if (command === "clear") {
      setTerminalHistory([
        { type: "system", content: "MindMash.AI Neural Interface v1.0.4" },
        { type: "system", content: "Terminal cleared." },
      ])
      return
    }

    // Info command
    if (command === "info") {
      const slideInfo = getSlideInfo(currentSlide)
      addTerminalMessage("system", `Current slide: ${currentSlide + 1}/${totalSlides}`)
      addTerminalMessage("system", `Title: ${slideInfo.title}`)
      addTerminalMessage("system", `Description: ${slideInfo.description}`)
      return
    }

    // List command
    if (command === "list") {
      addTerminalMessage("system", "Presentation slides:")
      for (let i = 0; i < totalSlides; i++) {
        const slideInfo = getSlideInfo(i)
        addTerminalMessage("system", `${i + 1}. ${slideInfo.title}${i === currentSlide ? " (current)" : ""}`)
      }
      return
    }

    // Status command
    if (command === "status") {
      addTerminalMessage("system", `System status: ${systemStatus.toUpperCase()}`)
      addTerminalMessage("system", `Current slide: ${currentSlide + 1}/${totalSlides}`)
      addTerminalMessage("system", `Memory usage: ${Math.floor(Math.random() * 30) + 60}%`)
      addTerminalMessage("system", `Neural connection: STABLE`)
      return
    }

    // Neural scan command
    if (command === "neural_scan") {
      addTerminalMessage("system", "Initiating neural network scan...")
      setTimeout(() => {
        addTerminalMessage("system", "Neural pathways: OPTIMAL")
        addTerminalMessage("system", "AI model synchronization: 97.3%")
        addTerminalMessage("system", "Knowledge graph nodes: 1,342")
        addTerminalMessage("system", "Active connections: 8,769")
        addTerminalMessage("system", "Scan complete. Neural network operating at peak efficiency.")
      }, 1500)
      return
    }

    // Syndicate info command
    if (command === "syndicate_info") {
      addTerminalMessage("system", "Retrieving syndicate information...")
      setTimeout(() => {
        addTerminalMessage("system", "Active syndicates: 4")
        addTerminalMessage("system", "- Alpha Syndicate: AI Research (23 members)")
        addTerminalMessage("system", "- Beta Syndicate: Token Economics (17 members)")
        addTerminalMessage("system", "- Gamma Syndicate: Knowledge Mapping (19 members)")
        addTerminalMessage("system", "- Delta Syndicate: Developer Relations (15 members)")
        addTerminalMessage("system", "Total Mash.BiT tokens distributed: 42,890")
        addTerminalMessage("system", "Governance proposals active: 3")
      }, 1500)
      return
    }

    // Unknown command
    addTerminalMessage("error", `Unknown command: ${command}`)
    addTerminalMessage("system", "Type 'help' for available commands.")
  }

  // Navigate to a specific slide
  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index)
      playSound("/sounds/slide-change.mp3")
    }
  }

  // Get information about a slide
  const getSlideInfo = (index: number) => {
    const slides = [
      { title: "MindMash.AI", description: "The Neural Future of Collaboration" },
      { title: "MindMash.AI Manifesto", description: "Our vision and mission for the neural frontier" },
      { title: "The Problem", description: "AI is powerful—but it's still a solo experience" },
      { title: "The Solution", description: "MindMash.AI - A real-time, multiplayer platform" },
      { title: "Core Features", description: "Six key components of the MindMash.AI platform" },
      { title: "Why It Matters", description: "Building the operating system for collaborative intelligence" },
      { title: "Tech Stack", description: "The technologies powering MindMash.AI" },
      { title: "Progress & Demo", description: "What we've built so far" },
      { title: "What's Next", description: "Our roadmap for the future" },
      { title: "The Ask", description: "What we're looking for" },
      { title: "Thank You", description: "Let's build a future where minds—digital and human—think together" },
    ]

    return slides[index]
  }

  useEffect(() => {
    // Rest of the useEffect remains the same...
    setTimeout(() => {
      setInitialized(true)
      playSound("/sounds/boot.mp3")
    }, 1000)

    // Simulate power level fluctuation
    const powerInterval = setInterval(() => {
      setPowerLevel((prev) => {
        const fluctuation = Math.random() * 6 - 3
        return Math.min(100, Math.max(70, prev + fluctuation))
      })
    }, 5000)

    return () => {
      clearInterval(powerInterval)
    }
  }, [])

  const nextSlide = () => goToSlide(currentSlide + 1)
  const prevSlide = () => goToSlide(currentSlide - 1)

  const toggleTerminal = () => {
    setTerminalOpen(!terminalOpen)
    playSound("/sounds/terminal-toggle.mp3")
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1)
        }
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (currentSlide > 0) {
          goToSlide(currentSlide - 1)
        }
      }
      if (e.key === "t" || e.key === "T") toggleTerminal()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, totalSlides, terminalOpen])

  // Add this effect for touch swipe handling on mobile
  useEffect(() => {
    if (!mainRef.current || !isMobile) return

    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      const swipeThreshold = 50

      if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - go to previous slide
        if (currentSlide > 0) {
          goToSlide(currentSlide - 1)
        }
      }

      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - go to next slide
        if (currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1)
        }
      }
    }

    const element = mainRef.current
    element.addEventListener("touchstart", handleTouchStart, { passive: true })
    element.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSlide, totalSlides, isMobile])

  // Boot screen
  if (booting) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="mb-6 flex items-center justify-center">
            <img
              src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafybeia5skhvck24266qahayvxuhc5k3ez27xnmscrlwfjnwloeal5rdam"
              alt="MindMash.AI Logo"
              className="h-16 w-16 mr-2 animate-pulse"
            />
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              MindMash.AI
            </h1>
          </div>
          <p className="text-cyan-400 animate-pulse">Initializing neural interface...</p>
          <div className="mt-8 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-[loading_3s_ease-in-out]"></div>
          </div>
          <div className="mt-4 font-mono text-xs text-gray-500">
            <p>Loading neural pathways...</p>
            <p>Establishing quantum connections...</p>
            <p>Calibrating interface...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!booting) {
    // Mobile layout
    if (isMobile) {
      return (
        <main ref={mainRef} className="relative h-screen w-screen overflow-hidden bg-black text-white font-mono">
          {/* Background with grid and scanlines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-scanline opacity-5"></div>
          <NeuralConnectionEffect className="opacity-30" />

          {/* Mobile orientation warning - only show in portrait mode */}
          {isPortrait && <OrientationWarning />}

          <MobileLayout
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            onNavigate={goToSlide}
            slideInfo={getSlideInfo(currentSlide)}
          >
            <div className="absolute inset-0 overflow-hidden">
              {/* Original intro slide (first slide) */}
              <Slide key="intro" isActive={currentSlide === 0} slideIndex={0}>
                <SlideContent slideIndex={0} />
              </Slide>

              {/* Manifesto slide (second slide) */}
              <Slide key="manifesto" isActive={currentSlide === 1} slideIndex={1}>
                <ManifestoSlide />
              </Slide>

              {/* Remaining slides (shifted by 1 from original) */}
              {Array.from({ length: totalSlides - 2 }).map((_, index) => (
                <Slide key={index + 2} isActive={currentSlide === index + 2} slideIndex={index + 2}>
                  <SlideContent slideIndex={index + 1} />
                </Slide>
              ))}
            </div>
          </MobileLayout>
        </main>
      )
    }

    // Desktop layout - keep the original layout
    return (
      <main ref={mainRef} className="relative h-screen w-screen overflow-hidden bg-black text-white font-mono">
        {/* Background with grid and scanlines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-scanline opacity-5"></div>
        <NeuralConnectionEffect className="opacity-30" />

        {/* System alerts */}
        <SystemAlerts />

        {/* Progress bar */}
        <ProgressBar currentSlide={currentSlide} totalSlides={totalSlides} />

        {/* Keyboard shortcuts helper */}
        <KeyboardShortcuts />

        {/* Main dashboard layout */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top status bar */}
          <StatusBar
            systemStatus={systemStatus}
            currentSlide={currentSlide + 1}
            totalSlides={totalSlides}
            onSystemToggle={() => setSystemStatus((prev) => (prev === "online" ? "standby" : "online"))}
          />

          {/* Main content area */}
          <div className="flex-1 flex">
            {/* Left sidebar with system stats */}
            <div className="w-48 border-r border-cyan-900/30 bg-black/40 p-2">
              <DashboardPanel title="SYSTEM STATUS">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-400" />
                      <span className="text-xs">SECURITY</span>
                    </div>
                    <span className="text-xs text-green-400">OPTIMAL</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 mr-2 text-yellow-400" />
                      <span className="text-xs">CPU LOAD</span>
                    </div>
                    <span className="text-xs text-yellow-400">76%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wifi className="h-4 w-4 mr-2 text-green-400" />
                      <span className="text-xs">NETWORK</span>
                    </div>
                    <span className="text-xs text-green-400">CONNECTED</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                      <span className="text-xs">WARNINGS</span>
                    </div>
                    <span className="text-xs text-yellow-400">2</span>
                  </div>
                </div>
              </DashboardPanel>

              <LiveMetrics />

              <DashboardPanel title="SLIDE NAVIGATION" className="mt-4">
                <NavigationControls currentSlide={currentSlide} totalSlides={totalSlides} onNavigate={goToSlide} />
              </DashboardPanel>
            </div>

            {/* Main content area with slides */}
            <div className="flex-1 relative">
              <div className="absolute inset-0">
                {/* Original intro slide (first slide) */}
                <Slide key="intro" isActive={currentSlide === 0} slideIndex={0}>
                  <SlideContent slideIndex={0} />
                </Slide>

                {/* Manifesto slide (second slide) */}
                <Slide key="manifesto" isActive={currentSlide === 1} slideIndex={1}>
                  <ManifestoSlide />
                </Slide>

                {/* Remaining slides (shifted by 1 from original) */}
                {Array.from({ length: totalSlides - 2 }).map((_, index) => (
                  <Slide key={index + 2} isActive={currentSlide === index + 2} slideIndex={index + 2}>
                    <SlideContent slideIndex={index + 1} />
                  </Slide>
                ))}
              </div>
            </div>

            {/* Right sidebar with terminal */}
            <div
              className={`border-l border-cyan-900/30 bg-black/40 transition-all duration-300 ${terminalMinimized ? "w-12" : "w-96"}`}
            >
              {terminalMinimized ? (
                <div className="h-full flex flex-col items-center pt-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTerminalMinimized(false)}
                    className="h-8 w-8 rounded-full bg-cyan-900/50 border border-cyan-500/50 hover:bg-cyan-800/70"
                  >
                    <Maximize className="h-4 w-4 text-cyan-400" />
                  </Button>
                  <div className="mt-2 text-xs text-cyan-400 vertical-text">TERMINAL INTERFACE</div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between bg-gradient-to-r from-purple-900/50 to-cyan-900/50 px-4 py-2">
                    <div className="flex items-center">
                      <Terminal className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-xs text-cyan-400">NEURAL COMMAND TERMINAL</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTerminalMinimized(true)}
                      className="h-6 w-6 rounded-full hover:bg-gray-800"
                    >
                      <Minimize className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>

                  <CyberpunkTerminal
                    history={terminalHistory}
                    input={terminalInput}
                    onInputChange={setTerminalInput}
                    onSubmit={handleTerminalSubmit}
                    terminalRef={terminalRef}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    )
  }
}
