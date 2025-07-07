import Link from "next/link";
const pages = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Clients", href: "/clients" },
  { name: "Invoices", href: "/invoices" },
];

export default function Header() {
  return (
    <div className="fixed top-4 inset-x-0 z-40 mx-4 md:mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl bg-background/30 backdrop-blur-md px-6 shadow-md border border-border">
      <h1>Billboo</h1>
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-4">
          {pages.map((page, idx) => (
            <Link
              key={idx}
              href={page.href}
              className="text-sm text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--primary)] transition-all duration-300 font-semibold"
              title={page.name}
            >
              {page.name}
            </Link>
          ))}

          {/* <button
            className="text-sm text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--primary)] transition-all duration-300 font-semibold"
            title={session ? "Logout" : "Login"}
            onClick={handleAuthClick}
          >
            {session ? session.name : "LogIn"}
          </button> */}
        </nav>
      </div>
    </div>
  );
}
