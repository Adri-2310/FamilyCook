import { ReactNode } from "react";
import { AppNavbar } from "@/components/app-navbar";
import { Footer } from "@/components/footer";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
