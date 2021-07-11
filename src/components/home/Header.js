import React from 'react';
import './_header.scss';
import MainButton from './MainButton';
import { Link } from 'react-router-dom';
import TopNav from './TopNav';

const Header = () => {
    return (
        <div>
            <TopNav goto='/signin' >
                <MainButton style ={{ background: '#43AFFF33 0% 0% no-repeat padding-box'}} buttonText='Login/Signup'></MainButton>   
            </TopNav>            
            <div className="heading">
                <div className="heading__left">
                    <span>Welcome to My<span className="jobs">Jobs</span></span>
                    <Link style={{marginTop: '5rem'}} to="/signup">
                        <MainButton style ={{ background: '#43AFFF 0% 0% no-repeat padding-box'}} buttonText= 'Get Started' />
                    </Link>
                </div>
                <div className="heading__right">
                    <img className= "" src="work.jpg" alt="MyJobs pic" />
                </div>
            </div>
        </div>
    )
}

export default Header;
