"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import Image from "next/image"
import { useState } from "react"
import { Minus, Plus, ShoppingCart, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProductPage() {
  const params = useParams()
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  const sizes = ["S", "M", "L", "XL", "XXL"]

  // Get product slug from URL
  const categorySlug = params.category as string
  const productSlug = params.product as string

  // Mock product data based on slug - in real app this would come from API
  const getProductData = (slug: string) => {
    const products = {
      "abstract-art-collection": {
        id: "product-1",
        name: "Abstract Art Collection",
        price: 1999,
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop&crop=center",
        ],
        category: "Featured Designs",
        description:
          "Express your artistic side with our Abstract Art Collection t-shirt. Made from premium quality cotton, this design features unique abstract patterns that make a bold statement.",
      },
      "nature-inspired-tees": {
        id: "product-2",
        name: "Nature Inspired Tees",
        price: 1899,
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop&crop=center",
        ],
        category: "Featured Designs",
        description:
          "Connect with nature through our Nature Inspired Tees. Featuring eco-friendly designs and sustainable materials for the environmentally conscious.",
      },
      "geometric-design-series": {
        id: "product-3",
        name: "Geometric Design Series",
        price: 2199,
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop&crop=center",
        ],
        category: "Best Sellers",
        description:
          "Modern geometric patterns that blend contemporary design with classic comfort. Perfect for those who appreciate clean lines and bold shapes.",
      },
      "urban-style-tee": {
        id: "product-4",
        name: "Urban Style Tee",
        price: 2099,
        images: [
          "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=600&h=800&fit=crop&crop=center",
        ],
        category: "New Arrivals",
        description:
          "Street-smart style meets premium comfort. Our Urban Style Tee brings the energy of the city to your wardrobe.",
      },
      "vintage-graphic-tee": {
        id: "product-5",
        name: "Vintage Graphic Tee",
        price: 1999,
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=600&h=800&fit=crop&crop=center",
        ],
        category: "Best Sellers",
        description: "Classic vintage graphics with a modern twist. Timeless designs that never go out of style.",
      },
      "minimalist-design-tee": {
        id: "product-6",
        name: "Minimalist Design Tee",
        price: 1699,
        images: [
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=600&h=800&fit=crop&crop=center",
        ],
        category: "New Arrivals",
        description: "Less is more with our Minimalist Design Tee. Clean, simple, and effortlessly stylish.",
      },
      "classic-cotton-tee": {
        id: "product-7",
        name: "Classic Cotton Tee",
        price: 1799,
        images: [
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=600&h=800&fit=crop&crop=center",
        ],
        category: "Best Sellers",
        description:
          "The foundation of every great wardrobe. Our Classic Cotton Tee offers unmatched comfort and versatility.",
      },
      "premium-blend-tee": {
        id: "product-8",
        name: "Premium Blend Tee",
        price: 2299,
        images: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=600&h=800&fit=crop&crop=center",
        ],
        category: "Featured Designs",
        description:
          "Premium quality meets exceptional design. Our Premium Blend Tee is crafted for those who demand the best.",
      },
    }

    return products[slug as keyof typeof products] || products["abstract-art-collection"]
  }

  const product = {
    ...getProductData(productSlug),
    inStock: true,
    stockCount: 10,
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if product is in stock
      if (!product.inStock || product.stockCount < quantity) {
        toast.error("Unable to add to cart", {
          description: "This item is currently out of stock or insufficient quantity available.",
          icon: <XCircle className="h-5 w-5" />,
        })
        setIsAddingToCart(false)
        return
      }

      // Add item to cart with unique productId
      addItem({
        id: `${product.id}-${selectedSize}`, // This will be overridden in the reducer
        productId: product.id, // Unique product identifier
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.images[selectedImage],
        quantity: quantity,
      })

      // Show success toast
      toast.success("Added to cart successfully!", {
        description: `${product.name} • Size: ${selectedSize} • Quantity: ${quantity}`,
        icon: <CheckCircle className="h-5 w-5" />,
        action: {
          label: "View Cart",
          onClick: () => (window.location.href = "/cart"),
        },
      })
    } catch (error) {
      // Show error toast
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/shop" className="hover:text-primary transition-colors flex items-center space-x-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Shop</span>
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${categorySlug}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt="Product Image"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Product Image ${index + 1}`}
                    width={150}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-primary font-medium bg-blue-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold mb-2 mt-4">{product.name}</h1>
              <p className="text-2xl font-bold text-primary">Rs. {product.price.toLocaleString()}</p>

              {/* Stock Status */}
              <div className="mt-2">
                {product.inStock ? (
                  <span className="text-green-600 text-sm font-medium">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="text-red-600 text-sm font-medium">✗ Out of Stock</span>
                )}
              </div>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 rounded-lg font-semibold transition-all duration-200 transform
                      ${selectedSize === size
                        ? "border-primary bg-primary text-white scale-110 shadow-lg ring-2 ring-primary ring-offset-2"
                        : "border-gray-300 hover:border-primary bg-white text-primary"}
                    `}
                    style={{ zIndex: selectedSize === size ? 1 : 0 }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2 ${
                !product.inStock || isAddingToCart
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-700"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{isAddingToCart ? "Adding..." : !product.inStock ? "Out of Stock" : "Add to Cart"}</span>
            </button>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 100% Premium Cotton</li>
                <li>• Pre-shrunk fabric</li>
                <li>• Machine washable</li>
                <li>• Comfortable fit</li>
                <li>• Durable print quality</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
