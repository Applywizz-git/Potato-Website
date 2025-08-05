"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const roastLevels = [
  {
    name: "Simple Mission",
    deliveryCharge: 29,// Added delivery charge
    price: 199,
    shipping: 29,
    features: [
      "Real potato with your message",
      "Standard delivery 2-4 days",
      "No name, fully anonymou",
      "Message up to 40 words",
    ],
    popular: false,
    color: "from-green-400 to-green-600",
  },
  {
    name: "Gift Surprise",
    price: 239,
    shipping: 29,
    features: [
      "All features of Simple Mission",
      "Gift-style wrapping for surprise",
      " Fake greeting card included",
      "Extra concealment packaging",
    ],
    popular: true,
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "Express Mission",
    price: 298,
    shipping: 29,
    features: [
      "All features of Gift Surprise",
      "Fast delivery in 1–2 days",
      "Top quality potato",
      "Secret tracking system",
    ],
    popular: false,
    color: "from-purple-400 to-purple-600",
  },
]

export function RoastLevelSection() {
  const { isVisible, ref } = useIntersectionObserver()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [showModal, setShowModal] = useState<number | null>(null)

  return (
    <section id="pricing" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Mission
            </span>
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roastLevels.map((level, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {level.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Effective
                  </span>
                </div>
              )}

              <div
                className={`
                bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-500 h-full
                ${level.popular ? "border-orange-500 shadow-orange-100" : "border-gray-200"}
                ${hoveredCard === index ? "transform scale-105 shadow-2xl" : ""}
              `}
              >
                <div
                  className={`
                  w-16 h-16 rounded-full bg-gradient-to-r ${level.color} 
                  flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto
                  transition-all duration-500
                  ${hoveredCard === index ? "animate-bounce" : ""}
                `}
                >
                  🥔
                </div>

                <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">{level.name}</h3>



                <ul className="space-y-3 mb-8">
                  {level.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`flex items-center gap-3 transition-all duration-300 ${hoveredCard === index ? "translate-x-2" : ""
                        }`}
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowModal(index)}
                    className={`
                      w-full py-3 rounded-lg font-semibold transition-all duration-300
                      ${level.popular
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                        : "bg-gray-800 hover:bg-gray-900 text-white"
                      }
                      ${hoveredCard === index ? "transform scale-105" : ""}
                    `}
                  >
                    Start Mission
                  </Button>
                  <Button
                    onClick={() => setShowModal(index)}
                    variant="outline"
                    className={`
                      w-full py-3 rounded-lg font-semibold transition-all duration-300
                      ${hoveredCard === index ? "border-orange-500 text-orange-500" : ""}
                    `}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Both buttons open the same Complete Anonymous Order Modal */}
        {showModal !== null && (
          <CompleteAnonymousOrderModal level={roastLevels[showModal]} onClose={() => setShowModal(null)} />
        )}
      </div>
    </section>
  )
}

function CompleteAnonymousOrderModal({ level, onClose }: { level: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    message: "",
    anonymous: true,
    email: "",
    selectedProduct: `${level.name} - ₹${level.price}`,
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
    { name: "Shadow Combo", price: 239, quantity: 3 },
    { name: "Stealth Potato", price: 199, quantity: 1 },
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = Math.floor(subtotal * 0.12)
  const total = subtotal + shipping

  const handleAddToCart = () => {
    if (!formData.message.trim()) {
      alert("Your secret message cannot be empty, agent.")
      return
    }
    alert("Added to your covert operations! 🛒")
  }

  const handleCompleteOrder = () => {
    if (!formData.email.trim()) {
      alert("We need a secure communication channel (email)!")
      return
    }
    if (!formData.deliveryAddress.name.trim() || !formData.deliveryAddress.address.trim()) {
      alert("Target location details are incomplete!")
      return
    }
    alert(`Mission accepted! 🥔 Total: ₹${total}. Encrypted confirmation sent to ${formData.email}`)
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
                    placeholder="Craft your mysterious message..."
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
                  <option>Simple Mission - ₹199</option>
                  <option>Gift Surprise - ₹239</option>
                  <option>Express Mission - ₹298</option>
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
            <p className="text-sm text-gray-600 mb-4">We'll send order updates to this email (kept private)</p>
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
            <p className="text-sm text-gray-600 mb-4">Where should we deliver this potato?</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    placeholder="Target's identity..."
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
                    placeholder="Secret contact number"
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
                  placeholder="Target location coordinates..."
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
