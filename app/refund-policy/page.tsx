import Footer from "components/layout/footer";

export const metadata = {
  title: "Return & Refund Policy | Aarshaveda",
  description: "Read our return and refund policy to understand your options.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <div className="bg-white min-h-[60vh] pt-16 pb-24 border-b border-neutral-100">
        <div className="main-container max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-8 md:mb-12">
            Return & Refund Policy
          </h1>
          <div className="prose prose-neutral max-w-none font-sans text-neutral-600 leading-relaxed space-y-6">
            <p>
              We want you to be completely satisfied with your purchase from Aarshaveda. If for any reason you are not, we offer a straightforward return and refund process.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              Returns
            </h2>
            <p>
              Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
            </p>

            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              Refunds
            </h2>
            <p>
              Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
              If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              Exchanges
            </h2>
            <p>
              We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at info@aarshaveda.com.
            </p>

            <h2 className="text-2xl font-serif font-semibold text-neutral-900 mt-10 mb-4">
              Shipping
            </h2>
            <p>
              You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
