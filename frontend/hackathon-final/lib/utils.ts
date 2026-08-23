import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Locale-independent thousands formatter. `toLocaleString` renders
 * differently between Node's SSR pass and the browser's ICU data for
 * some locales (e.g. "uz-UZ"), which breaks hydration — this doesn't.
 */
export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
