import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Header';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexFlow: 'wrap',
    
    width: '100%',
  },
  button: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    width: '48%',
    border: '1px solid aqua',
    padding: '0 1rem'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required')
    .max(20),
  lastName: yup
    .string()
    .required('Last Name is required')
    .max(20),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
});

export const FormUserDetails = ({ formData, setFormData, nextStep }) => {
  const [age, setAge] = React.useState('');

  const classes = useStyles();

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <>
      <Header title='King Tote' />
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
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Service Area</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={0}>select a service area</MenuItem>
                <MenuItem value={'Portland'}>Portland</MenuItem>
                <MenuItem value={'Portland'}>Portland</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              
            </FormControl>
            <FormControl className={classes.formControl}>
              <Field
                name='dropOff'
                label='Drop-off Zip Code'
                margin='normal'
                as={TextField}
                error={touched.firstName && errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Field
                name='pickUp'
                label='Pick-up Zip Code'
                margin='normal'
                as={TextField}
                error={touched.lastName && errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Continue
            </Button>
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
