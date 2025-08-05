"use client"

import { useAnimatedCounter } from "@/hooks/use-animated-counter"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function StatsSection() {
  const { isVisible, ref } = useIntersectionObserver()
  const { count, ref: counterRef } = useAnimatedCounter(4000, 3000)

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-orange-100 to-pink-100">
      <div className="container mx-auto px-4 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 ref={counterRef} className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              {count.toLocaleString()}+
            </span>{" "}
            <span className="text-gray-800">Successful Operations Completed</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">Classified reactions from covert operatives worldwide</p>
        </div>
      </div>
    </section>
  )
}
