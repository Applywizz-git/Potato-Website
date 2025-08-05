"use client"

import { useMousePotatoes } from "@/hooks/use-mouse-potatoes"

export function MousePotatoEffect() {
  const potatoes = useMousePotatoes()

  const getPotatoStyle = (potato: any) => {
    let transform = `scale(${potato.scale}) rotate(${potato.rotation}deg)`
    let filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"

    // Different potato shapes through CSS transforms
    switch (potato.shape) {
      case "wide":
        transform += " scaleX(1.4) scaleY(0.8)"
        break
      case "tall":
        transform += " scaleX(0.7) scaleY(1.3)"
        break
      case "small":
        transform += " scale(0.6)"
        break
      case "chunky":
        transform += " scaleX(1.2) scaleY(1.2)"
        break
      default:
        // normal shape
        break
    }

    // Different potato colors through CSS filters
    switch (potato.color) {
      case "golden":
        filter += " hue-rotate(30deg) saturate(1.3) brightness(1.1)"
        break
      case "russet":
        filter += " hue-rotate(-20deg) saturate(1.2) brightness(0.9)"
        break
      case "purple":
        filter += " hue-rotate(250deg) saturate(1.4) brightness(0.8)"
        break
      default:
        // normal color
        break
    }

    return { transform, filter }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {potatoes.map((potato) => {
        const style = getPotatoStyle(potato)
        return (
          <div
            key={potato.id}
            className={`absolute animate-potato-${potato.animationType}`}
            style={{
              left: potato.x - 15,
              top: potato.y - 15,
            }}
          >
            <span
              className="text-2xl select-none"
              style={{
                transform: style.transform,
                filter: style.filter,
                display: "inline-block",
              }}
            >
              🥔
            </span>
          </div>
        )
      })}
    </div>
  )
}
