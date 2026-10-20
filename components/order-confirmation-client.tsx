"use client"

import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Package, Truck, ShoppingCart, PhoneCall } from "lucide-react"
import { useEffect, useState } from "react"

interface OrderData {
  orderNumber: string
  orderDate: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    size: string
    image: string
  }>
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  paymentMethod: string
  subtotal: number
  shipping: number
  total: number
  status: string
}

export default function OrderConfirmationClient() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    // Get order data from localStorage
    const savedOrder = localStorage.getItem("lastOrder")
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder)
        setOrderData(parsedOrder)
      } catch (error) {
        console.error("Error parsing order data:", error)
      }
    }
  }, [])

  // Show empty state if no order data
  if (!orderData) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Order Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find any recent order information.</p>
          <Link
            href="/shop"
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Notify Banner */}
      <div className="mb-8">
        <div className="flex items-center bg-primary/10 border border-primary text-primary rounded-lg px-6 py-4 shadow-sm">
          <svg className="w-6 h-6 mr-3 flex-shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          <div>
            <span className="font-semibold">Action Required:</span> To confirm your order, please click the <span className="font-semibold">"Confirm Order on WhatsApp"</span> button below <span className="font-semibold uppercase">OR</span> send a screenshot of your <span className='font-semibold'>Order Confirmation email</span> to us on WhatsApp.
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => {
              const itemsText = orderData.items.map(item =>
                `• ${item.name}\n  Size: ${item.size}\n  Quantity: ${item.quantity}\n  Price: Rs. ${(item.price * item.quantity).toLocaleString()}`
              ).join("\n\n");
              const summaryText =
                `\n-----------------------------\n` +
                `Subtotal: Rs. ${orderData.subtotal.toLocaleString()}\n` +
                `Shipping: Charges calculated upon WhatsApp\n` +
                `Total: Rs. ${orderData.total.toLocaleString()}\n`;
              const message =
                `*Order Confirmation*\n` +
                `Order Number: ${orderData.orderNumber}\n` +
                `Order Date: ${orderData.orderDate}\n` +
                `Payment Method: ${orderData.paymentMethod === "cod" ? "Cash on Delivery" : orderData.paymentMethod === "bank" ? "Bank Transfer" : "Easypaisa/JazzCash"}\n` +
                `Status: ${orderData.status}\n\n` +
                `*Customer Info*\n` +
                `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}\n` +
                `Phone: ${orderData.customerInfo.phone}\n` +
                `Email: ${orderData.customerInfo.email}\n` +
                `Address: ${orderData.customerInfo.address}, ${orderData.customerInfo.city}, ${orderData.customerInfo.postalCode}, Pakistan\n\n` +
                `*Order Items*\n${itemsText}${summaryText}`;
              const encoded = encodeURIComponent(message);
              window.open(`https://wa.me/923128543371?text=${encoded}`, '_blank');
            }}
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-5 h-5 mr-2" />
            <span>Confirm Order on WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Order Number:</span> {orderData.orderNumber}
              </p>
              <p>
                <span className="font-medium">Order Date:</span> {orderData.orderDate}
              </p>
              <p>
                <span className="font-medium">Total Amount:</span>{" "}
                <span className="text-primary font-bold">Rs. {orderData.total.toLocaleString()}</span>
              </p>
              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                {orderData.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : orderData.paymentMethod === "bank"
                    ? "Bank Transfer"
                    : "Easypaisa/JazzCash"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="text-gray-600">
              <p>
                {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
              </p>
              <p>{orderData.customerInfo.address}</p>
              <p>
                {orderData.customerInfo.city}, {orderData.customerInfo.postalCode}
              </p>
              <p>Pakistan</p>
              <p>{orderData.customerInfo.phone}</p>
              <p>{orderData.customerInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-xl font-bold mb-6">Order Items</h2>
        <div className="space-y-4">
          {orderData.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center space-x-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-lg flex-shrink-0"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600 text-sm">Size: {item.size}</p>
                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">Rs. {orderData.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="italic text-sm text-muted-foreground bg-yellow-50 px-2 py-1 rounded">Charges calculated upon WhatsApp</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span className="text-primary">Rs. {orderData.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <Package className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-bold text-primary">What's Next?</h3>
            <p className="text-gray-700">
              We'll send you a confirmation email with tracking details once your order is shipped. Expected delivery:
              3-5 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`/track-order?order=${orderData.orderNumber}`}
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center flex items-center justify-center space-x-2"
        >
          <Truck className="h-5 w-5" />
          <span>Track Your Order</span>
        </Link>
        <Link
          href="/shop"
          className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}
