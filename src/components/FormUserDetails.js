import React from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';


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

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <>
      <Header title='Enter Personal Details' step="One" />

      <div className="introWrap">
        <h2>Welcome</h2>
        <p>Get started by selecting a service area to verify we service your zip codes.</p>
      </div>

      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="formControl">
              <label htmlFor="nameImput">Service Area</label>
              <select id="cars">
                <option value="0">select a service area</option>
                <option value="Portland">Portland</option>
                <option value="Portland">Portland</option>
                <option value="Portland">Portland</option>
              </select>
            </div>
            <div className="formControl"></div>

            <div className="formControl">
              <label htmlFor="dropOff">Drop-off Zip Code</label>
              <input type="text" name="name" placeholder="zip code" className="form-control" id="nameImput" />
            </div>
            <div className="formControl">
              <label htmlFor="pickUp">Pick-up Zip Code</label>
              <input type="text" name="name" placeholder="zip code" className="form-control" id="nameImput" />
            </div>
            <div className="formControl">
              <label htmlFor="locationType">Location type</label>
              <div className="ratioWrap">
                <input type="radio" id="locationResidential" name="location" value="0"/>
                <label htmlFor="locationResidential">Residential</label>
              </div>
              <div className="ratioWrap">
                <input type="radio" id="locationCommertial" name="location" value="0"/>
                <label htmlFor="locationCommertial">Commertial</label>
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


// const mapStateToProps = state => {
//   return{
//     localCounter: state.counter
//   }
// }

// const mapDispatchToProps = state => {
//   return{
//     onIncrementCounter: () => dispatch({type: 'INCREMENT'})
//   }

// }


// export default connect(mapStateToProps, mapDispatchToProps)(FormUserDetails);