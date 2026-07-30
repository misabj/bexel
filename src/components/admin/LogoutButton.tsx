"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export function LogoutButton({ full = true }: { full?: boolean }) {
  const router = useRouter();
  const { toast } = useToast();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    toast("Signed out.", "info");
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      className={cn("justify-start", full && "w-full")}
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  );
}
