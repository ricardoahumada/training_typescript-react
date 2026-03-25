// ============================================
// Archivo principal - Verificación Global
// ============================================

import { Book, Member, Loan, Genre, MembershipType, LoanStatus } from "./types";
import { createBook, registerMember, calculateDueDate } from "./services/library";
import { isValidISBN, isValidEmail, isBook, isMember } from "./utils/validators";

console.log("=== Sistema de Biblioteca - Verificación Global ===\n");

// Test 1: Crear libro válido
console.log("--- Test 1: Crear libro válido ---");
const book = createBook({
  isbn: "9780123456789",
  title: "El Quijote",
  authors: ["Miguel de Cervantes"],
  genre: Genre.FICTION,
  publicationYear: 1605,
  publisher: "Juan de la Cuesta",
  totalCopies: 5,
  availableCopies: 3,
  isDigital: false
});
console.log("Libro creado:", book);
console.log();

// Test 2: Registrar socio
console.log("--- Test 2: Registrar socio ---");
const member = registerMember({
  name: "María García",
  email: "maria@email.com",
  phone: "612345678",
  membershipType: MembershipType.STANDARD
});
console.log("Socio registrado:", member);
console.log();

// Test 3: Calcular fecha de devolución
console.log("--- Test 3: Calcular fecha de devolución ---");
const dueDate = calculateDueDate(new Date(), member.membershipType);
console.log("Fecha de devolución:", dueDate.toLocaleDateString());
console.log();

// Test 4: Type guards
console.log("--- Test 4: Type guards ---");
console.log("ISBN '9780123456789' válido:", isValidISBN("9780123456789"));
console.log("ISBN '123' válido:", isValidISBN("123"));
console.log("Email 'test@email.com' válido:", isValidEmail("test@email.com"));
console.log("Email 'invalid' válido:", isValidEmail("invalid"));
console.log("Es un libro válido:", isBook(book));
console.log("Es un socio válido:", isMember(member));
console.log();

// Test 5: Validaciones de error
console.log("--- Test 5: Validaciones de error ---");
try {
  createBook({ isbn: "123", title: "Test" }); // ISBN inválido
} catch (e) {
  console.log("Error al crear libro con ISBN inválido:", (e as Error).message);
}

try {
  createBook({ isbn: "9780123456789", title: "" }); // Título vacío
} catch (e) {
  console.log("Error al crear libro con título vacío:", (e as Error).message);
}

try {
  registerMember({ name: "Test", email: "invalid", phone: "123" }); // Email y teléfono inválidos
} catch (e) {
  console.log("Error al registrar socio:", (e as Error).message);
}

console.log("\n=== Verificación completada con éxito ===");
