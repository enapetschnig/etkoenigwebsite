import Image from "next/image";

export function Logo({
  className = "",
  size = "default",
  variant = "dark",
}: {
  className?: string;
  size?: "default" | "small" | "large";
  variant?: "dark" | "white";
}) {
  const dimensions = {
    small: { width: 140, height: 56 },
    default: { width: 180, height: 72 },
    large: { width: 240, height: 96 },
  };

  const { width, height } = dimensions[size];
  const src = variant === "white" ? "/logo-white.png" : "/logo.png";

  return (
    <Image
      src={src}
      alt="ET König GmbH – Einen Herzschlag voraus"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
