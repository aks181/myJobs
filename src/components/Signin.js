import { Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import TopNav from './home/TopNav';
import './_signup.scss';

export default function Signin() {
   
    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify(data)
        });
        return response.json(); 
    }    
    
    return (

        <Formik 
            initialValues = {{email: '', password: ''}}
            
            validationSchema= {Yup.object({
                email: Yup.string().email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .required('Required')    
                    .min(6, 'Must be 6 characters or more')
            })} 

            onSubmit = {values => {
                // alert(JSON.stringify(values, null, 2));
                // console.log(values.email);
                postData('https://jobs-api.squareboat.info/api/v1/auth/login', {
                    email: values.email,
                    password: values.password
                }).then(data => {
                    
                    if(data.data.userRole === 0){
                        localStorage.setItem("user", JSON.stringify(data.data));
                        window.location = '/recruiterHome';
                        
                    }else if(data.data.userRole === 1){
                        localStorage.setItem("user", JSON.stringify(data.data));
                        window.location = '/candidateHome';
                    }
                }).catch((err)=>{
                    console.log(err)
                });
            }}
        >

        {formik => (
            <div>
                <TopNav />
                <form className="form" onSubmit= {formik.handleSubmit}>
                    <h2>Login</h2>

                    <label>Email Address</label>
                    <input name="email" id="email" type="email" placeholder="Enter your email" 
                    {...formik.getFieldProps('email')} 
                    />   
                    {formik.touched.email && formik.errors.email ? (
                        <div className="errormsg">{formik.errors.email}</div>
                    ) : null}

                    <label>Password</label>
                    <input name="password" id="password" type="password" placeholder="Enter your password" {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="errormsg">{formik.errors.password}</div>
                    ) : null}

                    <span>
                        <Link to="/signin/forgot">Forgot your password?</Link>
                    </span>

                    <button type="submit">Login</button>
                    <p>
                        New to MyJobs ?{" "}
                        <Link to="/signup">
                        <span>Create Account</span>
                        </Link>
                    </p>
                </form>
            </div>
        )}
        </Formik>
    )
    
}
