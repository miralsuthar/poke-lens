import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

export function findDuplicates(arr: string[]) {
  const frequencyMap: Record<string, number> = {};
  const duplicates = [];

  for (const str of arr) {
    if (!frequencyMap[str]) {
      frequencyMap[str] = 1;
    } else {
      frequencyMap[str]++;
    }
  }

  for (const str in frequencyMap) {
    if (frequencyMap[str] > 1) {
      duplicates.push(str);
    }
  }

  return duplicates;
}

export function cn(...classname: ClassValue[]) {
  return twMerge(clsx(classname));
}
