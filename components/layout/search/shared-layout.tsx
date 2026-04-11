import Footer from "components/layout/footer";
import { Suspense } from "react";

export default async function SharedSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
      <Footer />
    </>
  );
}
