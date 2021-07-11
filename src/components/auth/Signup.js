import React, { useState } from 'react';
import { useFormik } from 'formik';
import './_signup.scss';
import TopNav from '../home/TopNav';
// import { Link } from 'react-router-dom';

const validate = values => {
    const errors = {};
  
    if (!values.fullName) {
      errors.fullName = 'The field is mandatory.';
    } else if (values.fullName.length > 25) {
      errors.fullName = 'Must be 25 characters or less.';
    }
  
    if (!values.email) {
      errors.email = 'The field is mandatory';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address.';
    }

    if(!values.password) {
        errors.password = 'Thie field is mandatory';
    } else if (values.password.length < 6) {
        errors.password = 'Must be atleast 6 characters.'
    }

    if(!values.password2) {
        errors.password2 = 'Thie field is mandatory';
    } else if (values.password2 !== values.password) {
        errors.password = 'Passwords do not match.'
    }
  
    return errors;
  };


export default function Signup() {

    const [role,setRole] = useState(0);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            password2: '',
            skills: ''
        },
        validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            // console.log(values.fullName)
                        
            postData('https://jobs-api.squareboat.info/api/v1/auth/register', {
                email: values.email,
                userRole: role, 
                password: values.password,
                confirmPassword: values.password2,
                name: values.fullName,
                skills: values.skills
            }).then(res => {
                
                if(res.data){
                    window.location = '/signin';
                    localStorage.setItem("name", res.data.data.name);
                    localStorage.setItem("email", res.data.data.email);
                    localStorage.setItem("id", res.data.data.id);
                    localStorage.setItem("token", res.data.data.token);
                    localStorage.setItem("userRole", res.data.data.userRole);
                    // window.alert('Sucess')
                }else{
                    window.alert('User Already Registered');
                    window.location = '/signin';
                }
                }).catch(err =>{
                    console.log(err)
                });
                
                
        }

    })
    
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
        <>
            <TopNav />
            <form className= "form" onSubmit = {formik.handleSubmit} >
                <h2>Signup</h2>
                <label htmlFor="wish">I'm a</label>
                <div className="btn-row">
                    <button 
                        type="button"
                        onClick={() => setRole(0)} 
                        style ={ role === 0 ? {background: '#43AFFF 0% 0% no-repeat padding-box', color: '#fff', border: '1px solid #43AFFF', borderRadius: '5px', opacity:'1'} : {background: '#E8E8E833 0% 0% no-repeat padding-box', border: '1px solid #C6C6C6', color: '#000', 
                        borderRadius: '5px', opacity:'1'}}>
                        Recruiter
                    </button>
                    
                    <button 
                        type="button"                
                        onClick={() => setRole(1)}
                        style ={ role === 1 ? {background: '#43AFFF 0% 0% no-repeat padding-box', color: '#fff', border: '1px solid #43AFFF', borderRadius: '5px', opacity:'1'} : {background: '#E8E8E833 0% 0% no-repeat padding-box', border: '1px solid #C6C6C6', color: '#000',
                        borderRadius: '5px', opacity:'1'}}
                        >Candidate
                    </button>
                </div>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" 
                    name="fullName" id ="fullName"
                    placeholder="Enter your full name"
                    value={formik.values.fullName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.fullName && formik.errors.fullName 
                    ? (<div className="errormsg">{formik.errors.fullName}</div>)
                    : null
                }

                <label htmlFor="email">Email Address</label>
                <input 
                    type="email" id="email" name="email" 
                    onChange={formik.handleChange} 
                    placeholder="Enter your email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email} 
                />
                {formik.touched.email && formik.errors.email 
                    ? (<div className="errormsg">{formik.errors.email}</div>)
                    : null
                }

                <label htmlFor="password">Create Password</label>
                <input 
                    type="password" id="password" name="password" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    placeholder="Enter your password"
                    value={formik.values.password} 
                />
                {formik.touched.password && formik.errors.password 
                    ? (<div className="errormsg">{formik.errors.password}</div>)
                    : null
                }

                <label htmlFor="password2">Confirm Password</label>
                <input 
                    type="password" id="password2" name="password2" 
                    placeholder="Enter your password"
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.password2} 
                />
                {formik.touched.password2 && formik.errors.password2 
                    ? (<div className="errormsg">{formik.errors.password2}</div>)
                    : null
                }

                <label htmlFor="skills">Skills</label>
                <input 
                    type="skills" id="skills" name="skills" 
                    placeholder="Enter comma separated skills"
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.skills} 
                />
                
                <button type="submit">Signup</button>
                
                
            </form>
        </>
    )

}

