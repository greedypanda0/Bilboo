import { cn } from "@/lib/utils";
import Header from "./ui/header";

export default function Main({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Header />
      <main
        className={cn(
          "mx-auto mb-16 w-full max-w-5xl flex-1 px-4 py-24 sm:px-8",
          className
        )}
      >
        {children}
      </main>
    </>
  );
}
