"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Mic, Volume2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-manager"
import { analyzeSentiment } from "@/lib/sentiment-analysis"
import { getAIResponse, determineCategory } from "@/lib/response-database"

// AI model types and colors
const AI_MODELS = {
  grok: {
    color: "text-green-400",
    bgColor: "bg-green-400",
    borderColor: "border-green-400",
  },
  chatgpt: {
    color: "text-fuchsia-400",
    bgColor: "bg-fuchsia-400",
    borderColor: "border-fuchsia-400",
  },
  gemini: {
    color: "text-cyan-400",
    bgColor: "bg-cyan-400",
    borderColor: "border-cyan-400",
  },
  user: {
    color: "text-blue-400",
    bgColor: "bg-blue-400",
    borderColor: "border-blue-400",
  },
  system: {
    color: "text-yellow-400",
    bgColor: "bg-yellow-400",
    borderColor: "border-yellow-400",
  },
}

// Get random response from an AI
function getRandomResponse(aiType: string) {
  const responses = AI_RESPONSES[aiType as keyof typeof AI_RESPONSES] || AI_RESPONSES.system
  return responses[Math.floor(Math.random() * responses.length)]
}

// AI responses for user inputs
const AI_RESPONSES = {
  grok: [
    "Your query has activated my neural pathways. Here's what I'm processing... - Grok",
    "I've analyzed your request using my neural pathways. The solution involves a recursive approach with O(log n) complexity.",
    "Based on my training data, this appears to be a novel approach. I'd recommend exploring quantum algorithms for better efficiency.",
    "Your hypothesis has merit. I've simulated 1,000 scenarios and found a 78.3% success rate under optimal conditions.",
  ],
  chatgpt: [
    "Let me provide a comprehensive response to your inquiry... - ChatGPT",
    "I've considered multiple perspectives on your query. Here's a comprehensive analysis with supporting evidence and potential counterarguments.",
    "Let me break this down systematically. There are three key factors to consider: scalability, security, and user experience.",
    "I'd like to offer a balanced perspective on this topic, considering both the advantages and potential limitations of the approach you're suggesting.",
  ],
  gemini: [
    "Your query has triggered a multi-dimensional analysis in my systems. Here's what I'm processing... - Gemini",
    "My multi-modal analysis suggests an innovative solution combining visual and textual elements for maximum impact.",
    "I've processed your request through my multimodal framework and identified several optimization opportunities.",
    "The data indicates a correlation between these variables that wasn't immediately apparent. Let me visualize this for better understanding.",
  ],
  system: [
    "Initiating cross-AI analysis. Compiling optimized response... - D.O.E.",
    "Cross-AI consensus reached. Confidence level: 92.7%. Implementing recommended solution.",
    "Divergent AI perspectives detected. Synthesizing optimal approach based on contextual relevance.",
    "AI collaboration complete. Solution quality improved by 43% compared to single-model response.",
  ],
}

// Command parser
type CommandType = "pin" | "hashtag" | "mention" | "poll" | "remind" | "none"

interface ParsedCommand {
  type: CommandType
  originalText: string
  processedText: string
  metadata?: any
}

function parseCommands(text: string): ParsedCommand[] {
  const commands: ParsedCommand[] = []

  // Check for pin command
  if (text.startsWith("/pin ")) {
    commands.push({
      type: "pin",
      originalText: text,
      processedText: text.substring(5),
      metadata: {
        pinned: true,
        timestamp: new Date().toISOString(),
      },
    })
    return commands
  }

  // Process hashtags (#topic)
  const hashtagRegex = /#(\w+)/g
  let match
  let processedText = text
  const hashtags: string[] = []

  while ((match = hashtagRegex.exec(text)) !== null) {
    hashtags.push(match[1])
    processedText = processedText.replace(
      match[0],
      `<span class="text-cyan-400 hover:underline cursor-pointer">#${match[1]}</span>`,
    )
  }

  if (hashtags.length > 0) {
    commands.push({
      type: "hashtag",
      originalText: text,
      processedText,
      metadata: { hashtags },
    })
  }

  // Process mentions (@user)
  const mentionRegex = /@(\w+)/g
  let mentionMatch
  let mentionProcessedText = processedText
  const mentions: string[] = []

  while ((mentionMatch = mentionRegex.exec(text)) !== null) {
    mentions.push(mentionMatch[1])
    mentionProcessedText = mentionProcessedText.replace(
      mentionMatch[0],
      `<span class="text-fuchsia-400 hover:underline cursor-pointer">@${mentionMatch[1]}</span>`,
    )
  }

  if (mentions.length > 0) {
    commands.push({
      type: "mention",
      originalText: text,
      processedText: mentionProcessedText,
      metadata: { mentions },
    })
  }

  // If no commands were found or only formatting was applied
  if (commands.length === 0) {
    commands.push({
      type: "none",
      originalText: text,
      processedText: text,
    })
  }

  return commands
}

