import Header from "./ui/header";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto mb-16 w-full max-w-5xl flex-1 px-4 py-24 sm:px-8">
        {children}
      </main>
    </>
  );
}
