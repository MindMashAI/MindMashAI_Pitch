"use client"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import NeuralConnectionEffect from "@/components/neural-connection-effect"

export default function ManifestoSlide() {
  const { isMobile } = useMobile()
  const [typedText, setTypedText] = useState<string[]>(Array(26).fill(""))
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const manifesto = [
    { text: "The MindMash.AI Manifesto", isHeader: true },
    { text: "For the Colosseum Hackathon | 2025", isSubheader: true },
    { text: "" },
    { text: "We believe the future of intelligence is not centralized.", isHighlight: false },
    { text: "It's not corporate.", isHighlight: false },
    { text: "And it's not human-only.", isHighlight: false },
    { text: "" },
    { text: "It's collaborative.", isHighlight: true },
    { text: "It's composable.", isHighlight: true },
    { text: "It's beautifully chaotic.", isHighlight: true },
    { text: "" },
    {
      text: "MindMash.AI is a cyberpunk-native platform where human minds and artificial intelligence converge—not in servitude, but in symbiosis. It's a place where thought is currency, conversation is creation, and every interaction pushes the network forward.",
      isParagraph: true,
    },
    { text: "" },
    { text: "We are not building another chatbot.", isHighlight: false },
    { text: "We are building a neural frontier—", isHighlight: false },
    { text: "where Grok, Gemini, and GPT-4 become co-creators,", isHighlight: false },
    { text: "and users earn Mash.BiT by engaging, mapping, and evolving the ecosystem.", isHighlight: false },
    { text: "" },
    { text: "We are crafting a decentralized hive of thought.", isHighlight: true },
    { text: "An interactive AI mesh.", isHighlight: true },
    { text: "A living interface between man and machine.", isHighlight: true },
    { text: "" },
    { text: "This isn't just a project.", isHighlight: false },
    { text: "This is a proof-of-thought.", isHighlight: false },
    { text: "A signal from the future.", isHighlight: false },
    { text: "" },
  ]

  const finalMessage = [
    { text: "Welcome to MindMash.AI.", isHighlight: true },
    { text: "Let's mash minds.", isHighlight: true },
  ]

  // Typewriter effect
  useEffect(() => {
    if (currentLineIndex >= manifesto.length) {
      // All lines have been typed, show final message
      setTimeout(() => {
        setShowFinalMessage(true)
      }, 800)
      return
    }

    const currentLine = manifesto[currentLineIndex].text

    if (currentLine === "") {
      // If empty line, move to next line immediately
      setTypedText((prev) => {
        const updated = [...prev]
        updated[currentLineIndex] = ""
        return updated
      })
      setCurrentLineIndex((prev) => prev + 1)
      setCurrentCharIndex(0)
      return
    }

    if (currentCharIndex < currentLine.length) {
      // Type next character
      const typingSpeed = Math.random() * 15 + 5 // Random typing speed between 5-20ms
      const timer = setTimeout(() => {
        setTypedText((prev) => {
          const updated = [...prev]
          updated[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1)
          return updated
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else {
      // Line completed, move to next line
      const lineDelay = Math.random() * 100 + 50 // Random delay between lines (50-150ms)
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, lineDelay)

      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, currentCharIndex])

  // Scroll to keep text in view on mobile
  useEffect(() => {
    if (isMobile && containerRef.current) {
      const interval = setInterval(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isMobile, typedText])

  // Terminal cursor blink effect
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-y-auto flex items-center justify-center ${isMobile ? "pb-24" : ""}`}
    >
      {/* Background elements - consistent with other slides */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-scanline opacity-5"></div>
        <NeuralConnectionEffect className="opacity-30" />
      </div>

      {/* Binary code rain effect - subtle in background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xs font-mono text-cyan-500/20 whitespace-nowrap animate-float"
            style={{
              left: `${i * 5}%`,
              top: "-20px",
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j} style={{ opacity: Math.random() * 0.5 + 0.1 }}>
                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Manifesto content - made smaller and better positioned */}
      <div className={`relative z-10 max-w-3xl mx-auto px-6 ${isMobile ? "py-12" : ""} h-4/5 flex flex-col`}>
        {/* Terminal-like interface elements */}
        <div className="flex justify-between text-xs text-cyan-500/70 font-mono mb-2">
          <div>[SYSTEM:NEURAL_INTERFACE]</div>
          <div className="animate-pulse">[TRANSMITTING...]</div>
        </div>

        <div className="flex-1 flex items-center">
          <div
            className="bg-black/70 backdrop-blur-md rounded-lg border border-purple-900/30 shadow-lg p-6 overflow-hidden max-h-[80vh] w-full"
            style={{
              boxShadow: "0 0 40px rgba(138, 43, 226, 0.1), 0 0 20px rgba(0, 255, 255, 0.1)",
            }}
          >
            <div className="space-y-2 font-mono overflow-y-auto max-h-[calc(80vh-3rem)] pr-2 scrollbar-thin">
              {manifesto.map((line, index) => (
                <div key={index} className="overflow-hidden">
                  {line.isHeader ? (
                    <h1 className="text-2xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      {typedText[index]}
                      {currentLineIndex === index && cursorVisible && <span className="text-cyan-400">▌</span>}
                    </h1>
                  ) : line.isSubheader ? (
                    <h2 className="text-lg md:text-xl font-light text-gray-400 mb-4">
                      {typedText[index]}
                      {currentLineIndex === index && cursorVisible && <span className="text-cyan-400">▌</span>}
                    </h2>
                  ) : line.isParagraph ? (
                    <p className="text-sm md:text-base text-gray-300 my-3">
                      {typedText[index]}
                      {currentLineIndex === index && cursorVisible && <span className="text-cyan-400">▌</span>}
                    </p>
                  ) : line.text === "" ? (
                    <div className="h-3"></div>
                  ) : line.isHighlight ? (
                    <p className="text-base md:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {typedText[index]}
                      {currentLineIndex === index && cursorVisible && <span className="text-cyan-400">▌</span>}
                    </p>
                  ) : (
                    <p className="text-base md:text-lg text-white">
                      {typedText[index]}
                      {currentLineIndex === index && cursorVisible && <span className="text-cyan-400">▌</span>}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Final message with special animation */}
            <div className={`mt-6 transition-all duration-1000 ${showFinalMessage ? "opacity-100" : "opacity-0"}`}>
              {finalMessage.map((line, index) => (
                <div
                  key={index}
                  className={`text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 ${
                    index === 0 ? "mb-2" : ""
                  } ${showFinalMessage ? "animate-pulse" : ""}`}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glitch overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-glitch opacity-5"></div>
    </div>
  )
}
