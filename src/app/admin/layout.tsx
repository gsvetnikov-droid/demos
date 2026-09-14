import Providers from "@/components/Providers";
import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </Providers>
  );
}
