"use client"

import { useEffect, useState } from "react"

interface ProgressBarProps {
  currentSlide: number
  totalSlides: number
}

export default function ProgressBar({ currentSlide, totalSlides }: ProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Calculate progress percentage
    const newProgress = ((currentSlide + 1) / totalSlides) * 100

    // Animate progress change
    const start = progress
    const end = newProgress
    const duration = 500
    const startTime = performance.now()

    const animateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentValue = start + (end - start) * progress

      setProgress(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animateProgress)
      }
    }

    requestAnimationFrame(animateProgress)
  }, [currentSlide, totalSlides])

  return (
    <div className="fixed top-10 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-1/2 max-w-md bg-black/40 backdrop-blur-sm rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
