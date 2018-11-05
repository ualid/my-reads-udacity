import React from 'react';

function Book(props){	
       const options = ["currentlyReading", "wantToRead", "read", "none"]
       
        return (
            <div className="book">
             <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.image}")` }}></div>
              <div className="book-shelf-changer">
                <select value={props.shelf} onChange={(event) => props.changeBookShelf(props.id, event.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  {options.map((option, index) => (
                  <option key={index} value={option} >{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
          </div>
        );
    }
export default Book