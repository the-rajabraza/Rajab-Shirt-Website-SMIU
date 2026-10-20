"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [dropdownHeight, setDropdownHeight] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { state } = useCart()

  const shopCategories = [
    { name: "All Products", href: "/shop" },
    { name: "Featured Designs", href: "/shop?category=featured" },
    { name: "New Arrivals", href: "/shop?category=new-arrivals" },
    { name: "Best Sellers", href: "/shop?category=best-sellers" },
  ]

  // Calculate dropdown height when it opens
  useEffect(() => {
    if (isShopDropdownOpen && dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight)
    } else {
      setDropdownHeight(0)
    }
  }, [isShopDropdownOpen])

  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Tee Labs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>

            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={toggleShopDropdown}
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
              >
                <span>Shop</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isShopDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Dropdown with sliding animation */}
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out z-50"
                style={{
                  height: isShopDropdownOpen ? `${dropdownHeight}px` : "0px",
                  opacity: isShopDropdownOpen ? 1 : 0,
                }}
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <div ref={dropdownRef} className="py-2">
                  {shopCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      onClick={() => setIsShopDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/design-your-own-shirt" className="text-gray-700 hover:text-primary transition-colors">
              Custom Design
            </Link>
            <Link href="/track-order" className="text-gray-700 hover:text-primary transition-colors">
              Track Order
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Desktop Cart and User Icons */}
            <Link href="/cart" className="hidden md:block text-gray-700 hover:text-primary transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {state.totalItems > 99 ? "99+" : state.totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Shop Categories */}
              <div className="space-y-2">
                <button
                  onClick={toggleShopDropdown}
                  className="flex items-center justify-between w-full text-gray-900 font-medium"
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isShopDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Mobile dropdown with sliding animation */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    height: isShopDropdownOpen ? `${shopCategories.length * 40}px` : "0px",
                  }}
                >
                  <div className="pl-4 space-y-2 pt-2">
                    {shopCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block text-gray-600 hover:text-primary transition-colors py-1"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsShopDropdownOpen(false)
                        }}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/design-your-own-shirt"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Design
              </Link>
              <Link
                href="/track-order"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Order
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
