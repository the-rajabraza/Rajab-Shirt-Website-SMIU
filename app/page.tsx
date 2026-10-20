import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredDesigns = [
    {
      id: 1,
      title: "Abstract Art Collection",
      description: "Latest abstract art designs",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&crop=center",
      price: "Rs. 1,999",
      category: "Featured Designs",
    },
    {
      id: 2,
      title: "Nature Inspired Tees",
      description: "T-shirts connecting with nature",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop&crop=center",
      price: "Rs. 1,899",
      category: "Featured Designs",
    },
    {
      id: 3,
      title: "Geometric Design Series",
      description: "Modern geometric patterns",
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=300&h=400&fit=crop&crop=center",
      price: "Rs. 2,199",
      category: "Featured Designs",
    },
    {
      id: 4,
      title: "Minimalist Collection",
      description: "Simple and elegant designs",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop&crop=center",
      price: "Rs. 1,799",
      category: "Best Sellers",
    },
  ]

  const newArrivals = [
    {
      id: 5,
      title: "Urban Style Tee",
      description: "Trendy urban style",
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop&crop=center",
      price: "Rs. 2,099",
      category: "New Arrivals",
    },
    {
      id: 6,
      title: "Vintage Graphic Tee",
      description: "Classic vintage design",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=400&fit=crop&crop=center",
      price: "Rs. 1,999",
      category: "Best Sellers",
    },
    {
      id: 7,
      title: "Minimalist Design Tee",
      description: "Simple and elegant",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop&crop=center",
      price: "Rs. 1,699",
      category: "New Arrivals",
    },
    {
      id: 8,
      title: "Street Art Tee",
      description: "Bold street art graphics",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop&crop=center",
      price: "Rs. 2,299",
      category: "New Arrivals",
    },
  ]

  // Helper to map display category to slug
  const getCategorySlug = (displayName: string): string => {
    const map: Record<string, string> = {
      'Featured Designs': 'featured',
      'New Arrivals': 'new-arrivals',
      'Best Sellers': 'best-sellers',
    };
    return map[displayName as keyof typeof map] || 'featured';
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section - Updated */}
        <section className="bg-[#f3f6fd] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
            {/* Left: Text Content */}
            <div className="flex-1 w-full max-w-xl flex flex-col items-start md:items-start text-left md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">
                Premium Collection
                <br />
                <span className="text-[2.5rem] md:text-[3rem] font-extrabold text-primary block leading-tight">AT Signature</span>
              </h1>
              <p className="italic text-xl md:text-2xl text-gray-700 mb-4 font-medium">"Not Just A Product, It's A Signature"</p>
              <p className="text-gray-500 mb-8 text-base md:text-lg max-w-md">
                Discover exquisite fragrances, elegant Islamic caps, and luxury watches. Quality craftsmanship meets timeless style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-primary text-white px-7 py-3 rounded-lg font-semibold text-base shadow hover:bg-blue-700 transition-colors"
                >
                  Shop Now
                  <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="flex gap-8 pt-4 border-t border-gray-200 max-w-md">
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-500 text-sm">Premium Products</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-gray-900">5K+</div>
                  <div className="text-gray-500 text-sm">Happy Customers</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-gray-500 text-sm">Authentic</div>
                </div>
              </div>
            </div>
            {/* Right: Image with Frame and Badges */}
            <div className="flex-1 flex justify-center items-center relative w-full max-w-lg mt-8 md:mt-0">
              <div className="relative">
                {/* Outer Gradient Frame */}
                <div className="rounded-3xl bg-gradient-to-br from-[#7b5cff] to-[#d65fff] p-4 md:p-6 shadow-xl">
                  {/* Inner Frame */}
                  <div className="rounded-2xl bg-[#edeaff] p-2 md:p-4">
                    <Image
                      src="/hero-image-600x800.jpg"
                      alt="Premium Watch"
                      width={320}
                      height={420}
                      className="rounded-xl object-cover w-[260px] h-[340px] md:w-[320px] md:h-[420px] shadow-lg"
                      priority
                    />
                  </div>
                </div>
                {/* Top-right badge */}
                <span className="absolute -top-6 -right-6 bg-yellow-400 rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white">
                  {/* BadgeCheck icon (Lucide/modern) */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9l-5 5-3-3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 21 12 17.27 7.82 21 9 12.91l-5-3.64 5.91-.91z" />
                  </svg>
                </span>
                {/* Bottom-left badge */}
                <span className="absolute -bottom-6 -left-6 bg-green-300 rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white">
                  {/* Heart icon (Lucide/modern) */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Designs */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Designs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {featuredDesigns.slice(0, 2).map((design) => (
                <div
                  key={design.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-3"
                  style={{ maxWidth: '320px', margin: '0 auto' }}
                >
                  {/* Product Image with portrait aspect ratio */}
                  <div className="aspect-[3/4] bg-gray-100">
                    <Image
                      src={design.image || "/placeholder.svg"}
                      alt={design.title}
                      width={180}
                      height={240}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="pt-3 pb-2 px-2">
                    <span className="inline-block text-xs font-semibold bg-blue-50 text-primary px-2 py-0.5 rounded-full mb-2">{design.category}</span>
                    <h3 className="font-semibold text-base mb-2">{design.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold text-lg">{design.price}</span>
                      <Link
                        href={`/shop/${getCategorySlug(design.category)}/${design.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promotions */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-secondary to-yellow-500 rounded-lg p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale</h2>
              <p className="text-xl mb-6">20% off on all t-shirts</p>
              <Link
                href="/shop"
                className="inline-block bg-white text-secondary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
