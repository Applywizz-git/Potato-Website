"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { items, getTotalItems, getTotalPrice, removeFromCart } = useCart()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 text-center text-sm font-medium">
        🚚 FREE Covert Shipping on operations above ₹500 | 🎯 Priority Deployment Available | 🇮🇳 Shadow Network Active
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-3xl">🥔</span>
              <span className="text-2xl font-bold text-gray-800">PotatoPost</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
              >
                Secret Potato
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
              >
                Happy Customers
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
              >
                FAQs
              </button>
            </nav>

            {/* Cart and CTA */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <Button
                onClick={() => scrollToSection("pricing")}
                className="hidden md:block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                Confirm Order
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-orange-500"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-left text-gray-600 hover:text-orange-500 font-medium transition-colors"
                >
                  Mission Protocol
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-left text-gray-600 hover:text-orange-500 font-medium transition-colors"
                >
                  Operation Costs
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-left text-gray-600 hover:text-orange-500 font-medium transition-colors"
                >
                  Field Reports
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-left text-gray-600 hover:text-orange-500 font-medium transition-colors"
                >
                  Intel Briefing
                </button>
                <Button
                  onClick={() => scrollToSection("pricing")}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold w-full"
                >
                  Deploy Mission
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Your Cart ({getTotalItems()})</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🥔</div>
                  <p className="text-gray-500 mb-4">No Covert Operations</p>
                  <Button
                    onClick={() => {
                      setShowCart(false)
                      scrollToSection("pricing")
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        ₹{item.price} + ₹{item.shipping} shipping
                      </p>
                      {item.message && (
                        <p className="text-sm text-gray-600 italic">"{item.message.substring(0, 50)}..."</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total: ₹{getTotalPrice()}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
