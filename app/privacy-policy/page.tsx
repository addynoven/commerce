import Footer from "components/layout/footer";

export const metadata = {
  title: "Privacy Policy | Aarshaveda",
  description: "Privacy policy for Aarshaveda. Learn how we handle and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-white min-h-[60vh] pt-16 pb-24 border-b border-neutral-100">
        <div className="main-container max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-8 md:mb-12">
            Privacy Policy
          </h1>
          <div className="prose prose-neutral max-w-none font-sans text-neutral-600 leading-relaxed space-y-6">
            <p>
              At Aarshaveda, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              Personal Information We Collect
            </h2>
            <p>
              When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
            </p>

            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              How Do We Use Your Personal Information?
            </h2>
            <p>
              We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              Changes
            </h2>
            <p>
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              Contact Us
            </h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@aarshaveda.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
