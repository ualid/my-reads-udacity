import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component  {	
  
      shouldComponentUpdate(props){
        if(this.props.id === props.id && props.shelf === this.props.shelf){
          return false;
        }
        return true;
      }

       render() {
        const options = ["currentlyReading", "wantToRead", "read", "none"];
      
        return (
            <div className="book">
             <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.image}")` }}></div>
              <div className="book-shelf-changer">
                <select value={this.props.shelf} onChange={(event) => this.props.changeBookShelf(this.props.id, event.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  {options.map((option, index) => (
                  <option key={index} value={option} >{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.title}</div>
             {this.props.author.map((value, index) => (
          <div className="book-authors" key = {index}>{value}</div>
          
             ))}       
          </div>
        );
      }
    }

  Book.propTypes = {
    shelf: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    author: PropTypes.array.isRequired, 
    changeBookShelf: PropTypes.func.isRequired
};
  
export default Book;