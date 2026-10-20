"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CheckCircle, XCircle, ShoppingCart, Truck, CreditCard, Smartphone } from "lucide-react"
import Breadcrumb from "@/components/breadcrumb"
import PhoneInput from "@/components/phone-input"
import { Checkbox } from "@/components/ui/checkbox"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const shipping = 0
  const total = state.totalPrice + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }))
  }

  const validateForm = (): boolean => {
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode"]

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData].trim()) {
        toast.error("Please fill in all required fields", {
          description: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
          icon: <XCircle className="h-5 w-5" />,
        })
        return false
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address", {
        description: "Please enter a valid email address",
        icon: <XCircle className="h-5 w-5" />,
      })
      return false
    }

    // Pakistani phone validation (should be +92 followed by 10 digits)
    const phoneRegex = /^\+92[0-9]{10}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number", {
        description: "Please enter a complete Pakistani phone number",
        icon: <XCircle className="h-5 w-5" />,
      })
      return false
    }

    return true
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToTerms) {
      toast.error("You must agree to the Terms & Conditions before placing your order.")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate order number
      const orderNumber = `TL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

      // Store order data in localStorage for order confirmation page
      const orderData = {
        orderNumber,
        orderDate: new Date().toLocaleDateString(),
        items: state.items,
        customerInfo: formData,
        paymentMethod,
        subtotal: state.totalPrice,
        shipping,
        total,
        status: "confirmed",
      }

      localStorage.setItem("lastOrder", JSON.stringify(orderData))

      // Send order confirmation email
      try {
        const emailResponse = await fetch('/api/send-order-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send email confirmation');
        } else {
          console.log('Order confirmation email sent successfully');
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }

      // Clear cart
      clearCart()

      // Show success message
      toast.success("Order placed successfully!", {
        description: `Order #${orderNumber} has been confirmed. Check your email for confirmation.`,
        icon: <CheckCircle className="h-5 w-5" />,
      })

      // Redirect to order confirmation
      router.push("/order-confirmation")
    } catch (error) {
      toast.error("Order failed", {
        description: "Something went wrong. Please try again.",
        icon: <XCircle className="h-5 w-5" />,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Show empty cart message if no items
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">You need to add some items to your cart before you can checkout.</p>
            <Link
              href="/shop"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Shopping Cart", href: "/cart" }, { label: "Checkout" }]} />

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <PhoneInput
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      name="phone"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                <div className="space-y-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "cod" ? "border-primary bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Truck className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <label htmlFor="cod" className="font-medium text-lg cursor-pointer">
                          Cash on Delivery (COD)
                        </label>
                        <p className="text-gray-600 text-sm">Pay cash when delivered to your door</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "bank" ? "border-primary bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="bank"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <label htmlFor="bank" className="font-medium text-lg cursor-pointer">
                          Direct Bank Transfer
                        </label>
                        <p className="text-gray-600 text-sm">Transfer directly to our bank account</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "mobile" ? "border-primary bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="mobile"
                        name="payment"
                        value="mobile"
                        checked={paymentMethod === "mobile"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Smartphone className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <label htmlFor="mobile" className="font-medium text-lg cursor-pointer">
                          Easypaisa / JazzCash
                        </label>
                        <p className="text-gray-600 text-sm">Pay instantly with mobile wallet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-gray-600 text-xs">Size: {item.size}</p>
                      <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal ({state.totalItems} items)</span>
                  <span>Rs. {state.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="italic text-sm text-muted-foreground bg-yellow-50 px-2 py-1 rounded">Charges calculated upon WhatsApp</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold mt-6">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={val => setAgreedToTerms(val === true)} />
                <label htmlFor="terms" className="text-sm text-gray-700 select-none">
                  I viewed <Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">Terms and Conditions</Link>
                </label>
              </div>

              <button
                type="submit"
                className={`w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg mt-6 transition-colors ${!agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!agreedToTerms || isProcessing}
              >
                {isProcessing ? 'Placing Order...' : 'Place Order'}
              </button>

              <Link
                href="/cart"
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors mt-3 block text-center"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </form>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