function processMessage(message: string): {
  processedText: string
  commands: ParsedCommand[]
} {
  const commands = parseCommands(message)

  // Get the most processed version of the text
  const processedText = commands.reduce((text, command) => {
    return command.processedText || text
  }, message)

  return {
    processedText,
    commands,
  }
}

function renderProcessedMessage(processedText: string): React.ReactNode {
  return <div dangerouslySetInnerHTML={{ __html: processedText }} />
}

// Typing indicator component
function TypingIndicator({ sender }: { sender: string }) {
  const model = AI_MODELS[sender as keyof typeof AI_MODELS]

  return (
    <div
      className={`p-2 rounded-md ${
        sender === "grok"
          ? "bg-green-900/20 border-l-2 border-green-500"
          : sender === "chatgpt"
            ? "bg-fuchsia-900/20 border-l-2 border-fuchsia-500"
            : sender === "gemini"
              ? "bg-cyan-900/20 border-l-2 border-cyan-500"
              : "bg-gray-900/20 border-l-2 border-yellow-500"
      }`}
    >
      <div className="flex items-center">
        <div className={`font-bold ${model?.color || "text-gray-300"}`}>
          {sender.charAt(0).toUpperCase() + sender.slice(1)}
        </div>
        <div className="ml-2 flex space-x-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${model?.bgColor || "bg-gray-400"} animate-bounce`}
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className={`w-1.5 h-1.5 rounded-full ${model?.bgColor || "bg-gray-400"} animate-bounce`}
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className={`w-1.5 h-1.5 rounded-full ${model?.bgColor || "bg-gray-400"} animate-bounce`}
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  )
}

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isTyping?: boolean
  sender_display?: string
}

interface ChatInterfaceProps {
  onAIActivity: (aiType: string) => void
  currentEmotion: string
  onEmotionChange: (emotion: string) => void
}

