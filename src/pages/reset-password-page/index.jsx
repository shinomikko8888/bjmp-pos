
import React, { useEffect } from 'react';
import {Helmet} from "react-helmet-async";
import { ResetPassForm } from './components';
export default function ForgotPass() {
  
  return (
    <>
      <Helmet>
        <title>BJMP | Reset Password</title>
      </Helmet>
    <div>
      <ResetPassForm/>
    </div>
    </>
    
  );
}

