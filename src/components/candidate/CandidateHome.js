import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TopNav from '../home/TopNav'
import MainButton from '../home/MainButton'
// import JobCard from '../recruiter/JobCard';
// import JobList from '../recruiter/JobList';
import JobCardCandidate from './JobCardCandidate';
import '../recruiter/_recruiterHome.scss';
import '../candidate/_candidateHome.scss';
import { baseURL, fetchData } from '../../config/Api';


export default function CandidateHome() {

    const [allJobs, setAllJobs] = useState([]);
    const [jobsApplied, setJobsApplied] = useState(true);
 
    useEffect(() => {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        if(dataFromLocalStorage && dataFromLocalStorage.userRole === 1){
          fetchData( baseURL + '/candidates/jobs', dataFromLocalStorage.token)
          .then((data) => {
            setAllJobs(data.data);
            setJobsApplied(value => !value);
            })
        }else{
          window.location = '/';
        }
    }, []);
    

    const getAppliedJobs = () => {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        if(jobsApplied === false){
            fetchData( baseURL + '/candidates/jobs/applied', dataFromLocalStorage.token)
            .then((data) => {
                setAllJobs(data.data);
                setJobsApplied(value => !value);
            })
        }else{
            fetchData( baseURL + '/candidates/jobs', dataFromLocalStorage.token)
            .then((data) => {
                setAllJobs(data.data);
                setJobsApplied(value => !value);
            })
        }
    }

    return (

        <div>
            
            <TopNav goto='/candidateHome' recruiterHome='true'>
                {/* <MainButton className="topbtn" buttonText='Applied Jobs' style ={{ background: '#303f60 0% 0% no-repeat padding-box', border: '1px solid #303f60'}}></MainButton>    */}
                <button className="btn-applied"  style ={{ background: '#303f60 0% 0% no-repeat padding-box', border: '1px solid #303f60'}}
                onClick={getAppliedJobs} >{jobsApplied ?'All Jobs': 'Applied Jobs'}</button>
            </TopNav>
            
            {jobsApplied.length === 0 ? 
                ( <div className="candidateHome">
                    <h2>Jobs applied by you</h2>
                    <div className="zeroJobCards">
                        <p>Your applied jobs will show here!</p>
                        <div className="btn">
                            <Link to="/candidateHome">
                                <MainButton buttonText='See all jobs' style ={{ background: '#43AFFF 0% 0% no-repeat padding-box'}}></MainButton> 
                            </Link>
                        </div>
                    </div>
                </div> ) : 
                (   
                    <div>
                        <h2>{jobsApplied ?'Jobs Applied by you': 'Jobs for you'}</h2>
                        <div className="content" style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent:'flex-start', padding: '0.5rem'}}>                       
                            {allJobs.map((data, index)=>{
                                return <JobCardCandidate jobsApplied={jobsApplied} data= {data} key={index}/>
                            })}
                            {/* <JobList jobsPosted={jobsPosted} viewJobs={viewJobs}/> */}

                        </div>
                    </div>
                )
                
            }
        </div>
    )
}
