import React from 'react'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import TopNav from './home/TopNav';
import MainButton from './MainButton';
import './_signup.scss';

const validate = values => {
    const errors = {};
 
    if (!values.email) {
      errors.email = 'The field is mandatory';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address.';
    }

    return errors;
  };

export default function ForgotPassword() {

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            postData('https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email='+values.email)
                .then(data => {
                   window.location = '/login'
                }).catch((error)=>{
                    console.log(error);
                });
        }

    })

    async function postData(url = '') {
        const response = await fetch(url);
        return response.json(); 
    }

    return (
        <div>
            <TopNav goto='/signin' >
                <MainButton buttonText='Login/Signup' style ={{ background: '#43AFFF33 0% 0% no-repeat padding-box'}}></MainButton>   
            </TopNav>
            <form className="form" onSubmit = {formik.handleSubmit} >
                <h2>Forgot your password?</h2>
                <p>
                Enter the email associated with your account and we’ll send you instructions to reset your password.
                </p>
                <label htmlFor="email">Email Address</label>
                <input 
                    type="email" id="email" name="email" 
                    placeholder="Enter your email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email 
                ? (<div className="errormsg">{formik.errors.email}</div>)
                : null
                }
                <Link to = "/signin/forgot/reset">
                    <button type="submit">Submit</button>
                </Link>
            </form>
        </div>
    )
}

