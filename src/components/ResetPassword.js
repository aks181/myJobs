import React from 'react'
import { Link } from 'react-router-dom'
import TopNav from './home/TopNav'
import MainButton from './MainButton'
import './_signup.scss';

export default function ResetPassword() {
    return (
        <div>
            <TopNav goto='/signin' >
                <MainButton buttonText='Login/Signup' style ={{ background: '#43AFFF33 0% 0% no-repeat padding-box'}}></MainButton>   
            </TopNav>
            <form className="form">
                <h2>Reset Password</h2>
                <p>Enter your new Password below</p>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter your password" />
                <label htmlFor="password">Confirm Password</label>
                <input type="password" placeholder="Enter your password" />
                <Link to = "/signin">
                    <button type="submit">Reset</button>
                </Link>

            </form>
        </div>
    )
}
