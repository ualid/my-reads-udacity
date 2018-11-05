import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Panel from './components/Panel'
import ButtonAdd from './components/ButtonAdd'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  changePage = val => {
    this.setState({ showSearchPage: val })
  }
 
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
            <Search  changePage={this.changePage}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Panel 
                  data={BooksAPI.getAll()}
                />
                {/*<Panel panelTitle="Want to Read" 
                       urlImage="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api" 
                       bookTitle="To Kill a Mockingbird"
                       bookAuthor="Harper Lee"
                />
                <Panel panelTitle="Read" 
                       urlImage="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api" 
                       bookTitle="To Kill a Mockingbird"
                       bookAuthor="Harper Lee"
                /> */}
              </div>
            </div>

            <ButtonAdd  changePage={this.changePage} />

          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
