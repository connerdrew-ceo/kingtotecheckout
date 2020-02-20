import React from 'react';
import { Button } from '@material-ui/core';
import { Header } from './Header';

export const Confirm = ({ formData, prevStep, nextStep }) => {
  return (
    <>
      <Header title='Confirm User Data' step="Five"/>
      <div>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        <div className="hola">
          <Button
            color='secondary'
            variant='contained'
            onClick={() => prevStep()}
          >
            Back
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={() => nextStep()}
          >
            Confirm & Continue
          </Button>
        </div>
      </div>
    </>
  );
};

