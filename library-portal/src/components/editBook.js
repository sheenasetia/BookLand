import React from 'react';
import {Redirect} from 'react-router-dom';
export class EditBook extends React.Component {
    constructor() {
        super();
        this.editBook=this.editBook.bind(this);
        this.state={
            redirectToHome:false
        }
    }
    editBook(event){
        event.preventDefault();
        let book = {
            _id: this.props.book._id,
            name: this.refs.name.value,
            author: this.refs.author.value,
            version: this.refs.version.value,
        }
        console.log('Updating book')
        fetch(`/books/updateBook`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(res => {
                alert(`Book ${res} updated successfully `)
                console.error(`Book updated successully`)
                this.setState({ redirectToHome: true });
            })
            .catch(error => {
                console.error(`Error updating book: ${error}`)
            })
    }
    render() {
        if(this.state.redirectToHome===true)
        {
           return <Redirect to='/home' />
        }
        return (
            <div>
                <form onSubmit={this.editBook}>
                <h2>Book ready to Edit</h2><br/>
                    Book name : <input type="text" ref="name" defaultValue={this.props.book.name} /><br/><br/>
                    Book author : <input type="text" ref="author" defaultValue={this.props.book.author} /><br/><br/>
                    Book version : <input type="text" ref="version" defaultValue={this.props.book.version} /><br/><br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }

}