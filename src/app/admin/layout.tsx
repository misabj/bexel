import { getAdminSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // The login page renders without the shell. Middleware guarantees that
  // any other /admin route only renders here when authenticated.
  if (!session) {
    return <div className="min-h-screen bg-slate-100">{children}</div>;
  }

  return <AdminShell>{children}</AdminShell>;
}
