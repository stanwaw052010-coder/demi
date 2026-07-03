import Image from "next/image";

export default function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 480px, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-green/20 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
