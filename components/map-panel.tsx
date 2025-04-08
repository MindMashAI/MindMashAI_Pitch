"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Save, Upload, Download, Globe, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-manager"
import { CollaborationMap } from "@/components/collaboration-map"
import MashbitMinterModal from "@/components/mashbit-minter-modal"

// Define the map data structure
interface NodeData {
  id: string
  color: string
  position: { x: number; y: number }
  name: string
}

interface ConnectionData {
  from: string
  to: string
  strength: number
}

interface MapData {
  nodes: Record<string, NodeData>
  connections: ConnectionData[]
}

// Default map data
const DEFAULT_MAP_DATA: MapData = {
  nodes: {
    grok: {
      id: "grok",
      color: "rgba(74, 222, 128, 0.8)",
      position: { x: 0.85, y: 0.25 },
      name: "Grok",
    },
    chatgpt: {
      id: "chatgpt",
      color: "rgba(217, 70, 239, 0.8)",
      position: { x: 0.15, y: 0.75 },
      name: "ChatGPT",
    },
    gemini: {
      id: "gemini",
      color: "rgba(34, 211, 238, 0.8)",
      position: { x: 0.15, y: 0.25 },
      name: "Gemini",
    },
    user: {
      id: "user",
      color: "rgba(96, 165, 250, 0.8)",
      position: { x: 0.5, y: 0.5 },
      name: "User",
    },
    system: {
      id: "system",
      color: "rgba(250, 204, 21, 0.8)",
      position: { x: 0.85, y: 0.75 },
      name: "System",
    },
  },
  connections: [
    { from: "user", to: "chatgpt", strength: 0.8 },
    { from: "user", to: "grok", strength: 0.8 },
    { from: "user", to: "gemini", strength: 0.8 },
    { from: "user", to: "system", strength: 0.6 },
    { from: "chatgpt", to: "system", strength: 0.9 },
    { from: "grok", to: "system", strength: 0.9 },
    { from: "gemini", to: "system", strength: 0.9 },
    { from: "chatgpt", to: "grok", strength: 0.5 },
    { from: "chatgpt", to: "gemini", strength: 0.5 },
    { from: "grok", to: "gemini", strength: 0.5 },
  ],
}

interface MapPanelProps {
  activeNode: string
  onNodeClick: (node: string) => void
  tokenCount: number
}

