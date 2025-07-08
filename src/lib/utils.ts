import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(money: number) {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
  }).format(money);
}
