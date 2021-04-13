import React, {useState} from 'react'
import Layout from './../core/Layout'
import toastr from 'toastr';
import 'toastr/build/toastr.css';

import {API_URL} from './../config'

const Signin = (props) => {

    const [user, setUser] = useState({
      
        email: '',
        password: ''
    })

    const handleChange = e =>{
        setUser({...user, [e.target.id]: e.target.value })
    }

    const submitSignin = e =>{
        e.preventDefault()

        fetch(`${API_URL}/signin`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)

        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                toastr.warning(res.error, 'Please Check Your Form!')
            }
            else{
                toastr.info ('User is authenticated Successfully', 'Welcome')
                localStorage.setItem('jwt_info', JSON.stringify(res))
                props.history.push('/')
               } 
        })
           
        .catch(err =>   toastr.warning(err, 'Server Error '))
    }

    const Form = () => (
       <form onSubmit={submitSignin}>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">Email</label>
                <input onChange={handleChange}  type="text" className="form-control" id="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-muted">Password</label>
                <input onChange={handleChange}  type="password" className="form-control" id="password"/>
            </div>
            <button className="btn btn-lg btn-block btn-outline-info">Sign In</button>
           </form>
    )
    return (
        <div>
           <Layout title="Sign In">
               <div className="row">
                   <div className="col-md-6 mx-auto">

                     { Form() }
                   </div>
                </div>
               

           </Layout>
        </div>
    )
}

export default Signin
