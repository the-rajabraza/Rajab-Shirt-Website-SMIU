import { HelpCircle } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-card rounded-xl shadow p-8 flex items-start gap-6 mb-8">
      <div className="flex-shrink-0">
        <HelpCircle className="w-10 h-10 text-primary" />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-left">Frequently Asked Questions (FAQ)</h2>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger className="text-left">How do I know which size to order?</AccordionTrigger>
            <AccordionContent className="text-left">
              Each product page includes a detailed size chart and fit tips. If you're unsure, feel free to contact our support team for personalized advice.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="text-left">What is your return policy?</AccordionTrigger>
            <AccordionContent className="text-left">
              We offer a 3-day return policy on most items. Please visit our Return Policy section above for full details and instructions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="text-left">How long does shipping take?</AccordionTrigger>
            <AccordionContent className="text-left">
              Orders are typically delivered within 2-5 business days across Pakistan. Shipping times may vary based on your location and product availability.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger className="text-left">How can I track my order?</AccordionTrigger>
            <AccordionContent className="text-left">
              Once your order is shipped, you'll receive a tracking link via email and WhatsApp. You can also use our Track Order page to check your order status.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-5">
            <AccordionTrigger className="text-left">What payment methods do you accept?</AccordionTrigger>
            <AccordionContent className="text-left">
              We accept Cash on Delivery, bank transfers, and most major credit/debit cards for your convenience and security.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
} 