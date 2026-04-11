import SharedSearchLayout from "components/layout/search/shared-layout";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedSearchLayout>{children}</SharedSearchLayout>;
}
