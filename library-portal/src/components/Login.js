import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Login extends Component {

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
                            <label>UserName</label>
                            <input type="text" ref="userName" className="form-control" required></input>
                        </div>
                        <div className="form-group col-md-12">
                            <label>Password</label>
                            <input type="password" ref="password" className="form-control" required></input>
                        </div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div >
        )
    }

    _addUser = (event) => {
        event.preventDefault();
        let user = {
            userName: this.refs.userName.value,
            password: this.refs.password.value
        }

        fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if(res.ok) return res.json()
                else throw new Error()
            })
            .then(res => {
                console.log(`User added successfully: ${res}`)
                this.props.makeAuthentication();
                this.setState({ redirectToHome: true });
            })
            .catch(err => {
                console.log(err);
                alert('Bad Login Credentials');
            })
    }
}

export default Login;