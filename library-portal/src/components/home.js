import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
export class Home extends React.Component {
    componentDidMount() {
        this.props.fetchBooksList();
    }
    render() {
        return (
            <div className="container-fluid" id="bookList">
            <h1>Welcome to Library Portal</h1>
                    <table className="table table-bordered table-hover mr-auto ml-auto col-sm-6">
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Book Author</th>
                            <th>Book Version</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.books.map((book)=>{
                        return(
                        <tr key={book._id}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.version}</td>
                            <td><button onClick={()=>this.props.selectBook(book)}><Link to="/editBook">EDIT</Link></button>/ 
                                <button onClick={()=>this.props.deleteBook(book)}>DELETE</button>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>                    
            </div>
        )
    }
}