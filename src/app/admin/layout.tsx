import Providers from "@/components/Providers";
import AdminNav from "@/components/AdminNav";

// The public site (root layout) runs a dark theme; the admin tool is a
// private, functional utility with no design-showcase purpose, so it
// opts back into a plain light theme here regardless of the root body's
// background/text color.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Providers>
        <AdminNav />
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </Providers>
    </div>
  );
}
