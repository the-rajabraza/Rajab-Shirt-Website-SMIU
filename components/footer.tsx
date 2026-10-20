import { MessageCircle, Truck, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-16 text-foreground">
      {/* Feature Cards Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex items-center justify-center space-x-3 p-6 bg-muted rounded-xl shadow-sm">
            <RotateCcw className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">3 Days Return Policy</h3>
              <p className="text-sm text-muted-foreground">Easy returns within 3 days</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 p-6 bg-muted rounded-xl shadow-sm">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Shipping All Over Pakistan</h3>
              <p className="text-sm text-muted-foreground">Fast & reliable delivery</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 p-6 bg-muted rounded-xl shadow-sm">
            <MessageCircle className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">24/7 Support on WhatsApp</h3>
              <p className="text-sm text-muted-foreground">Always here to help</p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & About */}
        <div>
          <Link href="/" className="flex items-center mb-4">
            <Image src="/placeholder-logo.svg" alt="Tee Labs Logo" width={120} height={32} className="mr-2" />
          </Link>
          <p className="text-sm text-muted-foreground mb-4">
            Tee Labs is your destination for unique, high-quality clothing. Express yourself with our curated collections and custom designs.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-inherit"><rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-inherit"><rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/><path d="M16 8h-2a2 2 0 0 0-2 2v2h4" strokeWidth="2"/><path d="M12 16v-4" strokeWidth="2"/></svg>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
            <li><Link href="/design-your-own-shirt" className="hover:text-primary transition-colors">Custom Design</Link></li>
            <li><Link href="/shop?category=featured" className="hover:text-primary transition-colors">Featured Designs</Link></li>
            <li><Link href="/shop?category=new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            <li><Link href="/shop?category=best-sellers" className="hover:text-primary transition-colors">Best Sellers</Link></li>
          </ul>
        </div>
        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/terms#shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link href="/terms#return-policy" className="hover:text-primary transition-colors">Return Policy</Link></li>
            <li><Link href="/terms#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link href="/terms#size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@teelabs.com" className="hover:text-primary transition-colors">support@teelabs.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/+923128543371" target="_blank" rel="noopener" className="hover:text-primary transition-colors">+92 312 8543371</a></li>
          </ul>
        </div>
        {/* Empty for grid balance */}
        <div></div>
      </div>
      <div className="text-center pt-8 border-t border-border bg-card pb-6">
        <p className="text-sm text-muted-foreground">© 2025 Tee Labs. Crafted with passion for style.</p>
      </div>
    </footer>
  )
}
