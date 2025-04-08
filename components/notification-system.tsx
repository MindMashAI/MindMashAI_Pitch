"use client"
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react"

export interface Notification {
  id: string
  type: "success" | "warning" | "info"
  message: string
  duration?: number
}

interface NotificationSystemProps {
  notifications?: Notification[]
  onDismiss?: (id: string) => void
}

export default function NotificationSystem({ notifications = [], onDismiss = () => {} }: NotificationSystemProps) {
  // If notifications is undefined or empty, return null
  if (!notifications || notifications.length === 0) return null

  return (
    <div className="inline-flex items-center space-x-2 max-w-lg overflow-hidden">
      <div className="flex items-center px-3 py-1 rounded-md animate-fadeIn bg-black/70 backdrop-filter backdrop-blur-md border border-cyan-900/50 shadow-md transition-all duration-300 hover:border-cyan-700">
        <div className="mr-2 flex-shrink-0">
          {notifications[0].type === "success" && <CheckCircle className="h-4 w-4 text-green-400" />}
          {notifications[0].type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-400" />}
          {notifications[0].type === "info" && <Info className="h-4 w-4 text-cyan-400" />}
        </div>
        <div className="flex-1 text-sm truncate max-w-xs">
          <span
            className={`
            ${
              notifications[0].type === "success"
                ? "text-green-400"
                : notifications[0].type === "warning"
                  ? "text-yellow-400"
                  : "text-cyan-400"
            }
          `}
          >
            {notifications[0].message}
          </span>
        </div>
        {onDismiss && (
          <button
            onClick={() => onDismiss(notifications[0].id)}
            className="ml-2 text-gray-400 hover:text-white flex-shrink-0 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      {notifications.length > 1 && (
        <div className="text-xs text-cyan-400 bg-black/70 backdrop-filter backdrop-blur-md px-2 py-1 rounded-md border border-cyan-900/50 shadow-md">
          +{notifications.length - 1} more
        </div>
      )}
    </div>
  )
}
