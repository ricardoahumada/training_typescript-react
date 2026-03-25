// ============================================
// Parte 1: Definición de Entidades
// ============================================

// Enum para géneros de libros
export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  TECHNOLOGY = "TECHNOLOGY",
  BIOGRAPHY = "BIOGRAPHY",
  CHILDREN = "CHILDREN"
}

// Enum para tipos de membresía
export enum MembershipType {
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  STUDENT = "STUDENT"
}

// Enum para estados de préstamo
export enum LoanStatus {
  ACTIVE = "ACTIVE",
  RETURNED = "RETURNED",
  OVERDUE = "OVERDUE",
  LOST = "LOST"
}

// Interface Book - Libro en el catálogo
export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  genre: Genre;
  publicationYear: number;
  publisher: string;
  availableCopies: number;
  totalCopies: number;
  isDigital: boolean;
}

// Interface Member - Socio de la biblioteca
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: MembershipType;
  registrationDate: Date;
  activeLoans: number;
  maxLoans: number;
}

// Interface Loan - Préstamo de libro
export interface Loan {
  id: string;
  isbn: string;
  memberId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate: Date | undefined;
  status: LoanStatus;
}

// Tipos auxiliares para creación (parciales)
export type BookInput = Partial<Book>;
export type MemberInput = Partial<Member>;
