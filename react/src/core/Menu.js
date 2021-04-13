import React, {Fragment} from 'react'
import { Link, withRouter} from 'react-router-dom'
import {isAuthenticated} from './../auth/helpers'
import toastr from 'toastr'
import 'toastr/build/toastr.css'

import {API_URL} from './../config'


const isActive = (history, path) =>{
    if(history.location.pathname === path){
        return{ color: '#0040ff'}
    }
    else{
        return { color : '#fff'}
    }
}

const Menu = (props) =>{

  const signout = () =>{
    fetch(`${API_URL}/signout`)
    .then(()=>{
      toastr.info ('User SignOut', 'Next Time')
    })

    localStorage.removeItem('jwt_info')

   props.history.push('/signin')
    .catch()
  }

  
    return (
        <div>
   <nav className="navbar navbar-expand-lg navbar-dark bg-info">
  <Link className="navbar-brand" to="/">Carte - Youcodeur</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
        <Fragment>  
      <li className="nav-item active">
        <Link style={isActive(props.history,'/')} className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link >
      </li>
        <li className="nav-item active">
        <Link style={isActive(props.history,'/dashboard')} className="nav-link" to="/dashboard">Dashboard <span className="sr-only">(current)</span></Link >
      </li>
      </Fragment>
    
    </ul>
    <ul className="navbar-nav ml-auto">
     {!isAuthenticated() &&(
       <Fragment>
      <li className="nav-item">
        <Link style={isActive(props.history, '/signin')} className="nav-link" to="/signin">Connection</Link >
      </li>
      <li className="nav-item">
        <Link style={isActive(props.history, '/signup')} className="nav-link disabled" to="/signup">Register</Link >
      </li>
      </Fragment>
     )}
  
      {isAuthenticated() &&(
      <li className="nav-item">
        <span  className="nav-link disabled" style={{cursor: 'pointer'}} onClick={signout}>SignOut</span >
      </li>
      )}
    </ul>
    
  </div>
</nav>      
        </div>
    )
}

export default withRouter(Menu)