export default function MapPanel({ activeNode, onNodeClick, tokenCount }: MapPanelProps) {
  const { playSound } = useAudio()
  const [isMashbitModalOpen, setIsMashbitModalOpen] = useState(false)
  const [mapData, setMapData] = useState<MapData>(DEFAULT_MAP_DATA)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // We'll keep track of which node is active but not calculate sentiment here
  useEffect(() => {
    console.log("Active node changed to:", activeNode)
  }, [activeNode])

  // Get color based on active node
  const getNodeColor = () => {
    switch (activeNode) {
      case "grok":
        return "text-green-400"
      case "chatgpt":
        return "text-fuchsia-400"
      case "gemini":
        return "text-cyan-400"
      case "user":
        return "text-blue-400"
      default:
        return "text-yellow-400"
    }
  }

  const handleMintMashbit = () => {
    playSound("/sounds/button-click.mp3")
    setIsMashbitModalOpen(true)
  }

  // Save map data as JSON file
  const handleSaveMap = () => {
    try {
      playSound("/sounds/button-click.mp3")
      console.log("Saving map data...")

      // Convert to JSON string
      const jsonString = JSON.stringify(mapData, null, 2)

      // Create a blob from the JSON string
      const blob = new Blob([jsonString], { type: "application/json" })

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)

      // Create a temporary anchor element
      const a = document.createElement("a")
      a.href = url
      a.download = "mindmash-map.json"

      // Append to body, click, and remove
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Clean up the URL
      URL.revokeObjectURL(url)

      console.log("Map saved successfully!")
    } catch (error) {
      console.error("Error saving map:", error)
      alert("Failed to save map. See console for details.")
    }
  }

  // Trigger file input click
  const handleLoadClick = () => {
    playSound("/sounds/button-click.mp3")
    console.log("Load button clicked, triggering file input...")
    fileInputRef.current?.click()
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed")

    const file = event.target.files?.[0]
    if (!file) {
      console.log("No file selected")
      return
    }

    console.log("File selected:", file.name)

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        console.log("File content loaded, parsing JSON...")

        const parsedData = JSON.parse(content) as MapData

        // Validate the data structure
        if (!parsedData.nodes || !parsedData.connections) {
          throw new Error("Invalid map data format")
        }

        console.log("Map data parsed successfully")
        setMapData(parsedData)
      } catch (error) {
        console.error("Error parsing map data:", error)
        alert("Invalid map data format. Please upload a valid map JSON file.")
      }
    }

    reader.onerror = (error) => {
      console.error("Error reading file:", error)
      alert("Error reading file. Please try again.")
    }

    reader.readAsText(file)

    // Reset the input value
    event.target.value = ""
  }

  return (
    <>
      <div className="border border-gray-800 bg-black/80 rounded-md overflow-hidden h-full flex flex-col">
        <div className="p-3 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-cyan-400">AI Collaboration Map</h2>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-[300px]">
            <CollaborationMap activeNode={activeNode} onNodeClick={onNodeClick} mapData={mapData} />
          </div>
        </div>

        <div className="p-3 border-t border-gray-800">
          {/* Map data and controls section */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-black/50 border border-gray-800 rounded-md p-2">
              <div className="text-xs text-gray-400 mb-1">Active AI:</div>
              <div className={`font-bold text-base ${getNodeColor()}`}>
                {activeNode.charAt(0).toUpperCase() + activeNode.slice(1)}
              </div>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-md p-2">
              <div className="text-xs text-gray-400 mb-1">Status:</div>
              <div className="font-bold text-base text-green-400">Connected</div>
            </div>
          </div>

          {/* Save/Load buttons */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button
              variant="outline"
              className="border-cyan-900/50 bg-black/50 hover:bg-cyan-900/20 text-cyan-400"
              onClick={handleSaveMap}
            >
              <Save className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-xs">Save Map</span>
            </Button>

            <Button
              variant="outline"
              className="border-cyan-900/50 bg-black/50 hover:bg-cyan-900/20 text-cyan-400"
              onClick={handleLoadClick}
            >
              <Upload className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-xs">Load Map</span>
            </Button>

            {/* Hidden file input */}
            <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
          </div>

          {/* Node activity visualization */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Activity Level</span>
            </div>
            <div className="h-2 bg-gray-800/70 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full ${getNodeColor().replace("text-", "bg-")} transition-all duration-700 ease-in-out`}
                style={{
                  width: `${Math.random() * 30 + 70}%`,
                  boxShadow: `0 0 10px ${getNodeColor().replace("text-", "rgb").replace("400", "500")}`,
                }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button
              variant="outline"
              className="border-cyan-900/50 bg-black/50 hover:bg-cyan-900/20 text-cyan-400"
              onClick={() => playSound("/sounds/button-click.mp3")}
            >
              <BarChart className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-xs">Analytics</span>
            </Button>

            <Button
              variant="outline"
              className="border-cyan-900/50 bg-black/50 hover:bg-cyan-900/20 text-cyan-400"
              onClick={() => playSound("/sounds/button-click.mp3")}
            >
              <Globe className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-xs">Collab.Sphere</span>
            </Button>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white"
            onClick={handleMintMashbit}
          >
            <Download className="mr-2 h-4 w-4" />
            MINT: MASH.BIT
          </Button>
        </div>
      </div>

      {/* MashBit Minter Modal */}
      <MashbitMinterModal
        isOpen={isMashbitModalOpen}
        onClose={() => setIsMashbitModalOpen(false)}
        currentTokens={tokenCount}
      />
    </>
  )
}
