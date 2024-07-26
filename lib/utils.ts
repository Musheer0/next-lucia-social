import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function FormatNumber(n:number){
  return Intl.NumberFormat("en-US",{
    notation:'compact',
    maximumFractionDigits: 1
  }).format(n)
}
