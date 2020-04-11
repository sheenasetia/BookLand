import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Navbar extends Component{
    render(){
        return (
          <React.Fragment>
            <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
   {/* eslint-disable-next-line */}
  <a className="navbar-brand" href="#">Library-Portal</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
      {/* eslint-disable-next-line */}
        <a className="nav-link" href="#">ADD BOOKS</a>
      </li>
    </ul>
  </div>

</nav>
</div>
</React.Fragment>
        )
    }
}

export default Navbar;