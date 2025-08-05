"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const faqs = [
  {
    question: "Are the potatoes real?",
    answer: "Yes, they are fresh and real. We write your message anonymously on the fresh and real potato, to keep the target guessing.",
  },
  {
    question: "Will my name be shared?",
    answer:
      "No, it stays 100% private. Our idea is to change the idea of messaging through Post Potato, because we think it is not necessary that the receivers always know the name of the sender ",
  },
  {
    question: "How fast is the delivery",
    answer: "We try our best to deliver your message to the target as soon as possible. However, our standard potato ideally takes 2–4 days whereas the express potato are delivered in 1–2 days",
  },
  {
    question: "Will the potato spoil?",
    answer:
      "No, we are doing it for months and we make sure that the potato doesn't get spoiled till your target gets your message. ",
  },
  {
    question: "Can I track the Potato?",
    answer:
      "Yes, our customer support team will be available for you 24*7 which will allow you to track your potatoes every moment.",
  },
  {
    question: "How many words can I write?",
    answer:
      "You can send up to 40 words on the potato, hence make sure you share crisp, short and precise message for your target.",
  },
]

export function FAQSection() {
  const { isVisible, ref } = useIntersectionObserver()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">💡Frequently Asked Questions</h2>

        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`
                transition-all duration-700 transform
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-6 h-6 text-orange-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button
            onClick={() => {
              window.open("mailto:support@potatopost.in", "_blank")
            }}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Contact Our Team 💬
          </button>
        </div>
      </div>
    </section>
  )
}
