// ============================================
// Parte 3: Lógica de Negocio - Tipado de Funciones
// ============================================

import { Book, Member, MembershipType, Genre, BookInput, MemberInput } from "../types";
import { isValidISBN, isValidEmail, isValidPhone } from "../utils/validators";

// Duración de préstamos por tipo de membresía (en días)
const LOAN_DURATION: Record<MembershipType, number> = {
  [MembershipType.STANDARD]: 14,
  [MembershipType.PREMIUM]: 30,
  [MembershipType.STUDENT]: 21
};

// Límite de préstamos por tipo de membresía
const MAX_LOANS_BY_MEMBERSHIP: Record<MembershipType, number> = {
  [MembershipType.STANDARD]: 3,
  [MembershipType.PREMIUM]: 10,
  [MembershipType.STUDENT]: 5
};

/**
 * generateId - Genera un ID único simple
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * createBook - Crea un libro validado
 * Validaciones:
 * - ISBN debe tener formato válido (13 caracteres numéricos)
 * - Título no puede estar vacío
 * - Ejemplares disponibles no puede superar total
 * - Año de publicación no puede ser futuro
 */
export function createBook(data: BookInput): Book {
  // Validar ISBN
  if (!isValidISBN(data.isbn)) {
    throw new Error("ISBN inválido: debe tener exactamente 13 caracteres numéricos");
  }

  // Validar título
  if (!data.title || data.title.trim() === "") {
    throw new Error("El título no puede estar vacío");
  }

  // Validar exemplares
  if ((data.availableCopies ?? 0) > (data.totalCopies ?? 0)) {
    throw new Error("Los ejemplares disponibles no pueden superar el total");
  }

  // Validar año de publicación
  const currentYear = new Date().getFullYear();
  if ((data.publicationYear ?? 0) > currentYear) {
    throw new Error("El año de publicación no puede ser futuro");
  }

  // Retornar libro completo
  return {
    isbn: data.isbn as string,
    title: data.title as string,
    authors: data.authors ?? [],
    genre: data.genre ?? Genre.FICTION,
    publicationYear: data.publicationYear as number,
    publisher: data.publisher ?? "Desconocida",
    availableCopies: data.availableCopies ?? 0,
    totalCopies: data.totalCopies ?? 1,
    isDigital: data.isDigital ?? false
  };
}

/**
 * registerMember - Registra un nuevo socio
 * Validaciones:
 * - Email debe tener formato válido
 * - Teléfono debe tener al menos 9 dígitos
 * - Límite de préstamos según tipo de membresía
 */
export function registerMember(data: MemberInput): Member {
  // Validar email
  if (!isValidEmail(data.email)) {
    throw new Error("Email inválido");
  }

  // Validar teléfono
  if (!isValidPhone(data.phone)) {
    throw new Error("El teléfono debe tener al menos 9 dígitos");
  }

  // Obtener tipo de membresía
  const membershipType = data.membershipType ?? MembershipType.STANDARD;

  // Obtener límite de préstamos para el tipo de membresía
  const maxLoans = MAX_LOANS_BY_MEMBERSHIP[membershipType];

  // Retornar socio completo
  return {
    id: generateId(),
    name: data.name ?? "Sin nombre",
    email: data.email as string,
    phone: data.phone as string,
    membershipType: membershipType,
    registrationDate: new Date(),
    activeLoans: 0,
    maxLoans: maxLoans
  };
}

/**
 * calculateDueDate - Calcula fecha de devolución
 * según el tipo de membresía:
 * - STANDARD: 14 días
 * - PREMIUM: 30 días
 * - STUDENT: 21 días
 */
export function calculateDueDate(loanDate: Date, membershipType: MembershipType): Date {
  const days = LOAN_DURATION[membershipType];
  const dueDate = new Date(loanDate);
  dueDate.setDate(dueDate.getDate() + days);
  return dueDate;
}
