import Footer from "components/layout/footer";

export const metadata = {
  title: "Terms of Service | Aarshaveda",
  description: "Terms and conditions for using the Aarshaveda website and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <div className="bg-white min-h-[60vh] pt-16 pb-24 border-b border-neutral-100">
        <div className="main-container max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-8 md:mb-12">
            Terms of Service
          </h1>
          <div className="prose prose-neutral max-w-none font-sans text-neutral-600 leading-relaxed space-y-6">
            <p>
              Welcome to Aarshaveda. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              1. General Conditions
            </h2>
            <p>
              We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
            </p>

            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              2. Products or Services
            </h2>
            <p>
              Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
              We have made every effort to display as accurately as possible the colors and images of our products that appear at the store.
            </p>

            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              3. Accuracy of Billing and Account Information
            </h2>
            <p>
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. 
            </p>

            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              4. Changes to Terms of Service
            </h2>
            <p>
              You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.
            </p>

            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              5. Contact Information
            </h2>
            <p>
              Questions about the Terms of Service should be sent to us at info@aarshaveda.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
