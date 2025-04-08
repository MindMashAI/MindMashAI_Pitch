import type React from "react"
import { AudioProvider } from "@/components/audio-manager"
import "./demo.css"

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AudioProvider>
      <div className="bg-black" style={{ height: "auto", minHeight: "100vh", overflowY: "auto", overflowX: "hidden" }}>
        {children}
      </div>
    </AudioProvider>
  )
}
