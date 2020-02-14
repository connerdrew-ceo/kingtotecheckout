import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Header';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";



const useStyles = makeStyles(theme => ({
  introWrap: {
    padding: '0 2%',
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export const Scheduling = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
  

  return (
    <>
      <Header title='Enter Personal Details' step="Three"/>

      <div className="introWrap">
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
              <label className="boldLabel">25 Totes</label>
              <p>1 bedroom (250-500 sq ft)</p>
              <DayPicker />
            </div>

            <div className="formControl">
              <label className="boldLabel">35 Totes</label>
              <p>2 bedroom (250-500 sq ft)</p>
              <DayPicker />
            </div>

            

            <div className="formControl submitControl fullLenght">
              <button className="button global whiteBtn" type="submit" onClick={() => setDirection('back')}>
                <span>Previous</span>
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

Scheduling.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
