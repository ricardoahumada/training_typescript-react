// Tipos del dominio: Sistema de Biblioteca

export enum Genre {
  FICTION = 'fiction',
  NON_FICTION = 'nonFiction',
  SCIENCE = 'science',
  HISTORY = 'history',
  TECHNOLOGY = 'technology',
  BIOGRAPHY = 'biography',
  CHILDREN = 'children'
}

export enum MembershipType {
  STANDARD = 'standard',
  PREMIUM = 'premium',
  STUDENT = 'student'
}

export enum LoanStatus {
  ACTIVE = 'active',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
  LOST = 'lost'
}

export interface Book {
  isbn: string;
  title: string;
  authorIds: string[];
  genre: Genre;
  publicationYear: number;
  publisher: string;
  availableCopies: number;
  totalCopies: number;
  isDigital: boolean;
  url?: string;
}

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

export interface Loan {
  id: string;
  bookIsbn: string;
  memberId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: LoanStatus;
  renewalCount: number;
}
