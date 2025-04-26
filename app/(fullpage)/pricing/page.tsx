"use client";
import { Pricing } from "@/components/blocks/pricing";

const demoPlans = [
  {
    name: "FREE",
    price: "0",
    yearlyPrice: "0",
    period: "per month",
    features: [
      "Project at a time",
      "1 day chat history.",
      "Limited access to image uploads.",
      "Limited access to image uploads.",
      "Access to web search.",
    ],
    description: "Perfect for individuals projects",
    buttonText: "Started",
    href: "/chat",
    isPopular: false,
    isPaymentPlan: false
  },
  {
    name: "PROFESSIONAL",
    price: "5",
    yearlyPrice: "4",
    period: "per month",
    features: [
      "10 projects",
      "1 month chat history.",
      "Full API access",
      "More access of image uploads than FREE.",
      "Access web platforms."
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
    isPaymentPlan: true,
    monthlyPriceId: "price_1Mx9VxH0w2mVzPf7o0HdHJy3",
    yrearlyPriceId: "price_1Mx9VxH0w2mVzPf7o0HdHJy3"
  },
  {
    name: "ENTERPRISE",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Vs code extension",
      "Unlimited access of image uploads.",
      "1-hour support response time",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
    isPaymentPlan: true,
    monthlyPriceId: "price_1Mx9VxH0w2mVzPf7o0HdHJy3",
    yrearlyPriceId: "price_1Mx9VxH0w2mVzPf7o0HdHJy3"
  },
];

function Page() {
  return (
    <div className="h-[800px] overflow-y-auto rounded-lg">
      <Pricing 
        plans={demoPlans}
        title="Simple, Transparent Pricing"
        description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
      />
    </div>
  );
}

export default Page;
