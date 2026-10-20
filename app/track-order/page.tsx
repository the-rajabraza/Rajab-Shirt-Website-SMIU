"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Breadcrumb from "@/components/breadcrumb"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [orderStatus, setOrderStatus] = useState<any>(null)

  const handleTrackOrder = () => {
    // Simulate order tracking with detailed product information
    setOrderStatus({
      orderNumber: orderNumber,
      status: "shipped",
      estimatedDelivery: "Dec 8, 2024",
      orderDate: "Dec 4, 2024",
      totalAmount: 6297,
      paymentMethod: "Cash on Delivery",
      shippingAddress: {
        name: "John Doe",
        phone: "+92 300 1234567",
        address: "123 Main Street, Karachi, 75500, Pakistan",
      },
      items: [
        {
          id: 1,
          name: "Abstract Art Collection",
          size: "M",
          quantity: 2,
          price: 1999,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop&crop=center",
          category: "Featured Designs",
        },
        {
          id: 2,
          name: "Urban Style Tee",
          size: "L",
          quantity: 1,
          price: 2099,
          image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=100&h=100&fit=crop&crop=center",
          category: "New Arrivals",
        },
      ],
      trackingSteps: [
        { step: "Order Placed", completed: true, date: "Dec 4, 2024", time: "10:30 AM" },
        { step: "Order Confirmed", completed: true, date: "Dec 4, 2024", time: "11:15 AM" },
        { step: "In Production", completed: true, date: "Dec 5, 2024", time: "2:00 PM" },
        { step: "Shipped", completed: true, date: "Dec 6, 2024", time: "9:45 AM" },
        { step: "Out for Delivery", completed: false, date: "", time: "" },
        { step: "Delivered", completed: false, date: "", time: "" },
      ],
    })
  }

  const getStatusIcon = (step: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    } else {
      switch (step) {
        case "Order Placed":
        case "Order Confirmed":
        case "In Production":
          return <Package className="h-5 w-5 text-gray-400" />
        case "Shipped":
        case "Out for Delivery":
          return <Truck className="h-5 w-5 text-gray-400" />
        case "Delivered":
          return <MapPin className="h-5 w-5 text-gray-400" />
        default:
          return <Clock className="h-5 w-5 text-gray-400" />
      }
    }
  }

  const subtotal = orderStatus?.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) || 0
  const shipping = 0

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Track Order" }]} />

        <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

        {/* Order Number Input */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium mb-2">Enter Order Number</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="TL-2024-001234"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleTrackOrder}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Track</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Status */}
        {orderStatus && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order #{orderStatus.orderNumber}</h2>
                  <p className="text-gray-600">
                    Status: <span className="font-semibold text-primary capitalize">{orderStatus.status}</span>
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <p className="text-gray-600">
                    Order Date: <span className="font-semibold">{orderStatus.orderDate}</span>
                  </p>
                  <p className="text-gray-600">
                    Estimated Delivery:{" "}
                    <span className="font-semibold text-green-600">{orderStatus.estimatedDelivery}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Order Items</h3>
              <div className="space-y-4">
                {orderStatus.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    {/* Product Image and Info */}
                    <div className="flex items-start space-x-4 flex-1">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-primary font-medium bg-blue-50 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                        <h4 className="font-semibold text-base sm:text-lg mt-1">{item.name}</h4>
                        <p className="text-gray-600 text-sm">Size: {item.size}</p>
                        <p className="text-primary font-bold text-lg">Rs. {item.price.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Quantity and Total */}
                    <div className="flex justify-between sm:flex-col sm:items-end sm:text-right space-y-1">
                      <div>
                        <p className="text-gray-600 text-sm">Quantity</p>
                        <p className="font-semibold">{item.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Item Total</p>
                        <p className="font-bold text-lg">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">Rs. {shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary">Rs. {orderStatus.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
              <div className="text-gray-700">
                <p className="font-semibold">{orderStatus.shippingAddress.name}</p>
                <p>{orderStatus.shippingAddress.address}</p>
                <p className="mt-2">
                  <span className="font-medium">Phone:</span> {orderStatus.shippingAddress.phone}
                </p>
                <p>
                  <span className="font-medium">Payment:</span> {orderStatus.paymentMethod}
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Order Progress</h3>
              <div className="space-y-6">
                {orderStatus.trackingSteps.map((step: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">{getStatusIcon(step.step, step.completed)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className={`font-semibold ${step.completed ? "text-green-600" : "text-gray-500"}`}>
                            {step.step}
                          </h4>
                          {step.date && (
                            <p className="text-sm text-gray-600">
                              {step.date} {step.time && `at ${step.time}`}
                            </p>
                          )}
                        </div>
                        {step.completed && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mt-2 sm:mt-0">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <Package className="h-8 w-8 text-primary flex-shrink-0 mb-4 sm:mb-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-primary mb-2">Need Help?</h3>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about your order, feel free to contact our support team.
                  </p>
                  <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                    Contact Support on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
