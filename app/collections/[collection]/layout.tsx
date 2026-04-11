import SharedSearchLayout from "components/layout/search/shared-layout";

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedSearchLayout>{children}</SharedSearchLayout>;
}
