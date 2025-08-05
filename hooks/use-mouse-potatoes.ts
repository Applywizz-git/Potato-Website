"use client"

import { useEffect, useState } from "react"

interface Potato {
  id: string
  x: number
  y: number
  scale: number
  rotation: number
  animationType: "pop" | "bounce" | "float"
  shape: "normal" | "wide" | "tall" | "small" | "chunky"
  color: "normal" | "golden" | "russet" | "purple"
}

export function useMousePotatoes() {
  const [potatoes, setPotatoes] = useState<Potato[]>([])
  const [lastSpawn, setLastSpawn] = useState(0)

  const animationTypes: ("pop" | "bounce" | "float")[] = ["pop", "bounce", "float"]
  const shapes: ("normal" | "wide" | "tall" | "small" | "chunky")[] = ["normal", "wide", "tall", "small", "chunky"]
  const colors: ("normal" | "golden" | "russet" | "purple")[] = ["normal", "golden", "russet", "purple"]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      // Throttle potato spawning to every 80ms
      if (now - lastSpawn < 80) return

      const newPotato: Potato = {
        id: `potato-${now}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        scale: Math.random() * 0.8 + 0.4, // Random scale between 0.4 and 1.2
        rotation: Math.random() * 360, // Random rotation
        animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setPotatoes((prev) => [...prev, newPotato])
      setLastSpawn(now)

      // Remove potato after animation completes
      const duration = newPotato.animationType === "bounce" ? 1500 : newPotato.animationType === "float" ? 2500 : 2000

      setTimeout(() => {
        setPotatoes((prev) => prev.filter((p) => p.id !== newPotato.id))
      }, duration)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [lastSpawn])

  return potatoes
}
