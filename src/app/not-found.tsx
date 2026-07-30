import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <p className="text-6xl font-extrabold text-brand-800">404</p>
      <h1 className="mt-4 text-2xl font-bold text-brand-900">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-500">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-6">
        <Button variant="accent">Back to home</Button>
      </Link>
    </div>
  );
}
