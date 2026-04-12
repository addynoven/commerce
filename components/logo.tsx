import Image from "next/image";

export function Logo({
  className,
  variant = "maroon",
  width,
  height,
}: {
  className?: string;
  variant?: "maroon" | "white" | "black";
  width?: number;
  height?: number;
}) {
  const logoSrc = {
    maroon: "/logo/Main.svg",
    white: "/logo/White.svg",
    black: "/logo/Black.svg",
  }[variant];

  const imgWidth = width ?? 180;
  const imgHeight = height ?? 60;
  const hasCustomSize = width !== undefined || height !== undefined;

  return (
    <div className={`flex items-center justify-center ${className ?? ""}`}>
      <Image
        src={logoSrc}
        alt="Aarshaveda"
        width={imgWidth}
        height={imgHeight}
        className={hasCustomSize ? "w-auto h-auto" : "h-10 w-auto md:h-14"}
        style={hasCustomSize ? { width: imgWidth, height: imgHeight } : undefined}
        priority
      />
    </div>
  );
}
