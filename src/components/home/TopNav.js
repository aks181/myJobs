import React from 'react';
import './_topNav.scss'
import { Link } from 'react-router-dom';



export default function TopNav(props) {
    return (
        <div>
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    <h2>My<span className="jobs">Jobs</span></h2>
                </Link>
                <div className="right menu">
                    <Link to= {props.goto} className="item">
                        {props.children}
                    </Link>  
                    {props.recruiterHome
                    ?  (<Link to= '/' className="item">
                        <button className="medium ui button">
                            Logout
                        </button>
                        </Link>)
                    : null}             
                </div>
            </div>
        </div>
    )
}
