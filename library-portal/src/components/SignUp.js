import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './styling.css';
class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false
        }
    }

    render() {

        if (this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <form onSubmit={this._addUser}>
                    <div className="form">
                        <div className="form-group col-md-12">
                            <label>Name</label>
                            <input type="text" ref="name" className="form-control" required></input>
                        </div>
                        <div className="form-group col-md-12">
                            <label>Age</label>
                            <input type="number" ref="age" className="form-control"></input>
                        </div>
                        <div className="form-group col-md-12">
                            <label>UserName</label>
                            <input type="text" ref="userName" className="form-control" required></input>
                        </div>
                        <div className="form-group col-md-12">
                            <label>Password</label>
                            <input type="password" ref="password" className="form-control" required></input>
                        </div>
                        <button type="submit" >Sign Up</button>
                    </div>
                </form>
            </div >
        )
    }

    _addUser = (event) => {
        event.preventDefault();
        let user = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            userName: this.refs.userName.value,
            password: this.refs.password.value,
            
        }

        fetch('/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(res => {
               // console.log(`User added successfully: ${res}`)
                alert('User created successfully')
                this.setState({ redirectToHome: true });
            })
            .catch(err => {
                console.log(err);
                alert('Error creating user')
            })
    }
}

export default SignUp;