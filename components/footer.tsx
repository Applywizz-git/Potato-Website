"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Shield, Truck, RotateCcw, FileText, Users, HelpCircle } from "lucide-react"

export function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const policies = [
    {
      id: "privacy",
      title: "Safety and Privacy",
      icon: Shield,
      description: "Your data is classified",
      items: [
        "No personal info is shared",
        "Fully secure and encrypted",
        "Safe payment systems",
        "Anonymous operations only",
      ],
    },
    {
      id: "shipping",
      title: "Deployment Policy",
      icon: Truck,
      description: "Mission delivery terms",
      items: [
        "2-4 Days Standard Deployment",
        "1-2 Days Priority Operations",
        "PAN India Shadow Network",
        "Tracking Intelligence",
        "Covert Packaging Standards",
      ],
    },
    {
      id: "returns",
      title: "Mission Abort Policy",
      icon: RotateCcw,
      description: "Operation cancellation terms",
      items: [
        "7-Day Mission Recall",
        "Defective Intel Exchange",
        "Refund Processing Protocol",
        "Return Shipping Coverage",
        "Quality Assurance Standards",
      ],
    },
    {
      id: "terms",
      title: "Operative Agreement",
      icon: FileText,
      description: "Service terms & conditions",
      items: [
        "Agent Responsibilities",
        "Service Limitations",
        "Liability Protocols",
        "Dispute Resolution",
        "Agreement Modifications",
      ],
    },
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: "Command Center",
      value: "ops@potatopost.in",
      link: "mailto:ops@potatopost.in",
    },
    {
      icon: Phone,
      label: "Emergency Hotline",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
    },
    {
      icon: MapPin,
      label: "HQ Location",
      value: "Mumbai, India",
      link: "#",
    },
  ]

  const quickLinks = [
    { label: "Mission Briefing", href: "#faq", icon: HelpCircle },
    { label: "Agent Recruitment", href: "#about", icon: Users },
    { label: "Operation Costs", href: "#pricing", icon: FileText },
    { label: "Field Reports", href: "#testimonials", icon: Shield },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x * 0.02 - 100,
            top: mousePosition.y * 0.01 - 100,
          }}
        />
        <div
          className="absolute w-64 h-64 bg-pink-500/10 rounded-full blur-2xl transition-all duration-700 ease-out"
          style={{
            right: windowSize.width > 0 ? (windowSize.width - mousePosition.x) * 0.03 - 50 : 0,
            bottom: windowSize.height > 0 ? (windowSize.height - mousePosition.y) * 0.02 - 50 : 0,
          }}
        />
        <div
          className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-xl transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x * 0.05,
            top: mousePosition.y * 0.03,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">🥔</span>
              <h2 className="text-3xl font-bold">PotatoPost Command Center</h2>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your trusted partner in covert potato intelligence operations. Delivering classified messages across India
              since the dawn of mysterious communications.
            </p>
          </div>

          {/* Policies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {policies.map((policy, index) => {
              const Icon = policy.icon
              return (
                <div
                  key={policy.id}
                  className={`
                    group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 
                    transition-all duration-500 hover:bg-white/10 hover:border-orange-500/50 hover:shadow-2xl
                    ${hoveredSection === policy.id ? "scale-105" : ""}
                  `}
                  onMouseEnter={() => setHoveredSection(policy.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  style={{
                    transform: `translateY(${Math.sin((mousePosition.x + index * 100) * 0.01) * 5}px)`,
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-lg">{policy.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{policy.description}</p>
                  <ul className="space-y-2">
                    {policy.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm text-gray-300 hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Contact & Links Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Contact Information */}
            <div
              className="space-y-6"
              style={{
                transform: `translateX(${Math.cos(mousePosition.y * 0.01) * 10}px)`,
              }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-orange-500">📡</span>
                Communication Channels
              </h3>
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon
                return (
                  <a
                    key={index}
                    href={contact.link}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{contact.label}</p>
                      <p className="font-medium group-hover:text-orange-400 transition-colors">{contact.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Quick Links */}
            <div
              className="space-y-6"
              style={{
                transform: `translateX(${Math.sin(mousePosition.y * 0.01) * -10}px)`,
              }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-orange-500">🎯</span>
                Quick Access
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105"
                    >
                      <Icon className="w-4 h-4 text-orange-400 group-hover:text-orange-300" />
                      <span className="text-sm font-medium group-hover:text-orange-400 transition-colors">
                        {link.label}
                      </span>
                    </a>
                  )
                })}
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl p-6 border border-orange-500/30">
                <h4 className="font-semibold mb-2">Join Secret Intelligence Network</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Get classified updates on new operations and exclusive offers
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400"
                  />
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors">
                    Enlist
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { label: "256-bit Encryption", icon: "🔐" },
              { label: "Secure Payments", icon: "💳" },
              { label: "Anonymous Operations", icon: "🕵️" },
              { label: "PCI Compliant", icon: "🛡️" },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-green-500/50 transition-all duration-300"
                style={{
                  transform: `scale(${1 + Math.sin((mousePosition.x + index * 200) * 0.01) * 0.05})`,
                }}
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="text-sm font-medium text-gray-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>© 2024 PotatoPost Intelligence Agency</span>
                <span>•</span>
                <span>All operations classified</span>
                <span>•</span>
                <span>Made with 🥔 in India</span>
              </div>
              <div className="flex items-center gap-6">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social, index) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-orange-400 transition-colors transform hover:scale-110"
                    style={{
                      transform: `rotate(${Math.sin((mousePosition.x + index * 100) * 0.02) * 5}deg)`,
                    }}
                  >
                    <span className="text-xl">
                      {social === "Facebook" && "📘"}
                      {social === "Twitter" && "🐦"}
                      {social === "Instagram" && "📷"}
                      {social === "LinkedIn" && "💼"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
