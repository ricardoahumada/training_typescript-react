// ============================================
// Parte 5: Type Guards y Validación
// ============================================

import { Book, Member } from "../types";

/**
 * isValidISBN - Verifica si un ISBN tiene formato válido
 * - Debe ser string
 * - Exactamente 13 caracteres
 * - Todos deben ser dígitos
 */
export function isValidISBN(isbn: unknown): boolean {
  if (typeof isbn !== "string") {
    return false;
  }
  if (isbn.length !== 13) {
    return false;
  }
  return /^\d+$/.test(isbn);
}

/**
 * isValidEmail - Verifica formato básico de email
 * - Debe ser string
 * - Debe contener @
 * - Debe tener algo antes y después de @
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * isValidPhone - Verifica que el teléfono tenga al menos 9 dígitos
 */
export function isValidPhone(phone: unknown): boolean {
  if (typeof phone !== "string") {
    return false;
  }
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 9;
}

/**
 * isBook - Type guard para validar estructura de Book
 */
export function isBook(obj: unknown): obj is Book {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const book = obj as Record<string, unknown>;
  return (
    typeof book.isbn === "string" &&
    typeof book.title === "string" &&
    Array.isArray(book.authors) &&
    typeof book.genre === "string" &&
    typeof book.publicationYear === "number" &&
    typeof book.publisher === "string" &&
    typeof book.availableCopies === "number" &&
    typeof book.totalCopies === "number" &&
    typeof book.isDigital === "boolean"
  );
}

/**
 * isMember - Type guard para validar estructura de Member
 */
export function isMember(obj: unknown): obj is Member {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const member = obj as Record<string, unknown>;
  return (
    typeof member.id === "string" &&
    typeof member.name === "string" &&
    typeof member.email === "string" &&
    typeof member.phone === "string" &&
    typeof member.membershipType === "string" &&
    member.registrationDate instanceof Date &&
    typeof member.activeLoans === "number" &&
    typeof member.maxLoans === "number"
  );
}
