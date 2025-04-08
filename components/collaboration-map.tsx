"use client"

import { useState, useEffect, useRef } from "react"

// Types for map data
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

// Default AI model types and positions
const DEFAULT_AI_MODELS = {
  grok: {
    id: "grok",
    color: "rgba(74, 222, 128, 0.8)", // green
    position: { x: 0.85, y: 0.25 },
    name: "Grok",
  },
  chatgpt: {
    id: "chatgpt",
    color: "rgba(217, 70, 239, 0.8)", // fuchsia
    position: { x: 0.15, y: 0.75 },
    name: "ChatGPT",
  },
  gemini: {
    id: "gemini",
    color: "rgba(34, 211, 238, 0.8)", // cyan
    position: { x: 0.15, y: 0.25 },
    name: "Gemini",
  },
  user: {
    id: "user",
    color: "rgba(96, 165, 250, 0.8)", // blue
    position: { x: 0.5, y: 0.5 },
    name: "User",
  },
  system: {
    id: "system",
    color: "rgba(250, 204, 21, 0.8)", // yellow
    position: { x: 0.85, y: 0.75 },
    name: "System",
  },
}

// Default connection definitions
const DEFAULT_CONNECTIONS = [
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
]

interface CollaborationMapProps {
  activeNode: string
  onNodeClick: (node: string) => void
  className?: string
  mapData?: MapData
}

export function CollaborationMap({ activeNode, onNodeClick, className = "", mapData }: CollaborationMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Use a ref for animation phase instead of state to avoid re-renders
  const animationPhaseRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Draw the map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Use mapData if provided, otherwise use default data
    const nodes = mapData?.nodes || DEFAULT_AI_MODELS
    const connections = mapData?.connections || DEFAULT_CONNECTIONS

    // Calculate node positions based on canvas size
    const positions: { [key: string]: { x: number; y: number } } = {}
    Object.entries(nodes).forEach(([key, node]) => {
      positions[key] = {
        x: node.position.x * canvas.width,
        y: node.position.y * canvas.height,
      }
    })

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach((conn) => {
        const fromPos = positions[conn.from]
        const toPos = positions[conn.to]

        if (!fromPos || !toPos) return

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(fromPos.x, fromPos.y)
        ctx.lineTo(toPos.x, toPos.y)

        // Set line style based on connection strength and active node
        const isActive = activeNode === conn.from || activeNode === conn.to
        const isHovered = hoveredNode === conn.from || hoveredNode === conn.to

        ctx.lineWidth = isActive ? 2 : isHovered ? 1.5 : 1

        // Create gradient for the line
        const gradient = ctx.createLinearGradient(fromPos.x, fromPos.y, toPos.x, toPos.y)

        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        if (fromNode && toNode) {
          const alpha = isActive ? 0.8 : isHovered ? 0.6 : 0.3
          gradient.addColorStop(0, fromNode.color.replace("0.8", alpha.toString()))
          gradient.addColorStop(1, toNode.color.replace("0.8", alpha.toString()))
          ctx.strokeStyle = gradient
        } else {
          ctx.strokeStyle = isActive
            ? "rgba(255, 255, 255, 0.8)"
            : isHovered
              ? "rgba(255, 255, 255, 0.6)"
              : "rgba(255, 255, 255, 0.3)"
        }

        ctx.stroke()

        // Draw animated data packets
        if (isActive || isHovered || Math.random() > 0.7) {
          const packetPos =
            (animationPhaseRef.current + ((conn.from.charCodeAt(0) + conn.to.charCodeAt(0)) % 5) * 0.2) % 1
          const packetX = fromPos.x + (toPos.x - fromPos.x) * packetPos
          const packetY = fromPos.y + (toPos.y - fromPos.y) * packetPos

          ctx.beginPath()
          ctx.arc(packetX, packetY, 3, 0, Math.PI * 2)

          if (fromNode && toNode) {
            const packetColor = packetPos < 0.5 ? fromNode.color : toNode.color
            ctx.fillStyle = packetColor
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          }

          ctx.fill()
        }
      })

      // Draw nodes
      Object.entries(nodes).forEach(([key, node]) => {
        const pos = positions[key]
        if (!pos) return

        const isActive = activeNode === key
        const isHovered = hoveredNode === key

        // Draw glow effect for active/hovered nodes
        if (isActive || isHovered) {
          ctx.beginPath()
          const radius = isActive ? 15 : 12
          const gradient = ctx.createRadialGradient(pos.x, pos.y, radius * 0.8, pos.x, pos.y, radius * 2.5)

          gradient.addColorStop(0, node.color.replace("0.8", "0.3"))
          gradient.addColorStop(1, node.color.replace("0.8", "0"))

          ctx.fillStyle = gradient
          ctx.arc(pos.x, pos.y, radius * 2.5, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw node circle
        ctx.beginPath()
        const radius = isActive ? 15 : isHovered ? 13 : 10
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)

        // Fill with gradient
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius)
        gradient.addColorStop(0, node.color)
        gradient.addColorStop(1, node.color.replace("0.8", "0.4"))

        ctx.fillStyle = gradient
        ctx.fill()

        // Draw border
        ctx.lineWidth = isActive ? 2 : isHovered ? 1.5 : 1
        ctx.strokeStyle = node.color.replace("0.8", "1.0")
        ctx.stroke()

        // Draw label
        ctx.font = isActive ? "bold 12px Arial" : "10px Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.name, pos.x, pos.y + radius + 12)
      })

      // Update animation phase using the ref
      animationPhaseRef.current = (animationPhaseRef.current + 0.005) % 1

      // Store the animation frame ID in the ref for cleanup
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Handle mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      let hovered: string | null = null

      Object.entries(positions).forEach(([key, pos]) => {
        const distance = Math.sqrt(Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2))
        if (distance < 20) {
          hovered = key
          canvas.style.cursor = "pointer"
        }
      })

      if (!hovered) {
        canvas.style.cursor = "default"
      }

      setHoveredNode(hovered)
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      Object.entries(positions).forEach(([key, pos]) => {
        const distance = Math.sqrt(Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2))
        if (distance < 20) {
          onNodeClick(key)
        }
      })
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)

    return () => {
      // Clean up event listeners
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)

      // Cancel animation frame
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [activeNode, hoveredNode, onNodeClick, dimensions, mapData])

  return (
    <div className={`w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
