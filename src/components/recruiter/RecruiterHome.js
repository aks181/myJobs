import React, { useState, useEffect } from 'react'
import './_recruiterHome.scss'
import TopNav from '../home/TopNav'
import MainButton from '../MainButton'
import Modal from 'react-modal'
import JobList from './JobList';
import { Link } from 'react-router-dom';
import PostJob from './PostJob'

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },    
};



export default function RecruiterHome() {

    const [isOpen, setIsOpen] = useState(false);
    const [jobsPosted, setJobsPosted] = useState([]);
    const [applicants, setApplicants] = useState([])
    // const [jobCards, setJobCards] = useState([]);

    useEffect(() => {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        (dataFromLocalStorage && dataFromLocalStorage.userRole===0) ?
        (fetchData('https://jobs-api.squareboat.info/api/v1/recruiters/jobs', dataFromLocalStorage.token)) : window.location = '/';
    }, []);

    // function openModal() {
    //     setIsOpen(true);
    // }

    function closeModal() {
        setIsOpen(false);
    }

    const viewApplicants = (id) => {
        fetchApplicants('https://jobs-api.squareboat.info/api/v1/recruiters/jobs/' + id + '/candidates')
        .then(data => {
            //   console.log(data);
              if(data.data){
                setApplicants(data.data)
              }
              setIsOpen(true);
        }).catch((err)=>{
            console.log(err)
        });
    }
    
    function fetchData(url = '', token) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        
       fetch(url, {
        method: 'GET',
        headers: myHeaders,
        })
        .then((response) => response.json())
        .then(data => {
            //  console.log(data);
            setJobsPosted(data.data.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    async function fetchApplicants(url = '') {
        const myHeaders = new Headers();
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', dataFromLocalStorage.token);
        const response =  await fetch(url, { method: 'GET', headers: myHeaders });
        return response.json();
    }

    return (
        <div>
            <TopNav goto='/postjob' recruiterHome='true'>
                <MainButton className="topbtn" buttonText='Post a Job' style ={{ background: '#303f60 0% 0% no-repeat padding-box', border: '1px solid #303f60'}}></MainButton>   
            </TopNav>

            {jobsPosted.length === 0 ? 
                (<div className="zeroJobCards">
                    <p>Your posted jobs will show here!</p>
                    <div className="btn">
                        <Link to="/postjob">
                            <MainButton buttonText='Post a Job' style ={{ background: '#43AFFF 0% 0% no-repeat padding-box'}}></MainButton> 
                        </Link>
                    </div>
                </div>) : 
                (
                    <div className="content">
                        {window.location.pathname === '/postjob' ? <PostJob /> : null }
                        
                        <JobList jobsPosted={jobsPosted} viewApplicants={viewApplicants}/>

                        <Modal
                            isOpen={isOpen}
                            onRequestClose={closeModal}
                            style={customStyles}       
                        >
                            <h3>Applicants for this job</h3>

                            <div className="modalBody">
                            {applicants.map((data) => {
                                return (
                                    <div className="modal-card">
                                        <div className="upper">
                                            <p className="name">{data.name}</p>
                                            <p>{data.email}</p>
                                        </div>

                                        <div className="lower">
                                            <p><strong>Skills</strong></p>
                                            <p>{data.skills}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            </div>
                        </Modal>
git remote add origin https://github.com/aks181/myJobs.git
                    </div>
                )
                
            }

        </div>
    )
}