import { AppNavbar } from "@/components/app-navbar";
import { Footer } from "@/components/footer";

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      <main className="min-h-screen bg-background">{children}</main>
      <Footer />
    </>
  );
}
