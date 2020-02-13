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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    border: '2px solid aqua',

  },
  button: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
                <MenuItem value={10}>select a service area</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Field
              name='dropOff'
              label='Drop-off Zip Code'
              margin='normal'
              as={TextField}
              error={touched.firstName && errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              name='pickUp'
              label='Pick-up Zip Code'
              margin='normal'
              as={TextField}
              error={touched.lastName && errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
            {/* <Field
              name='firstName'
              label='First Name *'
              margin='normal'
              as={TextField}
              error={touched.firstName && errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              type='email'
              name='email'
              label='Email *'
              margin='normal'
              as={TextField}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
            /> */}
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
