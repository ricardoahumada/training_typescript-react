import React from 'react';
import { Book, Genre } from '../types';

interface BookCardProps {
  book: Book;
  onLoan: (isbn: string) => void;
  onReturn: (isbn: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onLoan, onReturn }) => {
  const available = book.availableCopies > 0;

  const genreLabels: Record<Genre, string> = {
    [Genre.FICTION]: 'Ficción',
    [Genre.NON_FICTION]: 'No Ficción',
    [Genre.SCIENCE]: 'Ciencia',
    [Genre.HISTORY]: 'Historia',
    [Genre.TECHNOLOGY]: 'Tecnología',
    [Genre.BIOGRAPHY]: 'Biografía',
    [Genre.CHILDREN]: 'Infantil'
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Género:</strong> {genreLabels[book.genre]}</p>
      <p><strong>Año:</strong> {book.publicationYear}</p>
      <p><strong>Editorial:</strong> {book.publisher}</p>
      <p>
        <strong>Disponibles:</strong> {book.availableCopies} / {book.totalCopies}
        {book.isDigital && ' (Digital)'}
      </p>
      <button 
        onClick={() => onLoan(book.isbn)} 
        disabled={!available}
      >
        Prestar
      </button>
      <button 
        onClick={() => onReturn(book.isbn)}
        disabled={book.availableCopies >= book.totalCopies}
      >
        Devolver
      </button>
    </div>
  );
};

export { Book } from '../types';
