import Image from "next/image";

export function Logo({
  className,
  variant = "maroon",
}: {
  className?: string;
  variant?: "maroon" | "white" | "black";
}) {
  const logoSrc = {
    maroon: "/logo/Main.svg",
    white: "/logo/White.svg",
    black: "/logo/Black.svg",
  }[variant];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={logoSrc}
        alt="Aarshaveda"
        width={180}
        height={60}
        className="h-10 w-auto md:h-14"
        priority
      />
    </div>
  );
}
