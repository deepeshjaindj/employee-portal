import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date for Airtable (YYYY-MM-DD)
export function formatDateForAirtable(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Parse Airtable date string to Date object
export function parseAirtableDate(dateString: string): Date {
  return new Date(dateString);
}