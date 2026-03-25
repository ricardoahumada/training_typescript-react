import React, { useState } from 'react';
import { Book, BookCard } from './components/BookCard';
import { BookList } from './components/BookList';
import { MemberPanel } from './components/MemberPanel';
import { LoanForm } from './components/LoanForm';
import { Genre, MembershipType, LoanStatus } from './types';

// Datos de ejemplo para el Sistema de Biblioteca
const sampleBooks: Book[] = [
  {
    isbn: '978-0-13-468599-1',
    title: 'TypeScript Handbook',
    authorIds: ['author-1'],
    genre: Genre.TECHNOLOGY,
    publicationYear: 2023,
    publisher: 'O Reilly',
    availableCopies: 3,
    totalCopies: 5,
    isDigital: false
  },
  {
    isbn: '978-1-59327-950-1',
    title: 'React Design Patterns',
    authorIds: ['author-2'],
    genre: Genre.TECHNOLOGY,
    publicationYear: 2022,
    publisher: 'No Starch Press',
    availableCopies: 2,
    totalCopies: 2,
    isDigital: true,
    url: 'https://example.com/react-patterns'
  }
];

function App() {
  const [books, setBooks] = useState<Book[]>(sampleBooks);

  const handleLoan = (isbn: string) => {
    console.log('Loan book:', isbn);
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.isbn === isbn
          ? { ...book, availableCopies: book.availableCopies - 1 }
          : book
      )
    );
  };

  const handleReturn = (isbn: string) => {
    console.log('Return book:', isbn);
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.isbn === isbn
          ? { ...book, availableCopies: book.availableCopies + 1 }
          : book
      )
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Biblioteca</h1>
      </header>
      
      <main className="app-main">
        <section className="panel">
          <h2>Libros</h2>
          <BookList books={books} onLoan={handleLoan} onReturn={handleReturn} />
        </section>

        <section className="panel">
          <MemberPanel />
        </section>

        <section className="panel">
          <LoanForm books={books} />
        </section>
      </main>
    </div>
  );
}

export default App;
