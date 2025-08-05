"use client"

import { useState, useEffect } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const steps = [
  {
    icon: "✍️",
    title: "Type Your Message",
    description: " Write Up to 40 words only",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: "📦",
    title: "We Print It on a Potato",
    description: " We print your message with permanent ink",
    color: "from-green-400 to-green-600",
  },
  {
    icon: "🚚",
    title: " Secret Delivery Starts",
    description: " Potato is packed and delivered without names",
    color: "from-orange-400 to-orange-600",
  },
  {
    icon: "⚡",
    title: "Target Gets the Potato",
    description: " They open it. Reaction guaranteed",
    color: "from-purple-400 to-purple-600",
  },
]

export function HowItWorksSection() {
  const { isVisible, ref } = useIntersectionObserver()
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])

  useEffect(() => {
    if (isVisible) {
      steps.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSteps((prev) => [...prev, index])
        }, index * 500)
      })
    } else {
      setVisibleSteps([])
    }
  }, [isVisible])

  return (
    <section id="how-it-works" ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🛠️
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500"> How It Works</span>
          </h2>

        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                relative transition-all duration-1000 transform
                ${visibleSteps.includes(index)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
                }
              `}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                  hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0
                  transition-all duration-1000 delay-500
                  ${visibleSteps.includes(index + 1) ? "opacity-100" : "opacity-0"}
                `}
                />
              )}

              <div className="relative z-10 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                <div
                  className={`
                  w-16 h-16 rounded-full bg-gradient-to-r ${step.color} 
                  flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto
                  transition-all duration-500
                  ${visibleSteps.includes(index) ? "animate-bounce" : ""}
                `}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>

                <p className="text-gray-600 leading-relaxed">{step.description}</p>

                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-1000 delay-1000 ${visibleSteps.length === steps.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <button
            onClick={() => {
              const element = document.getElementById("pricing")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Start Your Potato Mission Now →
          </button>
        </div>
      </div>
    </section>
  )
}
