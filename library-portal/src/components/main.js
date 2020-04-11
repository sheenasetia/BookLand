import React from 'react';
import {Home} from './home';
import {AddBook} from './addBook';
import Navbar from './navbar';
import {EditBook} from './editBook';
import 'bootstrap/dist/css/bootstrap.css';
import { Link , Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { PageNotFound } from './pageNotFound';
import SignUp from './SignUp';
import Login from './Login';
import Welcome from './welcome';
export class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            books:[],
            selectedBook:"",
            isAuth:false
        }
        this.selectBookFun=this.selectBookFun.bind(this);
        this.dealLogout=this.dealLogout.bind(this);
        this.makeAuthentication=this.makeAuthentication.bind(this);
    }

    componentDidMount() {
        console.log("Component is mounted");
    }

    fetchBooksList = () => {
        fetch('/books')
        .then(res => {
            if(res.ok)
            return res.json()
        })
        .then(res => {
            console.log(res);
            this.setState({ books: res });
            console.log(this.state.books)
        })
        .catch(res => {
            console.log(`The error is : ${JSON.stringify(res)}`)
        })

           
    }


    async dealLogout() {
        await this.setState({isAuth:false});
        try {
            let response = await fetch("/users/logout",{
                method:"GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if (response.ok) {
                await this.setState({isAuth:false});
            }
          } catch(err) {
            // catches errors both in fetch and response.json
            alert(err);
          }
    }
    
    deleteBook = (book) => {
    console.log(`Book to be delete is: ${JSON.stringify(book)}`)
    console.log(this);

        fetch(`/books/deleteBook?id=${book._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(`${book} is deleted`);
                    this.fetchBooksList();
                    // return res.json()
                }
            })
            .catch(error => {
                console.log(`The error is: ${error}`)
            })
    }
 /*remove(book) {
            fetch(`/deleteBook/${book.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (res.ok) {
                    alert(`Deleting book id : ${book.id}`);
                    this.fetchBooksList();
                }
            })
      }
*/
    selectBookFun(book) {
        this.setState({
            selectedBook:book
        })
    } 

    async makeAuthentication() {
        await this.setState({
            isAuth:true
        })
    }

    render() {
        console.log('main rendered',this.state.isAuth);
        return (
            <div className="container-fluid">
                <div id="main" className="row">
                    <div className="col">  {/* col-12 */}
                        <Navbar dealLogout={this.dealLogout} auth={this.state.isAuth}/>
                    </div>
                </div>
                <div className="row">
                    <Switch>
                        <Route exact path="/" render={ this.state.isAuth!==true?()=>( <Welcome/>):()=>( <Home books={this.state.books} selectBook={(book)=>{this.selectBookFun(book)}} deleteBook={(book)=>{this.deleteBook(book)}} fetchBooksList={this.fetchBooksList}/>)}/>
                        <Route exact path="/home" render={ this.state.isAuth!==true?()=>( <Welcome/>):()=>( <Home books={this.state.books} selectBook={(book)=>{this.selectBookFun(book)}} deleteBook={(book)=>{this.deleteBook(book)}} fetchBooksList={this.fetchBooksList}/>)} ></Route>
                        <Route exact path="/editBook" render={ this.state.isAuth!==true?()=>( <Welcome/>):()=>( <EditBook book={this.state.selectedBook} />)} ></Route>
                        <Route exact path="/addBook" render={this.state.isAuth!==true?()=>( <Welcome/>):()=>( <AddBook/>) }/>
                        <Route path="/signup" render={(props) => <SignUp />} />
                        <Route path="/login" render={(props) => <Login makeAuthentication={this.makeAuthentication}/>} />
                        <Route render={()=>(<PageNotFound/>)}></Route>
                    </Switch> 
                </div>
            </div>
        )
    }
}