import React from 'react';
import './_jobcard.scss';

export default function JobCard({ data , viewApplicants }) {
    return (
        <div>
            <div className="jobcard">
                <h3 className="title">{data.title}</h3>
                <p className="description">{data.description}</p>
                <div className="bottom">
                    <i className="map marker alternate icon"></i>
                    <span className="location">{data.location}</span>
                    <button className="view" onClick={()=> viewApplicants(data.id)}>
                        View Applicants
                    </button>
                </div>
            </div>
        </div>
    )
}
