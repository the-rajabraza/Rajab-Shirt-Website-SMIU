import { Ruler } from "lucide-react";

export default function SizeGuideSection() {
  return (
    <section id="size-guide" className="bg-card rounded-xl shadow p-8 flex items-start gap-6 mb-8">
      <div className="flex-shrink-0">
        <Ruler className="w-10 h-10 text-primary" />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Size Guide</h2>
        <p className="text-muted-foreground">
          For detailed sizing information, please check the product page. Each product includes a size chart and fit tips to help you choose the perfect size.
        </p>
      </div>
    </section>
  );
} 