import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

class Navbar extends Component {
    constructor() {
        super()
        this.state={
            showLogout:false
        }
        this.handleLogout=this.handleLogout.bind(this);
    }
    async handleLogout(){
        await this.props.dealLogout();
    }
    componentWillReceiveProps(someprops) {
        console.log(this.props.auth);
        if(this.props.auth===true)
        {
            this.setState({showLogout:true})
        }
        else
        {    
            this.setState({showLogout:false})
        }
      }
    render() {
        console.log('navbar rendered with ', this.props.auth);
    return (
        <div className="Navbar">
                <nav className="navbar navbar-expand-lg" >
                    <div className="navbar-brand">
                        <Link to='/'>BOOKLAND</Link>
                    </div>
                    <div className={this.state.showLogout?"navbar-item m-4":"navbar-item d-none"}>
                        <Link to="/home">Show Books List</Link>
                    </div>
                    <div className={this.state.showLogout?"navbar-item m-4":"navbar-item d-none"}>
                        <Link to='/addBook'>Add Book</Link>
                    </div>
                    <div className={this.state.showLogout?"navbar-item d-none":"navbar-item m-4"}>
                        <Link to='/signup'>Signup</Link>
                    </div>
                    <div className={this.state.showLogout?"navbar-item d-none":"navbar-item m-4"}>
                        <Link to='/login'>Login</Link>
                    </div>
                    <div className={this.state.showLogout?"navbar-item m-4":"navbar-item d-none"}>
                        <a onClick={this.handleLogout}>Logout</a>
                    </div>
                </nav>
        </div >
    )
    }
}

export default Navbar;