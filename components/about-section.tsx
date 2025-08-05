"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function AboutSection() {
  const { isVisible, ref } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="text-8xl mb-4">🥔</div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg inline-block">
                    <p className="text-gray-800 font-medium italic">"Your secrets are safe... but theirs aren't."</p>
                    <p className="text-sm text-gray-500 mt-2">- Shadow Agent</p>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-pink-200 rounded-full w-8 h-8 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 bg-blue-200 rounded-full w-6 h-6 animate-pulse"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">🔍What is PotatoPost?</h2>

            <div className="space-y-4 text-lg text-gray-600 mb-8">
              <p>
                PotatoPost sends your message on a real potato
                No name is shown, everything is anonymous
                We deliver across every city and town in India
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: "🥔", text: "Real potato with printed message" },
                { icon: "🔒", text: "No name, no personal info" },
                { icon: "🇮🇳", text: "Secret delivery network in india" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="bg-green-100 rounded-full p-2 text-2xl">{item.icon}</div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const element = document.getElementById("how-it-works")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="mt-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Your Mission →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
