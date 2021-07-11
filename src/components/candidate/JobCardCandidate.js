import React from 'react';
import { baseURL } from '../../config/Api';
import '../recruiter/_jobcard.scss';


export default function JobCardCandidate({ data, jobsApplied }) {
    
    const applyToJob = ( id )=>{
        postData( baseURL + '/candidates/jobs', {
            jobId : id
        }).then(data => {
            window.alert('Applied sucessfully!');
            window.location = '/candidateHome'            
        }).catch((err)=>{
            console.log(err)
        });
    } 
    
    async function postData(url = '', data = {}) {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': dataFromLocalStorage.token
          },
          redirect: 'follow',
          body: JSON.stringify(data)
        });
        return response.json(); 
    }
    
    return (
        <div>
            
            <div className="jobcard">
                <h3 className="title">{data.title}</h3>
                <p className="description">{data.description}</p>
                <div className="bottom">
                    <i className="map marker alternate icon"></i>
                    <span className="location">{data.location}</span>
                    {!jobsApplied ? 
                        (<button className="view" onClick={()=> applyToJob(data.id)}>
                            Apply
                        </button>) : null               
                    }
                </div>
            </div>
        
        </div>
    )
}
