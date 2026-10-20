"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import Breadcrumb from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, CheckCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

export default function CartPage() {
  const { state, updateQuantity, removeItem } = useCart()

  const handleUpdateQuantity = (id: string, newQuantity: number, itemName: string) => {
    if (newQuantity === 0) {
      removeItem(id)
      toast.success("Item removed", {
        description: `${itemName} has been removed from your cart`,
        icon: <CheckCircle className="h-5 w-5" />,
      })
    } else {
      updateQuantity(id, newQuantity)
      toast.success("Quantity updated", {
        description: `${itemName} quantity updated to ${newQuantity}`,
        icon: <CheckCircle className="h-5 w-5" />,
      })
    }
  }

  const handleRemoveItem = (id: string, itemName: string) => {
    removeItem(id)
    toast.success("Item removed", {
      description: `${itemName} has been removed from your cart`,
      icon: <CheckCircle className="h-5 w-5" />,
    })
  }

  const shipping = 0
  const total = state.totalPrice + shipping

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Shopping Cart" }]} />

        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {state.items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
            <Link
              href="/shop"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Product Image and Info */}
                    <div className="flex items-start space-x-4 flex-1">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={133}
                        className="rounded-lg flex-shrink-0 sm:w-20 sm:h-27 w-16 h-21 object-cover"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{item.name}</h3>
                        <p className="text-gray-600 text-sm">Size: {item.size}</p>
                        <p className="text-primary font-bold text-lg">Rs. {item.price.toLocaleString()}</p>
                      </div>

                      {/* Remove button for mobile - positioned in top right */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 p-2 sm:hidden flex-shrink-0"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Quantity Controls and Remove Button Container */}
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove button for desktop */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 p-2 hidden sm:block"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total - Mobile Only */}
                  <div className="mt-4 pt-4 border-t border-gray-100 sm:hidden">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Item Total:</span>
                      <span className="font-bold text-lg">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({state.totalItems} items)</span>
                  <span>Rs. {state.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="italic text-sm text-muted-foreground bg-yellow-50 px-2 py-1 rounded">Charges calculated upon WhatsApp</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6 block text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors mt-3 block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
