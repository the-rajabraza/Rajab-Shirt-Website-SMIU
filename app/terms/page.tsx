import TermsSection from "@/components/terms-section";
import ShippingSection from "@/components/shipping-section";
import ReturnPolicySection from "@/components/return-policy-section";
import { FileText, Truck, RotateCcw, Ruler, HelpCircle } from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import SizeGuideSection from "@/components/size-guide-section";
import FaqSection from "@/components/faq-section";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto py-16 px-4 bg-background min-h-screen flex flex-col items-center justify-center">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-primary">Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read our terms, shipping, return, size guide, and FAQ sections carefully. We want you to have the best experience shopping with us!
          </p>
        </div>
        <div className="w-full flex flex-col gap-8">
          <section className="bg-card rounded-xl shadow p-8 flex items-start gap-6" id="terms-and-conditions">
            <div className="flex-shrink-0">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <TermsSection />
            </div>
          </section>
          <section className="bg-card rounded-xl shadow p-8 flex items-start gap-6" id="shipping-policy">
            <div className="flex-shrink-0">
              <Truck className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <ShippingSection />
            </div>
          </section>
          <section className="bg-card rounded-xl shadow p-8 flex items-start gap-6" id="return-policy">
            <div className="flex-shrink-0">
              <RotateCcw className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <ReturnPolicySection />
            </div>
          </section>
          <SizeGuideSection />
          <FaqSection />
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
} 