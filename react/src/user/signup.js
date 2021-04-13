import React, {useState} from 'react'
import Layout from './../core/Layout'
import toastr from 'toastr';
import 'toastr/build/toastr.css';

import {API_URL} from './../config'

const Signup = (props) => {

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const handleChange = e =>{
        setUser({...user, [e.target.id]: e.target.value })
    }

    const submitSignup = e =>{
        e.preventDefault()

        fetch(`${API_URL}/signup`, {
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
                toastr.success ('User is creacted Successfully', 'New Account')
                props.history.push('/signin')
               } 
        })
           
        .catch(err =>   toastr.warning(err, 'Server Error §'))
    }

    const Form = () => (
       <form onSubmit={submitSignup}>
            <div className="form-group">
                <label htmlFor="first_name" className="text-muted">First name</label>
                <input onChange={handleChange} type="text" className="form-control" id="first_name"/>
            </div>
            <div className="form-group">
                <label htmlFor="last_name" className="text-muted">Last name</label>
                <input onChange={handleChange}  type="text" className="form-control" id="last_name"/>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">Email</label>
                <input onChange={handleChange}  type="text" className="form-control" id="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-muted">Password</label>
                <input onChange={handleChange}  type="password" className="form-control" id="password"/>
            </div>
            <button className="btn btn-lg btn-block btn-outline-success">Sign Up</button>
         
        </form>
    )
    return (
        <div>
           <Layout title="Sign up">
               <div className="row">
                   <div className="col-md-6 mx-auto">

                     { Form() }
                   </div>
                </div>
               

           </Layout>
        </div>
    )
}

export default Signup
