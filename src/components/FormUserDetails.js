import React, {useState} from 'react';
import PropTypes, { number } from 'prop-types';
import { Header } from './Header';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux'
import * as yup from 'yup';


const validationSchemaFirstStep = yup.object({
  serviceArea: yup
    .string()
    .required('Service Area is required'),
    
  dropOff: yup
    .string()
    .required('Drop off is required'),
    
  pickUp: yup
    .number()
    .required('Pick up is required'),
});

const regexp = /^[0-9\b]+$/

// function validateUsername(value) {
//   let error;
//   if (value === 'admin') {
//     error = 'Nice try!';
//   }
//   return error;
// }

export const FormUserDetails = ({ formData, setFormData, nextStep }) => {

  const [dropOffCode, setDropOffCode] = useState(formData.dropOff)
  const handleChange = event => {
    (regexp.test(event.target.value)) ? setDropOffCode(event.target.value) : setDropOffCode('')
  };

  const [pickUpCode, setPickUpCode] = useState(formData.pickUp)
  const handleChangePickUp = event => {
    (regexp.test(event.target.value)) ? setPickUpCode(event.target.value) : setPickUpCode('')
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
          console.log('Values: ', values)
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchemaFirstStep}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="formControl">
              <label htmlFor="nameImput">Service Area</label>
              <Field 
                as="select" 
                name="serviceArea"
                error={touched.serviceArea && errors.serviceArea}
              >
                <option value="0">select a service area</option>
                <option value="red">Portland</option>
                <option value="green">Portland</option>
                <option value="blue">Portland</option>
              </Field>
              {errors.serviceArea && touched.serviceArea && <div>{errors.serviceArea}</div>}
            </div>
            <div className="formControl">
              {/* <Field name="username" validate={validateUsername} />
                {errors.username && touched.username && <div>{errors.username}</div>} */}
            </div>
            <div className="formControl">
              <label htmlFor="dropOff">Drop-off Zip Code</label>
              <Field 
                name='dropOff' 
                placeholder="zip code"
                type="number"
                />
                {errors.dropOff && touched.dropOff && <div>{errors.dropOff}</div>}
              
            </div>
            <div className="formControl">
              <label htmlFor="pickUp">Pick-up Zip Code</label>
              <Field 
                name='pickUp' 
                placeholder="zip code"
                type="number"
                />
                {errors.pickUp && touched.pickUp && <div>{errors.pickUp}</div>}
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

// FormUserDetails.propTypes = {
//   formData: PropTypes.object.isRequired,
//   setFormData: PropTypes.func.isRequired,
//   nextStep: PropTypes.func.isRequired
// };


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