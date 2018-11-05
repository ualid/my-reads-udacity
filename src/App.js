import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Panel from './components/Panel'
import ButtonAdd from './components/ButtonAdd'
import Search from './components/Search'

class BooksApp extends React.Component {

  state = {  /**
    * TODO: Instead of using this state variable to keep track of which page
    * we're on, use the URL in the browser's address bar. This will ensure that
    * users can use the browser's back and forward buttons to navigate between
    * pages, as well as provide a good URL they can bookmark and share.
    */
    showSearchPage: false,
    panels: [
      {
        books: [{

        }],
        panelTitle: '',
        id: ''
      }
    ]
  }

  clearState = ()  => {
    this.setState(currState => ({
      panels: [
        {
          books: [{
  
          }],
          panelTitle: '',
          id: ''
        }
      ]
    }))
  }

  componentWillMount() {
    const data = BooksAPI.getAll()
    data.then(
      data =>
        this.createPanel(data)
    )
  }

  addPanel(data) {
    const panel =
    {
      books: [{

      }],
      panelTitle: data.shelf,
      id: data.id
    }

    this.setState(currState => ({
      ...currState.panels.push(panel)
    }))


  }
  addBook(data) {
    const positionPanel = this.getPositionPanel(this.state.panels, data.shelf)
    const panel = this.state.panels[positionPanel]
    const titleBook = data.title
    const authorBook = data.authors
    const idBook = data.id
    const urlBook = data.imageLinks['thumbnail']
    const book = []
    
    book['title'] = titleBook
    book['author'] = authorBook
    book['id'] = idBook
    book['url'] = urlBook

    panel.books.push(book)
    this.setState(currState => ({
      ...currState.panels[positionPanel] = panel
    }))
  }
  verifyIfExistPanel(panels, titleSearch) {
    return panels.filter(panel => panel.panelTitle === titleSearch).length > 0
  }
  getPositionPanel(panels, titleSearch) {
    var positionPanel = -1
    panels.map((panel, index) => {
      if (panel.panelTitle === titleSearch) {
        positionPanel = index
      }
    })
    return positionPanel
  }
  createPanel(datas) {
    this.clearState()
    datas.map((data, index) => {
      if (this.verifyIfExistPanel(this.state.panels, data.shelf)) {
        this.addBook(data)
      } else {
        this.addPanel(data)
        this.addBook(data)
      }
    })
  }

  changePage = val => {
    this.setState({ showSearchPage: val })
  }

  changeBookShelf = (idBook, shelf) => {
    const newDatas = BooksAPI.update(idBook, shelf)
    newDatas.then(() => {
      const data = BooksAPI.getAll()
      data.then(
        data =>
          this.createPanel(data)
      )
    })
    //this.createPanel(newDatas)
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search changePage={this.changePage} />
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.panels.map((panel, index) => (
                    panel.panelTitle !== '' &&
                    (
                      <Panel
                        changeBookShelf={this.changeBookShelf}
                        panelTitle={panel.panelTitle}
                        id={panel.id}
                        key={panel.id}
                        books={panel.books}
                      />
                    ))
                  )}
                </div>
              </div>
              <ButtonAdd changePage={this.changePage} />
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
