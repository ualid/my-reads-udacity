import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Panel from './components/Panel';
import ButtonAdd from './components/ButtonAdd';
import Search from './components/Search';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {

  state = { 
    panels: [
      {
        books: [{

        }],
        panelTitle: '',
        id: ''
      }
    ],
    allBooks:[]
  };

  clearState = ()  => {
    this.setState(currState => ({
      panels: [
        {
          books: [],
          panelTitle: '',
          id: ''
        }
      ],
      allBooks:[]
    }))
  }
 
  async componentDidMount() {
    const data = await BooksAPI.getAll();
    this.createPanel(data);
  }

  addPanel(data) {
    const panel =
    {
      books: [{

      }],
      panelTitle: data.shelf,
      id: data.id
    };

    this.setState(currState => ({
      ...currState.panels.push(panel)
    }))
  }

  addBook(data) {
    const positionPanel = this.getPositionPanel(this.state.panels, data.shelf);
    const panel = this.state.panels[positionPanel];
    const titleBook = data.title;
    const authorBook = data.authors;
    const idBook = data.id;
    const urlBook = data.imageLinks['thumbnail'];
    const book = [];

    book['title'] = titleBook;
    book['author'] = authorBook;
    book['id'] = idBook;
    book['url'] = urlBook;

    panel.books.push(book);
    this.setState(currState => ({
      ...currState.panels[positionPanel] = panel
    }))
  }
  verifyIfExistPanel(panels, titleSearch) {
    return panels.filter(panel => panel.panelTitle === titleSearch).length > 0;
  }
  getPositionPanel(panels, titleSearch) {
    var positionPanel = -1;
    panels.map((panel, index) => {
      if (panel.panelTitle === titleSearch) {
        positionPanel = index;
      }
    })
    return positionPanel;
  }
  createPanel(datas) {
    this.clearState();
    this.setState({allBooks: datas});
    datas.map(data => {
      if (this.verifyIfExistPanel(this.state.panels, data.shelf)) {
        this.addBook(data);
      } else {
        this.addPanel(data);
        this.addBook(data);
      }
    })
  }

   changeBookShelf = async (idBook, shelf) => {
    await BooksAPI.update(idBook, shelf);
    const data = await BooksAPI.getAll();
    this.createPanel(data)
   }
 

  render() {
    return (
      <div className="app">
           <Route exact path='/search/' render={ () => (<Search datas={this.state.allBooks} changeBookShelf={this.changeBookShelf}/>)}/>
             <Route exact path='/' render={() => (
               
                <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {this.state.panels.map((panel, index) => (
                      
                        <Panel
                          changeBookShelf={this.changeBookShelf}
                          panelTitle={panel.panelTitle}
                          id={panel.id}
                          key={panel.id}
                          books={panel.books}
                        />
                      )
                    )}
                  </div>
                </div>
                <ButtonAdd /> 
              </div>
            )} />
      </div>
    )
  }
}

export default BooksApp