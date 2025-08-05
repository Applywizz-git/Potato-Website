"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const testimonials = [
  {
    text: "Sent to my friend. He laughed a lot. Great idea! Fun fact, he still doesn't know who sent him the message hahah."
    ,
    author: "Agent R, Pune",
    rating: 5,
  },
  {
    text: "Broke up with a twist. Post Potato Made Sure my partner regrets breaking up with me. Lol, it was so much fun"
    ,
    author: "Agent A, Delhi",
    rating: 5,
  },
  {
    text: "Target kept the potato. I didn't notice any change, but I hope when we sit down for a drink he will tell me about the potato message!",
    author: "Agent K, Bangalore",
    rating: 5,
  },
  {
    text: "Sent a love message. She said yes!"
    ,
    author: "Agent P, Mumbai",
    rating: 5,
  },
  {
    text: "Shared my feedback through the anonymous potato and now my favourite hotel in Chennai makes extra green chutney.",
    author: "Agent A, Chennai",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const { isVisible, ref } = useIntersectionObserver()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isAutoPlaying && isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, isVisible])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🕵️Agent Reviews

          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-orange-100">
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-2xl">
                          ⭐
                        </span>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl text-gray-700 italic text-center mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Author */}
                    <div className="text-center">
                      <p className="font-semibold text-orange-600">– {testimonial.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>

        <div
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <button
            onClick={() => {
              window.open("https://instagram.com/potatopost", "_blank")
            }}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            See more Reviews 📱
          </button>
        </div>
      </div>
    </section>
  )
}
