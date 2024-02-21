
import React, { useEffect } from 'react';
import {Helmet} from "react-helmet-async";
import { ForgotPassForm } from './components';
export default function ForgotPass() {
  
  return (
    <>
      <Helmet>
        <title>BJMP | Forgot Password</title>
      </Helmet>
    <div>
      <ForgotPassForm/>
    </div>
    </>
    
  );
}

