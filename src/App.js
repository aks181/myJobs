import React from 'react';
import './_App.scss';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './components/home/Landing';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import PostJob from './components/recruiter/PostJob';
import RecruiterHome from './components/recruiter/RecruiterHome';
import CandidateHome from './components/candidate/CandidateHome';
// import AppliedJobs from './components/candidate/AppliedJobs';

const App = () => {
  return(
    <div>
      <BrowserRouter>
          <Route path="/" exact component={Landing} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signin/forgot" exact component={ForgotPassword} />
          <Route path="/signin/forgot/reset" exact component={ResetPassword} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/postjob" exact component={PostJob} />
          <Route path="/recruiterHome" exact component={RecruiterHome} />
          <Route path="/candidateHome" exact component={CandidateHome} />
          {/* <Route path="/appliedJobs" exact component={AppliedJobs} /> */}
      </BrowserRouter>  
    </div>
  );
}

export default App;
