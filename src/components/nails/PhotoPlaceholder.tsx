import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  label: string;
  filename: string;
  className?: string;
}

export default function PhotoPlaceholder({
  label,
  filename,
  className,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[2rem] border border-pink-200 bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 text-center",
        className
      )}
    >
      <Camera className="h-7 w-7 text-brand-dark/50" strokeWidth={1.5} />
      <p className="px-4 text-sm font-medium text-foreground/60">{label}</p>
      <p className="rounded-full bg-white/70 px-3 py-1 font-mono text-[11px] text-foreground/40">
        {filename}
      </p>
    </div>
  );
}
