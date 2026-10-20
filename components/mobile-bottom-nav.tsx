"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, ShoppingCart, Truck, Palette } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { state } = useCart()

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/shop",
      icon: ShoppingBag,
      label: "Shop",
      active: pathname === "/shop" || pathname.startsWith("/shop/"),
    },
    {
      href: "/design-your-own-shirt",
      icon: Palette,
      label: "Design",
      active: pathname === "/design-your-own-shirt",
    },
    {
      href: "/cart",
      icon: ShoppingCart,
      label: "Cart",
      active: pathname === "/cart",
      badge: state.totalItems > 0 ? state.totalItems : null,
    },
    {
      href: "/track-order",
      icon: Truck,
      label: "Track",
      active: pathname === "/track-order",
    },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors relative ${
                item.active ? "text-primary bg-blue-50" : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-1/2 transform translate-x-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
