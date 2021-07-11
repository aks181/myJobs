import { useFormik } from 'formik'
import React from 'react'
import '../auth/_signup.scss'


const validate = (values) => {
    const errors = {};

    if(!values.jobTitle || !values.description || !values.location) {
        errors.jobTitle ='All fields are mandatory';
    } 
    return errors;
}

export default function PostJob() {
    
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('user'));

    const formik = useFormik({
        initialValues: {
            jobTitle: '',
            description: '',
            location: ''
        },
        validate,
        onSubmit: values => {
            // console.log(values)
            postData('https://jobs-api.squareboat.info/api/v1/jobs/', {
                title: values.jobTitle,
                description: values.description,
                location : values.location
            }, dataFromLocalStorage.token)
            .then(data => {
                if(data.data){                
                    window.location = '/recruiterHome';
                }else{
                    alert('Couldn\'t Post Job');
                }
            }).catch(err =>{
                console.log(err);
            });
        }            
        
    })

    async function postData(url = '', data = {}, token) {
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  token
          },
          redirect: 'follow', 
          body: JSON.stringify(data)
        });
        return response.json(); 
    }

    
    return (

        <div>
            <form className="form" onSubmit={formik.handleSubmit}>
                <h2>Post a job</h2>
                <label htmlFor="jobTitle">Job title</label>
                <input
                    type="text" name="jobTitle" id="jobTitle"
                    placeholder="Enter job title"
                    {...formik.getFieldProps('jobTitle')}
                ></input>
                
                <label htmlFor="description">Description</label>
                <textarea
                    name="description" id="description"
                    placeholder="Enter job description"
                    {...formik.getFieldProps('description')}
                ></textarea>
                
                <label htmlFor="title">Location</label>
                <input
                    type="text" id="location"
                    name="location"
                    placeholder="Enter job location"
                    {...formik.getFieldProps('location')}
                ></input>

                {(formik.touched.jobTitle && formik.touched.description && formik.touched.location && formik.errors.jobTitle) ? (
                    <div className="errormsg">{formik.errors.jobTitle}</div>
                ) : null}
                <button type="submit">
                    Post
                </button>
            </form>
            
        </div>
    )
}
