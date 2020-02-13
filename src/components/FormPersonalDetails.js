import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Header';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  introWrap: {
    padding: '0 2%',
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export const FormPersonalDetails = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
  return (
    <>
      <Header title='Enter Personal Details' step="Two"/>
      <div className={classes.introWrap}>
        <h2>Order details</h2>
        <p>Please select the applicable option(s) bellow.</p>
      </div>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
        
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            

            <div className="formControl">
              <label for="dropOff">25 Totes</label>
              
            </div>
            <div className="formControl">
              <label for="pickUp">35 Totes</label>
              
            </div>
            <div className="formControl">
              
            </div>
            <div className="formControl submitControl">
              <button className="button global" type="submit" onClick={() => setDirection('back')}>
                <span>Prev</span>
              </button>

              <button className="button global">
                <span>Next</span>
              </button>
            
              
            </div>
          
          </Form>
        )}
      </Formik>
    </>
  );
};

FormPersonalDetails.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
