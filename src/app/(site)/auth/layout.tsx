import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice App – Auth",
  description: "Login or register to access the invoice dashboard.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">{children}</div>
    </section>
  );
}
