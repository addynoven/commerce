"use client";

import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is Aarshaveda?",
    answer:
      "Aarshaveda is a premium Ayurvedic wellness brand with over 100 years of heritage, dedicated to providing pure, organic, and effective products for modern living.",
  },
  {
    question: "Are Aarshaveda products safe for regular use?",
    answer:
      "Yes, all our products are formulated with natural ingredients and are safe for regular use. We recommend conducting a patch test for topical products if you have sensitive skin.",
  },
  {
    question: "Do Aarshaveda products contain artificial additives?",
    answer:
      "No, we strictly avoid artificial colors, synthetic fragrances, and preservatives in our products to maintain the purity of Ayurvedic formulations.",
  },
  {
    question: "How do I choose the right product for my needs?",
    answer:
      "You can shop by concern on our website, or contact our wellness experts for a personalized recommendation based on your Ayurvedic dosha or specific health goals.",
  },
  {
    question: "How can I contact Aarshaveda for support?",
    answer:
      "You can reach us via the contact form above, email us at info@aarshaveda.com, or call us at +91 484 405 8439 during business hours.",
  },
];

export default function FAQAccordion() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <h4 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 text-center mb-12">
        Frequently Asked Questions
      </h4>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-neutral-300">
            <Disclosure>
              {({ open }) => (
                <div>
                  <Disclosure.Button className="flex w-full items-center justify-between px-6 py-5 text-left">
                    <span className="text-sm md:text-base font-serif font-bold text-neutral-800">
                      {faq.question}
                    </span>
                    {open ? (
                      <MinusIcon className="h-5 w-5 text-neutral-500" />
                    ) : (
                      <PlusIcon className="h-5 w-5 text-neutral-500" />
                    )}
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-6 text-sm text-neutral-600 font-medium leading-relaxed">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}
