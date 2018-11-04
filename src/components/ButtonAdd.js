import React from 'react'

function ButtonAdd(props) {
    return (
        <div className="open-search">
            <a onClick={() => props.changePage(true)}>Add a book</a>
        </div>
    )
}
export default ButtonAdd  