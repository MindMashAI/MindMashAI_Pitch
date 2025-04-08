"use client"
import Link from "next/link"
import {
  MessageSquare,
  Network,
  Wallet,
  Zap,
  Code,
  RocketIcon,
  Brain,
  Users,
  BarChart3,
  HelpCircle,
  Github,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import KnowledgeGraph from "@/components/knowledge-graph"
import TechStack from "@/components/tech-stack"
import ProgressDemo from "@/components/progress-demo"
import Roadmap from "@/components/roadmap"
import InteractiveFeedback from "@/components/interactive-feedback"
import { useAudio } from "@/components/audio-manager"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"

// Custom X logo component since Lucide doesn't have the updated X logo
function XLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

interface SlideContentProps {
  slideIndex: number
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export default function SlideContent({ slideIndex }: SlideContentProps) {
  const { isMobile } = useMobile()
  const { playSound } = useAudio()

  // Slide 1 - Title
  if (slideIndex === 0) {
    return (
      <motion.div
        className={`flex flex-col items-center justify-center text-center px-4 ${isMobile ? "slide-content-mobile py-8" : ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <motion.div
              className={`mb-6 flex items-center justify-center ${isMobile ? "flex-col" : ""}`}
              variants={itemVariants}
            >
              <img
                src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafybeia5skhvck24266qahayvxuhc5k3ez27xnmscrlwfjnwloeal5rdam"
                alt="MindMash.AI Logo"
                className={`${isMobile ? "mb-4 h-16 w-16" : "mr-2 h-20 w-20"}`}
              />
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                MindMash.AI
              </h1>
            </motion.div>
            <motion.h2
              className="mb-8 text-2xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
              variants={itemVariants}
            >
              The Neural Future of Collaboration
            </motion.h2>
            <motion.p className="mb-12 text-xl md:text-2xl text-cyan-300" variants={itemVariants}>
              Where humans and AI think together.
            </motion.p>
            <motion.div className="mt-8 animate-pulse" variants={itemVariants}>
              <p className="text-sm uppercase tracking-widest text-gray-400">Built for the Colosseum Hackathon</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Slide 2 - The Problem
  if (slideIndex === 1) {
    return (
      <motion.div
        className={`flex flex-col items-center justify-center ${isMobile ? "slide-content-mobile py-8" : ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="mb-6 md:mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 px-4 text-center leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            variants={itemVariants}
          >
            AI Feels Like Magic. But It's Still a Silo.
          </motion.h2>
          <motion.div className="mb-6 md:mb-8 text-center px-4" variants={itemVariants}>
            <p className="text-lg md:text-xl font-semibold">
              Users are overwhelmed by isolated tools with no unified, collaborative environment.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4">
            <motion.div
              className="flex flex-col items-center p-5 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
            >
              <MessageSquare className="mb-3 md:mb-4 h-10 w-10 md:h-12 md:w-12 text-orange-400 group-hover:animate-pulse" />
              <p className="text-center text-base md:text-lg">
                AI platforms are centralized & extractive — users don't own their contributions
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-5 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
            >
              <Users className="mb-3 md:mb-4 h-10 w-10 md:h-12 md:w-12 text-orange-400 group-hover:animate-pulse" />
              <p className="text-center text-base md:text-lg">
                No reward system for users who guide, train, or shape AI interactions
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-5 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
            >
              <BarChart3 className="mb-3 md:mb-4 h-10 w-10 md:h-12 md:w-12 text-orange-400 group-hover:animate-pulse" />
              <p className="text-center text-base md:text-lg">No alignment between value creation and value capture</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-5 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
            >
              <Network className="mb-3 md:mb-4 h-10 w-10 md:h-12 md:w-12 text-orange-400 group-hover:animate-pulse" />
              <p className="text-center text-base md:text-lg">
                Creativity and collaboration are still trapped in 1:1 interfaces
              </p>
            </motion.div>
          </div>
          <motion.div className="mt-6 md:mt-8 text-center px-4" variants={itemVariants}>
            <p className="text-base md:text-lg text-orange-300 font-semibold">
              AI isn't lacking power—it's lacking presence, alignment, and ownership.
            </p>
          </motion.div>
        </div>

        {/* Navigation indicators */}
        {!isMobile && (
          <>
            <div className="hidden md:block absolute left-4 inset-y-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white/80"
                onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }))}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="hidden md:block absolute right-4 inset-y-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white/80"
                onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }))}
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </>
        )}
      </motion.div>
    )
  }

  // Slide 5 - Why It Matters
  if (slideIndex === 4) {
    return (
      <motion.div
        className={`flex flex-col items-center justify-center ${isMobile ? "slide-content-mobile py-8" : ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="mb-6 md:mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 px-4 text-center leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            variants={itemVariants}
          >
            The Convergence Is Here.
            <br className="hidden sm:block" /> The World Isn't Ready.
          </motion.h2>
          <motion.div className="mb-6 md:mb-8 text-center px-4" variants={itemVariants}>
            <p className="text-lg md:text-xl font-semibold">
              MindMash.AI makes intelligence collaborative, rewarding, and alive.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4">
            <motion.div
              className="flex flex-col items-center p-5 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 hover:border-pink-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
            >
              <Brain className="mb-3 md:mb-4 h-10 w-10 md:h-12 md:w-12 text-pink-400 group-hover:animate-pulse" />
              <p className="text-center text-base md:text-lg">
                AI is everywhere—but it's fragmented. Users jump between tools, never owning the interactions.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-5 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 hover:border-pink-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
            >
              <Wallet className="mb-3 md:mb-4 h-10 w-10 md:h-12 md:w-12 text-pink-400 group-hover:animate-pulse" />
              <p className="text-center text-base md:text-lg">
                Web3 is mature enough for real utility with scalable chains and fast transactions.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-5 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 hover:border-pink-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
            >
              <RocketIcon className="mb-3 md:mb-4 h-10 w-10 md:h-12 md:w-12 text-pink-400 group-hover:animate-pulse" />
              <p className="text-center text-base md:text-lg">
                The UX layer for AI collaboration doesn't exist yet—we're building it.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-5 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 hover:border-pink-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
            >
              <Zap className="mb-3 md:mb-4 h-10 w-10 md:h-12 md:w-12 text-pink-400 group-hover:animate-pulse" />
              <p className="text-center text-base md:text-lg">
                We're entering the era of "personal protocols" that users can shape and earn from.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Navigation indicators */}
        {!isMobile && (
          <>
            <div className="hidden md:block absolute left-4 inset-y-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white/80"
                onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }))}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="hidden md:block absolute right-4 inset-y-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white/80"
                onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }))}
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </>
        )}
      </motion.div>
    )
  }

  // For other slides, return the original content
  // This keeps the implementation focused on the two slides we were asked to improve
  // You can extend the animations to other slides as needed

  // Slide 3 - The Solution
  if (slideIndex === 2) {
    return (
      <div className={`flex flex-col items-center ${isMobile ? "slide-content-mobile py-8" : "h-full justify-center"}`}>
        <h2 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          The Solution
        </h2>
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-4xl font-semibold text-white">MindMash.AI</h3>
          <p className="text-2xl">A real-time, multiplayer platform for:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="flex flex-col items-center p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 hover:border-teal-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group">
            <MessageSquare className="mb-4 h-12 w-12 text-teal-400 group-hover:animate-pulse" />
            <p className="text-center text-lg">Talking to multiple AIs in sync</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 hover:border-teal-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group">
            <Network className="mb-4 h-12 w-12 text-teal-400 group-hover:animate-pulse" />
            <p className="text-center text-lg">Visualizing conversations as a living knowledge graph</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 hover:border-teal-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group">
            <Wallet className="mb-4 h-12 w-12 text-teal-400 group-hover:animate-pulse" />
            <p className="text-center text-lg">Earning rewards through meaningful contributions</p>
          </div>
        </div>
        <div className="mt-8 max-h-[400px] overflow-hidden">
          <KnowledgeGraph />
        </div>
      </div>
    )
  }

  // Slide 4 - Core Features
  if (slideIndex === 3) {
    return (
      <div className={`flex flex-col items-center justify-center ${isMobile ? "slide-content-mobile py-8" : ""}`}>
        <h2 className="mb-8 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {[
            {
              icon: <MessageSquare className="h-10 w-10 text-blue-400" />,
              title: "AI Collab Chat",
              description: "Chat with GPT-4, Grok, Gemini together or individually",
            },
            {
              icon: <Network className="h-10 w-10 text-blue-400" />,
              title: "Knowledge Graph",
              description: "Visualize insights and connections",
            },
            {
              icon: <Wallet className="h-10 w-10 text-blue-400" />,
              title: "Mash.BiT Tokens",
              description: "Earn rewards through interaction and feedback",
            },
            {
              icon: <Zap className="h-10 w-10 text-blue-400" />,
              title: "Syndicates",
              description: "Community-driven DAOs for collaborative learning",
            },
            {
              icon: <Code className="h-10 w-10 text-blue-400" />,
              title: "Crossmint Integration",
              description: "Wallets + token utility",
            },
            {
              icon: <RocketIcon className="h-10 w-10 text-blue-400" />,
              title: "GOAT SDK",
              description: "Smooth, modular architecture",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
            >
              <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-blue-900/30 border border-blue-500/50 group-hover:border-blue-400">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Try Demo Button - Added here */}
        <div className="mt-12">
          <Link href="/demo" target="_blank">
            <Button
              className="px-8 py-6 text-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
              onClick={() => playSound("/sounds/maximize.mp3")}
            >
              <Zap className="mr-2 h-6 w-6" />
              Try Interactive Demo
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Slide 6 - Tech Stack
  if (slideIndex === 5) {
    return (
      <div className={`flex flex-col items-center justify-center ${isMobile ? "slide-content-mobile py-8" : ""}`}>
        <h2 className="mb-12 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Tech Stack
        </h2>
        <TechStack />
      </div>
    )
  }

  // Slide 7 - Progress & Demo
  if (slideIndex === 6) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Breakout Milestones
        </h2>
        <div
          className="w-full max-w-5xl mx-auto overflow-y-auto custom-scrollbar"
          style={{
            maxHeight: isMobile ? "calc(100vh - 200px)" : "calc(100vh - 250px)",
            paddingRight: "10px",
          }}
        >
          <ProgressDemo />
        </div>
      </div>
    )
  }

  // Slide 8 - What's Next
  if (slideIndex === 7) {
    return (
      <div className={`flex flex-col items-center justify-center ${isMobile ? "slide-content-mobile py-8" : ""}`}>
        <h2 className="mb-8 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          What's Next
        </h2>
        <Roadmap />
      </div>
    )
  }

  // Slide 9 - The Ask
  if (slideIndex === 8) {
    return (
      <div className={`flex flex-col items-center justify-center ${isMobile ? "slide-content-mobile py-8" : ""}`}>
        <h2 className="mb-12 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          The Ask
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {[
            {
              icon: <HelpCircle className="h-12 w-12 text-orange-400" />,
              text: "Feedback from mentors",
            },
            {
              icon: <Users className="h-12 w-12 text-orange-400" />,
              text: "Support in scaling the vision",
            },
            {
              icon: <Network className="h-12 w-12 text-orange-400" />,
              text: "Community who believe in human-AI unity",
            },
            {
              icon: <Wallet className="h-12 w-12 text-orange-400" />,
              text: "Guidance on next development steps",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/70 transition-all hover:transform hover:scale-105 cursor-pointer group"
            >
              <div className="mb-4 flex items-center justify-center h-20 w-20 rounded-full bg-orange-900/30 border border-orange-500/50 group-hover:border-orange-400">
                {item.icon}
              </div>
              <p className="text-center text-xl">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <InteractiveFeedback />
        </div>
      </div>
    )
  }

  // Slide 10 - Thank You
  if (slideIndex === 9) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center px-4 ${isMobile ? "slide-content-mobile py-8" : ""}`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <div className={`mb-6 flex items-center justify-center ${isMobile ? "flex-col" : ""}`}>
              <img
                src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafybeia5skhvck24266qahayvxuhc5k3ez27xnmscrlwfjnwloeal5rdam"
                alt="MindMash.AI Logo"
                className={`${isMobile ? "mb-4 h-16 w-16" : "mr-2 h-20 w-20"}`}
              />
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                MindMash.AI
              </h1>
            </div>
            <p className="mb-8 md:mb-12 text-xl md:text-2xl max-w-2xl">
              Let's build a future where minds—digital and human—think together.
            </p>
            <div className="flex flex-col items-center gap-4 md:gap-6 mt-4 md:mt-8">
              {isMobile ? (
                // Mobile layout - stacked buttons
                <div className="flex flex-col space-y-3 w-full">
                  <a href="https://github.com/MindMashAI/" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/20 w-full py-2 text-base"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Project Repo
                    </Button>
                  </a>
                  <a href="https://x.com/MindMash_AI" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 w-full py-2 text-base"
                    >
                      <XLogo className="mr-2 h-4 w-4" />
                      Follow Us
                    </Button>
                  </a>
                  <a href="mailto:info@mindmash.ai" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/20 w-full py-2 text-base"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Us
                    </Button>
                  </a>
                </div>
              ) : (
                // Desktop layout - horizontal buttons
                <div className="flex justify-center space-x-6">
                  <a href="https://github.com/MindMashAI/" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/20 px-6 py-3 text-lg"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      Project Repo
                    </Button>
                  </a>
                  <a href="https://x.com/MindMash_AI" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 px-6 py-3 text-lg"
                    >
                      <XLogo className="mr-2 h-5 w-5" />
                      Follow Us
                    </Button>
                  </a>
                  <a href="mailto:info@mindmash.ai" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/20 px-6 py-3 text-lg"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              )}

              <div className="mt-6 md:mt-8 flex items-center space-x-4">
                <span className="text-gray-400">Connect with us:</span>
                <a
                  href="https://x.com/MindMash_AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XLogo />
                </a>
                <a
                  href="https://github.com/MindMashAI/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:info@mindmash.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="mt-8 md:mt-16">
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-xl text-gray-400">Slide content not available</p>
    </div>
  )
}
