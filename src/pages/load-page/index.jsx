
import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoadForm from './components';

export default function Load() {
  return (
    <>
      <div>
        <Helmet>
          <title>BJMP | Load</title>
        </Helmet>
        <LoadForm/>
      </div>
    </>
  );
}

