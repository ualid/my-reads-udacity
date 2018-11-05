import React from 'react'
import Book from './Book'

class Panel extends React.Component {

    state = {
        panels: [
            {
                books: [{

                }],
                panelTitle: ''
            }
        ]
    }

    componentWillMount() {
        this.props.data.then(
            data =>
                this.createPanel(data)
        )
    }

    addPanel(data) {
        const panel =
        {
            books: [{

            }],
            panelTitle: data.shelf
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
        datas.map((data, index) => {
            if (this.verifyIfExistPanel(this.state.panels, data.shelf)) {
                this.addBook(data)
            } else {
                this.addPanel(data)
                this.addBook(data)
            }
        })
    }

    render() {
        return (
            this.state.panels.map((panel, index) => (
                panel.panelTitle !== '' &&
                (<div className="bookshelf" key={index}>
                    <h2 className="bookshelf-title">{panel.panelTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">

                            {panel.books.map((book, index) => (
                                book.id !== undefined && (
                                    <li key={index}>
                                        <Book
                                            key={book.id}
                                            image={book.url}
                                            title={book.title}
                                            author={book.author}
                                        />
                                    </li>
                                )
                            ))}

                        </ol>
                    </div>
                </div>)

            ))
        )
    }
}

export default Panel