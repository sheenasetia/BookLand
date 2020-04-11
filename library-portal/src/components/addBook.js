import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect} from 'react-router-dom';
export class AddBook extends React.Component {
    constructor() {
        super();
        this.addBook=this.addBook.bind(this);
        this.state={
            redirectToHome:false
        }
    }
   
    addBook(event) {
        event.preventDefault();
        let nm=event.target.name.value
        let auth=event.target.author.value
        let ver=event.target.version.value
        const book= {
                name: nm,
                author: auth,
                version: ver,
        }
        setTimeout(() => {
            fetch('/books/addBook', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book)
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(res => {
                    alert(`New book: ${JSON.stringify(res)} added successfully`);
                    this.setState({ redirectToHome: true });
                    // this.props.history.push("/home");
                })
        })
        /*if(!idd || !namee || !authh) {
        alert("Fill all the details");
        return;
        }
        const obj={
            id:idd,
            name:namee,
            author:authh
        }
        if(obj===undefined)
        {
            alert("Already Existing")
            return;
        }
        fetch("/addBook",{
        method:"POST",
        headers: {
            "Content-Type" : "application/json" ,
        },
        body: JSON.stringify(obj)
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(res => {
            alert(`Book ${JSON.stringify(res)} updated successfully `)
            this.setState({redirectToHome:'true'});
            console.log(`Book updated successully`)
        })
        .catch(error => {
            console.error(`Error updating book: ${error}`)
        })*/
    }
    render() {
        if(this.state.redirectToHome===true)
            {
                return <Redirect to='/home' />
            }
        return (
            <div>
            <form onSubmit={this.addBook}>
            <h2>Add a Book</h2><br/>
            Book name : <input type="text" name="name" /><br/><br/>
            Book author : <input type= "text" name="author" /><br/><br/>
            Book version : <input type= "text" name="version" /><br/><br/>
            <input type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}