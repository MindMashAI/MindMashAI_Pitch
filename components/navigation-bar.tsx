"use client"

import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-manager"
import { User, MessageSquare, Wallet, Settings, HelpCircle } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NavigationBar() {
  const { playSound } = useAudio()
  const router = useRouter()
  const pathname = usePathname()

  const navigateTo = (path: string) => {
    playSound("/sounds/button-click.mp3")
    router.push(path)
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="border border-gray-800 bg-black/80 backdrop-blur-sm rounded-md p-2 shadow-lg">
      <div className="grid grid-cols-5 gap-2">
        <Button
          variant="ghost"
          className={cn(
            "flex flex-col items-center justify-center h-16 hover:bg-fuchsia-900/20 transition-all duration-300",
            isActive("/profile")
              ? "text-fuchsia-300 bg-fuchsia-900/30 border border-fuchsia-500/50"
              : "text-fuchsia-400",
          )}
          onClick={() => navigateTo("/profile")}
        >
          <User className={cn("h-5 w-5 mb-1", isActive("/profile") && "animate-pulse")} />
          <span className="text-xs font-medium">Profile</span>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "flex flex-col items-center justify-center h-16 hover:bg-fuchsia-900/20 transition-all duration-300",
            isActive("/syndicates")
              ? "text-fuchsia-300 bg-fuchsia-900/30 border border-fuchsia-500/50"
              : "text-fuchsia-400",
          )}
          onClick={() => navigateTo("/syndicates")}
        >
          <MessageSquare className={cn("h-5 w-5 mb-1", isActive("/syndicates") && "animate-pulse")} />
          <span className="text-xs font-medium">Syndicates</span>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "flex flex-col items-center justify-center h-16 hover:bg-fuchsia-900/20 transition-all duration-300",
            isActive("/solflare")
              ? "text-fuchsia-300 bg-fuchsia-900/30 border border-fuchsia-500/50"
              : "text-fuchsia-400",
          )}
          onClick={() => navigateTo("/solflare")}
        >
          <Wallet className={cn("h-5 w-5 mb-1", isActive("/solflare") && "animate-pulse")} />
          <span className="text-xs font-medium">Solflare</span>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "flex flex-col items-center justify-center h-16 hover:bg-fuchsia-900/20 transition-all duration-300",
            isActive("/settings")
              ? "text-fuchsia-300 bg-fuchsia-900/30 border border-fuchsia-500/50"
              : "text-fuchsia-400",
          )}
          onClick={() => navigateTo("/settings")}
        >
          <Settings className={cn("h-5 w-5 mb-1", isActive("/settings") && "animate-pulse")} />
          <span className="text-xs font-medium">Settings</span>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "flex flex-col items-center justify-center h-16 hover:bg-fuchsia-900/20 transition-all duration-300",
            isActive("/help") ? "text-fuchsia-300 bg-fuchsia-900/30 border border-fuchsia-500/50" : "text-fuchsia-400",
          )}
          onClick={() => navigateTo("/help")}
        >
          <HelpCircle className={cn("h-5 w-5 mb-1", isActive("/help") && "animate-pulse")} />
          <span className="text-xs font-medium">Help</span>
        </Button>
      </div>
    </div>
  )
}
