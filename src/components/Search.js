import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends React.Component {

    static propTypes = {
        datas: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    };
    state = {
        booksStore: [],
        books: []
    };

    componentWillMount() {
        if (this.props.datas === undefined) {
            const booksStore = BooksAPI.getAll();
            booksStore.then(data => {
                this.setState({ 'booksStore': data })
            });
        } else {
            this.setState({ 'booksStore': this.props.datas });
        }
    }
    componentWillReceiveProps(someProp) {
        this.setState({ 'booksStore': someProp.datas });
    }
    getBookByName = (name) => {

        if (name === '') {
            const books = [];
            this.setState({ 'books': books });
            return true;
        }

        const data = BooksAPI.search(name);
      
            data.then(books => {
                if (books.hasOwnProperty('error')) {
                    books = [];
                }
                this.setState({ 'books': books });
            }
            ).catch(() => {
                this.setState({ 'books': [] });
            });
         
    }
    getShelf(book) {
        var currentShelf = String('none');

        for (let it of this.state.booksStore) {
            if (it.id === book.id) {
                currentShelf = it.shelf;
                break;
            }
        }
        return currentShelf;
    }
    changeBookShelf = (idBook, shelf) => {
        const newDatas = BooksAPI.update(idBook, shelf);
        newDatas.then(() => {
            const data = BooksAPI.getAll();
            data.then(
                data =>
                    this.setState({ 'booksStore': data })
            );
        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"> </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={(event) => this.getBookByName(event.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book, index) => (
                            book.hasOwnProperty('authors') && (
                            <Book
                            
                                key={index}
                                changeBookShelf={this.props.changeBookShelf}
                                id={book.id}
                                image={book.imageLinks.thumbnail}
                                title={book.title}
                                author={book.authors}
                                shelf={this.getShelf(book)}
                        />)
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search