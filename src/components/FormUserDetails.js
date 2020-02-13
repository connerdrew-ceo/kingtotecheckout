import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import * as yup from 'yup';

import mainLogo from '../images/kt_logo_150.png'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  
  formControl: {
    margin: theme.spacing(1),
    width: '44%',
    padding: '0 2%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  introWrap: {
    padding: '0 2%',
  }
}));

const validationSchema = yup.object({
  serviceArea: yup
    .string(),
    
  dropOff: yup
    .string()
    .required('Drop off is required')
    .max(20),
    
  pickUp: yup
    .string()
    .required('Pick up is required')
    .max(20),
});


export const FormUserDetails = ({ formData, setFormData, nextStep }) => {
  const [age, setAge] = React.useState('');

  const classes = useStyles();

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <>

      <div className="headerComponent">

        <a href="/">
          <img src={mainLogo} alt="golf"/>
        </a>

        <div className="stepWrap first">
          <div className="eachStep first"></div>
          <div className="eachStep"></div>
          <div className="eachStep"></div>
          <div className="eachStep"></div>
          <div className="eachStep"></div>
        </div>
      </div>
      
      <div className={classes.introWrap}>
        <h2>Welcome</h2>
        <p>Get started by selecting a service area to verify we service your zip codes.</p>
      </div>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <div className="formControl">
              <label for="nameImput">Service Area</label>
              <select id="cars">
                <option value="0">select a service area</option>
                <option value="Portland">Portland</option>
                <option value="Portland">Portland</option>
                <option value="Portland">Portland</option>
              </select>
            </div>
            <div className="formControl"></div>

            <div className="formControl">
              <label for="dropOff">Drop-off Zip Code</label>
              <input type="text" name="name" placeholder="zip code" className="form-control" id="nameImput" />
            </div>
            <div className="formControl">
              <label for="pickUp">Pick-up Zip Code</label>
              <input type="text" name="name" placeholder="zip code" className="form-control" id="nameImput" />
            </div>
            <div className="formControl">
              <label for="locationType">Location type</label>
              <div className="ratioWrap">
                <input type="radio" id="female" name="gender" value="female"/>
                <label for="female">Residential</label>
              </div>
              <div className="ratioWrap">
                <input type="radio" id="other" name="gender" value="other"/>
                <label for="other">Commertial</label>
              </div>
            </div>
            <div className="formControl submitControl">
              <button className="button global" name="submit" type="submit">
                <span>Next</span>
              </button>
            </div>
          
          </Form>
        )}
      </Formik>
    </>
  );
};

FormUserDetails.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
