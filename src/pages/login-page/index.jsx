
import React, { useEffect } from 'react';
import {Helmet} from "react-helmet-async";
import { LoginForm, LoginFunctionality } from './components';
export default function Login() {
  
  return (
    <>
      <Helmet>
        <title>BJMP | Login</title>
      </Helmet>
    <div>
      <LoginForm/>
    </div>
    </>
    
  );
}

