import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const Panel = props => {
 
        return (
                props.panelTitle !== '' &&
                (<div className="bookshelf" key={props.id}>
                    <h2 className="bookshelf-title">{props.panelTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                      
                            {props.books.map((book, index) => (
                                book.id !== undefined && (
                                    <li key={index}>
                                        <Book
                                            changeBookShelf={props.changeBookShelf}
                                            key={book.id}
                                            id={book.id}
                                            image={book.url}
                                            title={book.title}
                                            author={book.author}
                                            shelf={props.panelTitle}
                                        />
                                    </li>
                                )
                            ))}

                        </ol>
                    </div>
                </div>)
        );
}

Panel.propTypes = {
    panelTitle: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
};

export default Panel;