import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import ContactBanner from "components/layout/contact/contact-banner";
import ContactForm from "components/layout/contact/contact-form";
import FAQAccordion from "components/layout/contact/faq-accordion";
import Footer from "components/layout/footer";

export const metadata = {
  title: "Contact Us | Aarshaveda",
  description:
    "Get in touch with Aarshaveda for any queries regarding our Ayurvedic products and services.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <ContactBanner />

      {/* Breadcrumb Placeholder */}
      <div className="main-container py-8">
        <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400">
          Home / <span className="text-neutral-900">Contact</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="main-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Reach Us Column */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-6 tracking-tight">
                Reach Us
              </h2>
              <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                Have a question about our products, your order, or wellness
                guidance? Fill out the form below and our team will get back to
                you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#A65B4A] rounded-full flex-none flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div className="pt-2">
                  <p className="text-sm md:text-base font-serif font-bold text-neutral-800 tracking-wide">
                    +91 484 405 8439, +91 85929 41518
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#A65B4A] rounded-full flex-none flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <EnvelopeIcon className="h-6 w-6" />
                </div>
                <div className="pt-2">
                  <p className="text-sm md:text-base font-serif font-bold text-neutral-800 tracking-wide">
                    info@aarshaveda.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#A65B4A] rounded-full flex-none flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <MapPinIcon className="h-6 w-6" />
                </div>
                <div className="pt-2">
                  <p className="text-sm md:text-base font-serif font-bold text-neutral-800 tracking-wide leading-relaxed max-w-xs">
                    IX/338, Bank Road, Aluva, Periyar Nagar, Cochin, Ernakulam
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <ContactForm />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#FAF7F2] py-24">
        <div className="main-container">
          <FAQAccordion />
        </div>
      </div>

      <Footer />
    </div>
  );
}
