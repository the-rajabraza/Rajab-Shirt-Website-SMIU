"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import Image from "next/image"
import { useState, useRef } from "react"
import { Upload, Share, CheckCircle, XCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import Moveable from "react-moveable"

export default function DesignYourOwnPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState("white")
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCart()
  const fileInputRef = useRef<HTMLInputElement>(null)
  // State for moveable design
  const [designPosition, setDesignPosition] = useState({ x: 75, y: 75 })
  const [designSize, setDesignSize] = useState({ width: 100, height: 100 })
  const designRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(true)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please select a file smaller than 10MB",
          icon: <XCircle className="h-5 w-5" />,
        })
        return
      }

      // Check file type
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"]
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: "Please select a PNG, JPG, or SVG file",
          icon: <XCircle className="h-5 w-5" />,
        })
        return
      }

      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      toast.success("Design uploaded successfully!", {
        description: `${file.name} is ready for customization`,
        icon: <CheckCircle className="h-5 w-5" />,
      })
    }
  }

  const handleAddToCart = async () => {
    if (!selectedFile) {
      toast.error("No design selected", {
        description: "Please upload a design before adding to cart",
        icon: <XCircle className="h-5 w-5" />,
      })
      return
    }

    setIsAddingToCart(true)

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addItem({
        id: `custom-design-${Date.now()}-${selectedSize}`, // This will be overridden in the reducer
        productId: `custom-design-${Date.now()}`, // Unique product identifier for custom designs
        name: "Custom Design T-Shirt",
        price: 2499,
        size: selectedSize,
        image: previewUrl || "/placeholder.svg?height=300&width=300",
        quantity: quantity,
      })

      toast.success("Custom design added to cart!", {
        description: `Custom T-Shirt • Size: ${selectedSize} • Color: ${selectedColor} • Qty: ${quantity}`,
        icon: <CheckCircle className="h-5 w-5" />,
        action: {
          label: "View Cart",
          onClick: () => (window.location.href = "/cart"),
        },
      })
    } catch (error) {
      toast.error("Failed to add to cart", {
        description: "Something went wrong. Please try again.",
        icon: <XCircle className="h-5 w-5" />,
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Design Your Own T-Shirt</h1>
          <p className="text-gray-600">Upload your design and create a unique custom t-shirt</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                ref={fileInputRef}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Upload Your Design</p>
                <p className="text-gray-600 mb-4">Drag and drop your file here or click to browse</p>
                <p className="text-sm text-gray-500">Supported formats: PNG, JPG, SVG (Max 10MB)</p>
              </label>
              <button
                type="button"
                className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </button>
            </div>

            {selectedFile && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-green-800 font-semibold">File uploaded successfully!</p>
                    <p className="text-green-600 text-sm">{selectedFile.name}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Design Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Customization Options</h3>

              <div>
                <label className="block text-sm font-medium mb-2">T-Shirt Color</label>
                <div className="flex space-x-3">
                  {[
                    { name: "white", color: "bg-white border-gray-300" },
                    { name: "black", color: "bg-black" },
                    { name: "gray", color: "bg-gray-500" },
                    { name: "navy", color: "bg-blue-900" },
                    { name: "red", color: "bg-red-500" },
                  ].map((colorOption) => (
                    <button
                      key={colorOption.name}
                      onClick={() => setSelectedColor(colorOption.name)}
                      className={`w-8 h-8 rounded-full border-2 ${colorOption.color} ${
                        selectedColor === colorOption.name ? "ring-2 ring-primary ring-offset-2" : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-center">Preview</h3>

            <div className="relative bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-96">
              <Image
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=533&fit=crop&crop=center"
                alt="T-Shirt Preview"
                width={300}
                height={400}
                className="max-w-full h-auto"
              />

              {previewUrl && (
                <>
                  <div
                    ref={designRef}
                    style={{
                      position: "absolute",
                      left: designPosition.x,
                      top: designPosition.y,
                      width: designSize.width,
                      height: designSize.height,
                      zIndex: 10,
                      cursor: isEditing ? "move" : "pointer",
                    }}
                    onClick={() => {
                      if (!isEditing) setIsEditing(true)
                    }}
                  >
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Your Design"
                      width={designSize.width}
                      height={designSize.height}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>
                  <Moveable
                    target={isEditing ? designRef : null}
                    draggable={isEditing}
                    resizable={isEditing}
                    throttleDrag={0}
                    throttleResize={0}
                    onDrag={({ left, top }) => {
                      setDesignPosition({ x: left, y: top })
                    }}
                    onResize={({ width, height, drag }) => {
                      setDesignSize({ width, height })
                      setDesignPosition({ x: drag.left, y: drag.top })
                    }}
                    keepRatio={true}
                    edge={false}
                    origin={false}
                    bounds={{
                      left: 0,
                      top: 0,
                      right: 300,
                      bottom: 400,
                    }}
                  />
                  <button
                    type="button"
                    className={`absolute top-2 right-2 z-20 px-4 py-2 rounded-lg font-semibold transition-colors shadow-md
                      ${isEditing ? "bg-primary text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    disabled={!isEditing}
                    onClick={() => setIsEditing(false)}
                  >
                    Done Editing
                  </button>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">Rs. 2,499</p>
                <p className="text-gray-600">Custom Design T-Shirt</p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isAddingToCart
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-blue-700"
                }`}
              >
                {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
              </button>

              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                <Share className="h-5 w-5" />
                <span>Share on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
