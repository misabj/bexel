import Link from "next/link";
import { Boxes } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="BEXEL Growth home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-white">
        <Boxes className="h-5 w-5" />
      </span>
      <span className={light ? "text-white" : "text-brand-900"}>
        <span className="text-lg font-extrabold tracking-tight">BEXEL</span>
        <span className="text-lg font-extrabold tracking-tight text-accent-500">
          {" "}
          Growth
        </span>
      </span>
    </Link>
  );
}
