import React, { Suspense, lazy } from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
  onLoan: (isbn: string) => void;
  onReturn: (isbn: string) => void;
}

export const BookList: React.FC<BookListProps> = ({ books, onLoan, onReturn }) => {
  return (
    <div className="book-list">
      <Suspense fallback={<div className="loading">Cargando libros...</div>}>
        {books.length === 0 ? (
          <p>No hay libros en el sistema.</p>
        ) : (
          books.map(book => (
            <BookCard 
              key={book.isbn} 
              book={book} 
              onLoan={onLoan} 
              onReturn={onReturn} 
            />
          ))
        )}
      </Suspense>
    </div>
  );
};
