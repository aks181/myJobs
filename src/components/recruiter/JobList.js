import React from 'react'
// import TopNav from '../home/TopNav'
// import MainButton from '../MainButton'
import JobCard from './JobCard'

export default function JobList({ jobsPosted, viewApplicants }) {
    return (
        <div>
            
            <ul style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent:'flex-start', padding: '0.5rem'}}>
                {
                    jobsPosted.map((data, index) => {
                        return(
                            <JobCard 
                                data ={data}
                                viewApplicants = {viewApplicants}
                                key = {index}                                
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}