export default function ChatInterface({ onAIActivity, currentEmotion, onEmotionChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [typingIndicators, setTypingIndicators] = useState<{ [key: string]: boolean }>({})
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([])
  const [selectedAI, setSelectedAI] = useState("All AIs [Collaborative]")
  const [offlineMode, setOfflineMode] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { playSound } = useAudio()
  const [sentiment, setSentiment] = useState({ score: 0.6, label: "Neutral" })

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use scrollIntoView with a more gentle behavior and contained to the parent
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      })
    }
  }, [messages])

  // Get emotion color based on sentiment score
  const getEmotionColor = (score: number) => {
    if (score >= 0.7) return "bg-green-600 hover:bg-green-700"
    if (score >= 0.55) return "bg-blue-600 hover:bg-blue-700"
    if (score <= 0.3) return "bg-red-600 hover:bg-red-700"
    if (score <= 0.45) return "bg-orange-600 hover:bg-orange-700"
    return "bg-purple-600 hover:bg-purple-700"
  }

  // Get emotion label based on sentiment score
  const getEmotionLabel = (score: number) => {
    if (score >= 0.7) return "Joy"
    if (score >= 0.55) return "Trust"
    if (score <= 0.3) return "Anger"
    if (score <= 0.45) return "Fear"
    return "Neutral"
  }

  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Process commands in the message
    const { processedText, commands } = processMessage(inputValue)

    // Analyze sentiment of the message
    const sentimentResult = analyzeSentiment(inputValue)
    setSentiment({
      score: sentimentResult.score,
      label: sentimentResult.label,
    })

    // Update the emotion based on sentiment
    onEmotionChange(getEmotionLabel(sentimentResult.score))

    // Handle special commands
    const pinCommand = commands.find((cmd) => cmd.type === "pin")
    if (pinCommand) {
      setPinnedMessages((prev) => [...prev, pinCommand.processedText])

      // Add system message about pinned message
      const systemMessage = {
        id: Date.now(),
        sender: "system",
        content: `Message pinned: "${pinCommand.processedText}"`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      }
      setMessages((prev) => [...prev, systemMessage])

      setInputValue("")
      return
    }

    // Play sound
    playSound("/sounds/terminal-command.mp3")

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Determine the message category for more relevant AI responses
    const messageCategory = determineCategory(inputValue)

    // Show typing indicators for AI models
    setTypingIndicators({
      grok: true,
      chatgpt: true,
      gemini: true,
    })

    // Simulate AI responses with different timing for each AI

    // Grok responds first
    setTimeout(() => {
      setTypingIndicators((prev) => ({ ...prev, grok: false }))
      const grokResponse = {
        id: Date.now() + 1,
        sender: "grok",
        content: getAIResponse("grok", messageCategory),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      }
      setMessages((prev) => [...prev, grokResponse])
      onAIActivity("grok")
      playSound("/sounds/feature-select.mp3")

      // Update sentiment based on AI response
      const grokSentiment = analyzeSentiment(grokResponse.content)
      setSentiment(grokSentiment)
      onEmotionChange(getEmotionLabel(grokSentiment.score))
    }, 1500)

    // ChatGPT responds second
    setTimeout(() => {
      setTypingIndicators((prev) => ({ ...prev, chatgpt: false }))
      const chatgptResponse = {
        id: Date.now() + 2,
        sender: "chatgpt",
        content: getAIResponse("chatgpt", messageCategory),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      }
      setMessages((prev) => [...prev, chatgptResponse])
      onAIActivity("chatgpt")
      playSound("/sounds/feature-select.mp3")

      // Update sentiment based on AI response
      const chatgptSentiment = analyzeSentiment(chatgptResponse.content)
      setSentiment(chatgptSentiment)
      onEmotionChange(getEmotionLabel(chatgptSentiment.score))
    }, 2500)

    // Gemini responds third
    setTimeout(() => {
      setTypingIndicators((prev) => ({ ...prev, gemini: false }))
      const geminiResponse = {
        id: Date.now() + 3,
        sender: "gemini",
        content: getAIResponse("gemini", messageCategory),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      }
      setMessages((prev) => [...prev, geminiResponse])
      onAIActivity("gemini")
      playSound("/sounds/feature-select.mp3")

      // Update sentiment based on AI response
      const geminiSentiment = analyzeSentiment(geminiResponse.content)
      setSentiment(geminiSentiment)
      onEmotionChange(getEmotionLabel(geminiSentiment.score))
    }, 3500)

    // System responds last
    setTimeout(() => {
      const systemResponse = {
        id: Date.now() + 4,
        sender: "system",
        content: getAIResponse("system", messageCategory),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      }
      setMessages((prev) => [...prev, systemResponse])
      onAIActivity("system")
      playSound("/sounds/feature-select.mp3")

      // Update sentiment based on AI response
      const systemSentiment = analyzeSentiment(systemResponse.content)
      setSentiment(systemSentiment)
      onEmotionChange(getEmotionLabel(systemSentiment.score))
    }, 4500)
  }

  return (
    <div className="border border-gray-800 bg-black/80 rounded-md overflow-hidden flex flex-col h-full">
      {/* Status bar */}
      <div className="p-2 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center">
          <span className="text-white mr-2 text-sm">Data: NEXUS</span>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-700 bg-black">
            <Mic className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-700 bg-black">
            <Volume2 className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-700 bg-black">
            <Bookmark className="h-4 w-4 text-gray-400" />
          </Button>
          <span className="text-xs px-2 py-1 rounded bg-yellow-900/30 text-yellow-500 border border-yellow-700/50">
            Offline Mode
          </span>
          <Button className={`h-8 rounded-md ${getEmotionColor(sentiment.score)} text-white px-3`}>
            <div
              className={`w-4 h-4 rounded-full ${
                sentiment.score >= 0.7
                  ? "bg-green-400"
                  : sentiment.score >= 0.55
                    ? "bg-blue-400"
                    : sentiment.score <= 0.3
                      ? "bg-red-400"
                      : sentiment.score <= 0.45
                        ? "bg-orange-400"
                        : "bg-fuchsia-400"
              } mr-2`}
            ></div>
            {currentEmotion || getEmotionLabel(sentiment.score)}
          </Button>
        </div>
      </div>

      {/* Warning banner */}
      <div className="bg-yellow-900/20 border-b border-yellow-700/50 px-4 py-2 text-yellow-500 text-sm flex items-center">
        <span className="mr-2">⚠</span>
        Running in offline mode with simulated AI responses
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar chat-messages-container"
        style={{ overscrollBehavior: "contain", height: "calc(100% - 120px)" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-md transition-all duration-300 hover:translate-x-1 ${
              msg.sender === "user"
                ? "bg-blue-900/20 border-l-2 border-blue-500 hover:border-blue-400 hover:bg-blue-900/30"
                : msg.sender === "grok"
                  ? "bg-green-900/20 border-l-2 border-green-500 hover:border-green-400 hover:bg-green-900/30"
                  : msg.sender === "chatgpt"
                    ? "bg-fuchsia-900/20 border-l-2 border-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-900/30"
                    : msg.sender === "gemini"
                      ? "bg-cyan-900/20 border-l-2 border-cyan-500 hover:border-cyan-400 hover:bg-cyan-900/30"
                      : "bg-yellow-900/20 border-l-2 border-yellow-500 hover:border-yellow-400 hover:bg-yellow-900/30"
            }`}
          >
            <div className="flex justify-between items-center">
              <div
                className={`font-bold ${
                  msg.sender === "grok"
                    ? "text-green-400"
                    : msg.sender === "chatgpt"
                      ? "text-fuchsia-400"
                      : msg.sender === "gemini"
                        ? "text-cyan-400"
                        : msg.sender === "user"
                          ? "text-blue-400"
                          : "text-yellow-400"
                }`}
              >
                {msg.sender_display || msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}
              </div>
              <div className="text-xs text-gray-500">{msg.timestamp}</div>
            </div>
            <div className="text-gray-300 mt-1">
              {msg.isTyping ? (
                <div className="flex items-center">
                  <span>{msg.content}</span>
                  <span className="ml-1 inline-block w-5 h-5 relative">
                    <span
                      className="absolute top-0 w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0s", left: "0px" }}
                    ></span>
                    <span
                      className="absolute top-0 w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s", left: "6px" }}
                    ></span>
                    <span
                      className="absolute top-0 w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s", left: "12px" }}
                    ></span>
                  </span>
                </div>
              ) : (
                renderProcessedMessage(processMessage(msg.content).processedText)
              )}
            </div>
          </div>
        ))}

        {/* Typing indicators */}
        {Object.entries(typingIndicators).map(
          ([sender, isTyping]) => isTyping && <TypingIndicator key={sender} sender={sender} />,
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Command bar */}
      <div className="px-2 py-1 text-xs border-t border-gray-800">
        Commands:
        <span className="text-cyan-400 mx-1 font-mono">/pin</span> |
        <span className="text-cyan-400 mx-1 font-mono">#hashtag</span> |
        <span className="text-fuchsia-400 mx-1 font-mono">@mention</span> |
        <span className="text-cyan-400 mx-1 font-mono">/poll</span> |
        <span className="text-cyan-400 mx-1 font-mono">/remind</span>
      </div>

      {/* Input area */}
      <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-800">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <Button variant="ghost" className="h-6 text-xs text-cyan-400 hover:bg-cyan-900/20 px-2 rounded-md">
              All AIs <span className="ml-1">▼</span>
            </Button>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-black/60 border border-cyan-900/50 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
          <Button
            type="submit"
            className="ml-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white px-4 shadow-md shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
          >
            <span className="mr-2">Send</span>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
