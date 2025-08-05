"use client"

import { useState } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function HeroSection() {
  const { isVisible, ref } = useIntersectionObserver()
  const [showModal, setShowModal] = useState(false)

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full opacity-20 animate-bounce-custom"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div
        className={`text-center z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        {/* Shipping badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-lg">
          <span className="text-2xl">🚚</span>
          <span className="text-sm font-medium text-gray-700">We deliver secret potatoes in 2–4 days</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">Send a fun and private message today
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          We send messages in a funny and secret way
          Everything is anonymous, safe, and unforgettable
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Mission - ₹199 🥔
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("testimonials")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 bg-white/80 backdrop-blur-sm"
          >
            Watch Reactions 📱
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            <span>4,000+ Secret Messages Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">🔒</span>
            <span> 100% Anonymous and Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">🇮🇳</span>
            <span> Secret Network Across India</span>
          </div>
        </div>
      </div>

      {/* Complete Anonymous Order Modal */}
      {showModal && <CompleteAnonymousOrderModal onClose={() => setShowModal(false)} />}
    </section>
  )
}

function CompleteAnonymousOrderModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    message: "",
    anonymous: true,
    email: "",
    selectedProduct: "Gift Combo - ₹239",
    deliveryAddress: {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  })

  const [cartItems, setCartItems] = useState([
    { name: "Gift Combo", price: 239, quantity: 3 },
    { name: "Roast Potato", price: 199, quantity: 1 },
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = Math.floor(subtotal * 0.12)
  const total = subtotal + shipping

  const handleAddToCart = () => {
    if (!formData.message.trim()) {
      alert("Intelligence payload cannot be empty, operative.")
      return
    }
    alert("Added to your covert operations! 🛒")
  }

  const handleCompleteOrder = () => {
    if (!formData.email.trim()) {
      alert("Secure communication channel required for mission updates!")
      return
    }
    if (!formData.deliveryAddress.name.trim() || !formData.deliveryAddress.address.trim()) {
      alert("Target coordinates incomplete! Mission cannot proceed!")
      return
    }
    alert(`Operation authorized! 🥔 Budget: ₹${total}. Encrypted confirmation transmitted to ${formData.email}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto shadow-2xl mx-2">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">📦</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Complete Your Anonymous Order</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Your Potato Message */}
          <div className="border border-orange-200 rounded-xl p-4 sm:p-6 bg-orange-50/30">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Potato Message</h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (up to 40 words)</label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter classified intelligence..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 sm:h-24 focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-16"
                    maxLength={200}
                  />
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <button className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-green-600 transition-colors">
                      😊
                    </button>
                    <button className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-orange-600 transition-colors">
                      ✓
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{formData.message.length}/200 characters</div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Send anonymously (recommended for maximum mystery)
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={formData.selectedProduct}
                  onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option>Gift Combo - ₹239</option>
                  <option>Roast Potato - ₹199</option>
                  <option>Express Roast - ₹298</option>
                </select>
                <button
                  onClick={handleAddToCart}
                  className="px-4 sm:px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm whitespace-nowrap"
                >
                  Add to Arsenal
                </button>
              </div>
            </div>
          </div>

          {/* Order Confirmation Email */}
          <div className="border border-blue-200 rounded-xl p-4 sm:p-6 bg-blue-50/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg sm:text-xl">📧</span>
              <h4 className="text-lg font-semibold text-gray-800">Order Confirmation Email</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Mission updates will be sent to this secure channel (encrypted)
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border border-green-200 rounded-xl p-4 sm:p-6 bg-green-50/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg sm:text-xl">📍</span>
              <h4 className="text-lg font-semibold text-gray-800">Delivery Address</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">Specify target location for intelligence drop</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    placeholder="Target designation..."
                    value={formData.deliveryAddress.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: { ...formData.deliveryAddress, name: e.target.value },
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Phone *</label>
                  <input
                    type="text"
                    placeholder="Secure communication line"
                    value={formData.deliveryAddress.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: { ...formData.deliveryAddress, phone: e.target.value },
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address *</label>
                <textarea
                  placeholder="Target coordinates and access points..."
                  value={formData.deliveryAddress.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryAddress: { ...formData.deliveryAddress, address: e.target.value },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.deliveryAddress.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: { ...formData.deliveryAddress, city: e.target.value },
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.deliveryAddress.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: { ...formData.deliveryAddress, state: e.target.value },
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={formData.deliveryAddress.pincode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: { ...formData.deliveryAddress, pincode: e.target.value },
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-orange-200 rounded-xl p-4 sm:p-6 bg-orange-50/30">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h4>

            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-sm">₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Subtotal:</span>
                  <span className="font-medium text-sm">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Shipping:</span>
                  <span className="font-medium text-sm">₹{shipping}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Anonymous Guarantee */}
          <div className="border border-orange-200 rounded-xl p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-red-50">
            <div className="flex items-start gap-3">
              <span className="text-orange-500 text-lg mt-1">🔒</span>
              <div>
                <h4 className="text-lg font-semibold text-orange-700 mb-2">100% Anonymous Guarantee</h4>
                <p className="text-sm text-gray-600">
                  Your identity is completely protected. We only use your email for order updates and never share it
                  with the recipient.
                </p>
              </div>
            </div>
          </div>

          {/* Complete Order Button */}
          <button
            onClick={handleCompleteOrder}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            Execute Covert Operation - ₹{total}
          </button>
        </div>
      </div>
    </div>
  )
}
