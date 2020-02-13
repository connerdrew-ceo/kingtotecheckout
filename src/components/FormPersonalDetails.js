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

            <div className="formControl fullLenght">
              <label className="boldLabel">25 Totes</label>
              <p>1 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes">
                <div className="eachToteItem">
                  <p>1 Week rental</p>
                  <span className="price">$90</span>
                </div>
                <div className="eachToteItem">
                  <p>2 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem">
                  <p>3 Week rental</p>
                  <span className="price">$145</span>
                </div>
                <div className="eachToteItem">
                  <p>4 Week rental</p>
                  <span className="price">$170</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">35 Totes</label>
              <p>2 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes">
                <div className="eachToteItem">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem">
                  <p>4 Week rental</p>
                  <span className="price">$230</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">50 Totes</label>
              <p>3 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes">
                <div className="eachToteItem">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem">
                  <p>4 Week rental</p>
                  <span className="price">$230</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">70 Totes</label>
              <p>4 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes">
                <div className="eachToteItem">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem">
                  <p>4 Week rental</p>
                  <span className="price">$230</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
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
