"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import ShopFilters from "@/components/shop-filters"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(10)

  useEffect(() => {
    const category = searchParams.get("category") || "all"
    setSelectedCategory(category)
  }, [searchParams])

  useEffect(() => {
    // Simulate loading delay for skeleton demo
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const products = [
    {
      id: 1,
      name: "Abstract Art Collection",
      price: 1999,
      priceLabel: "Rs. 1,999",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&crop=center",
      category: "featured",
      sizes: ["S", "M", "L", "XL", "XXL"],
      tags: ["abstract", "art", "colorful"],
    },
    {
      id: 2,
      name: "Nature Inspired Tees",
      price: 1899,
      priceLabel: "Rs. 1,899",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop&crop=center",
      category: "featured",
      sizes: ["S", "M", "L", "XL"],
      tags: ["nature", "green", "eco-friendly"],
    },
    {
      id: 3,
      name: "Geometric Design Series",
      price: 2199,
      priceLabel: "Rs. 2,199",
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=300&h=400&fit=crop&crop=center",
      category: "best-sellers",
      sizes: ["M", "L", "XL", "XXL"],
      tags: ["geometric", "modern", "patterns"],
    },
    {
      id: 4,
      name: "Urban Style Tee",
      price: 2099,
      priceLabel: "Rs. 2,099",
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop&crop=center",
      category: "new-arrivals",
      sizes: ["S", "M", "L", "XL", "XXL"],
      tags: ["urban", "street", "trendy"],
    },
    {
      id: 5,
      name: "Vintage Graphic Tee",
      price: 1999,
      priceLabel: "Rs. 1,999",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=400&fit=crop&crop=center",
      category: "best-sellers",
      sizes: ["S", "M", "L", "XL"],
      tags: ["vintage", "retro", "classic"],
    },
    {
      id: 6,
      name: "Minimalist Design Tee",
      price: 1699,
      priceLabel: "Rs. 1,699",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop&crop=center",
      category: "new-arrivals",
      sizes: ["S", "M", "L", "XL", "XXL"],
      tags: ["minimalist", "simple", "clean"],
    },
    {
      id: 7,
      name: "Classic Cotton Tee",
      price: 1799,
      priceLabel: "Rs. 1,799",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop&crop=center",
      category: "best-sellers",
      sizes: ["S", "M", "L", "XL", "XXL"],
      tags: ["classic", "cotton", "comfortable"],
    },
    {
      id: 8,
      name: "Premium Blend Tee",
      price: 2299,
      priceLabel: "Rs. 2,299",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop&crop=center",
      category: "featured",
      sizes: ["M", "L", "XL", "XXL"],
      tags: ["premium", "blend", "quality"],
    },
  ]

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false
    }

    // Size filter
    if (selectedSize !== "all" && !product.sizes.includes(selectedSize)) {
      return false
    }

    // Price filter
    if (selectedPriceRange !== "all") {
      switch (selectedPriceRange) {
        case "under-2000":
          if (product.price >= 2000) return false
          break
        case "2000-2500":
          if (product.price < 2000 || product.price > 2500) return false
          break
        case "above-2500":
          if (product.price <= 2500) return false
          break
      }
    }

    return true
  })

  const getCategoryName = (categoryId: string) => {
    const categoryNames: { [key: string]: string } = {
      all: "All Products",
      featured: "Featured Designs",
      "new-arrivals": "New Arrivals",
      "best-sellers": "Best Sellers",
    }
    return categoryNames[categoryId] || "All Products"
  }

  const getCategoryDisplayName = (categoryId: string) => {
    const categoryNames: { [key: string]: string } = {
      featured: "Featured Designs",
      "new-arrivals": "New Arrivals",
      "best-sellers": "Best Sellers",
    }
    return categoryNames[categoryId] || "Featured Designs"
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Shop</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Shop</h1>
          <p className="text-gray-600">
            {selectedCategory === "all"
              ? "Discover our complete collection of premium quality t-shirts"
              : `Browse our ${getCategoryName(selectedCategory).toLowerCase()} collection`}
          </p>
        </div>

        {/* Filters and Product Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">
          <div className="flex flex-wrap gap-4">
            <ShopFilters
              selectedCategory={selectedCategory}
              selectedSize={selectedSize}
              selectedPriceRange={selectedPriceRange}
              onCategoryChange={setSelectedCategory}
              onSizeChange={setSelectedSize}
              onPriceRangeChange={setSelectedPriceRange}
            />
          </div>
          {/* Results Count */}
          {filteredProducts.length > 0 && (
            <div className="text-gray-600 text-sm mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="p-6">
                    <Skeleton className="w-24 h-5 mb-2 rounded-full" />
                    <Skeleton className="w-32 h-6 mb-4 rounded" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="w-16 h-6 rounded" />
                      <Skeleton className="w-20 h-8 rounded" />
                    </div>
                  </div>
                </div>
              ))
            : filteredProducts.slice(0, visibleCount).map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs font-semibold bg-blue-50 text-primary px-3 py-1 rounded-full mb-2">
                      {getCategoryDisplayName(product.category)}
                    </span>
                    <h3 className="font-semibold text-lg mb-4">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold text-lg">{product.priceLabel}</span>
                      <Link
                        href={`/shop/${product.category}/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* Load More Button */}
        {!isLoading && filteredProducts.length > 10 && visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition-colors"
              onClick={() => setVisibleCount(filteredProducts.length)}
            >
              Load More Products
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No products found matching your filters</p>
            <button
              onClick={() => {
                setSelectedCategory("all")
                setSelectedSize("all")
                setSelectedPriceRange("all")
              }}
              className="text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
