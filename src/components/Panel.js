import React from 'react'
import Book from './Book'

function Panel(props){
    return (<div className="bookshelf">
    <h2 className="bookshelf-title">{props.panelTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        <li>
              <Book image={props.urlImage}
                    title={props.bookTitle}
                    author={props.bookAuthor}
              />
        </li>
      </ol>
    </div>
  </div>)
}

export default Panel