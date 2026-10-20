import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import OrderConfirmationClient from "@/components/order-confirmation-client"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <OrderConfirmationClient />
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
