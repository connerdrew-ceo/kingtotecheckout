import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { Header } from './Header';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const validationSchemaFourthStep = yup.object({
  firstNameFiled: yup
    .string()
    .required('First name is required'),
  lastNameField: yup
    .string()
    .required('Last name is required'),
  telField: yup
    .string()
    .required('Telephone is required'),
  emailField: yup
    .string()
    .required('Telephone is required'),
  addressDropOffField: yup
    .string()
    .required('Address is required'),
  cityDropOffField: yup
    .string()
    .required('City is required'),
  stateDropOffField: yup
    .string()
    .required('State is required'),

  addressPickUpField: yup
    .string()
    .required('Address is required'),
  cityPickUpField: yup
    .string()
    .required('City is required'),
  statePickUpField: yup
    .string()
    .required('State is required'),

    
    

    
});
const validateZipCode = value => {

  let stringValue = value + ''
  let error;
    if (!value) {
      error = 'Drop off required';
    } else if (stringValue.length > 5) {
      error = 'postal code is 5 digits';
    } else if (stringValue.length < 5) {
      error = 'postal code is 5 digits';
    }
    return error;
};
export const AddressFormStep = ({
    formData,
    setFormData,
    nextStep,
    prevStep
    }) => {
    const [direction, setDirection] = useState('back');
    
  return (
    <>
      <Header title='Enter Personal Details' step="Four" />
      <div className="introWrap">
        <h2>Your Details</h2>
        <p>Please fill out your contact information as Delivery and Pick-Up addresses</p>
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </div>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
          console.log('AddressFormStep submit >>>> ', values)
        }}
        validationSchema={validationSchemaFourthStep}
        >
        {({ errors, touched }) => (
          <Form>
            <div className="formControl">
                <h3>Main Contact Information</h3>
                <label htmlFor="firstNameInput">First Name</label>
                <Field 
                  id="firstNameInput"
                  name='firstNameFiled' 
                  placeholder="Jane"
                  />
                {errors.firstNameFiled && touched.firstNameFiled && <div className="errorMessage">{errors.firstNameFiled}</div>}
            </div>
            <div className="formControl">
            </div>
            <div className="formControl">
                <label htmlFor="lastNameInput">Last Name</label>
                <Field 
                  id="lastNameInput"
                  name='lastNameField' 
                  placeholder="Doe"
                  />
                  {errors.lastNameField && touched.lastNameField && <div className="errorMessage">{errors.lastNameField}</div>}
            </div>
            <div className="formControl">
            </div>
            <div className="formControl">
                <label htmlFor="telInput">Phone</label>
                <Field 
                  id="telInput"
                  name='telField' 
                  placeholder="(555) 555 555"
                  type="tel"
                  />
                  {errors.telField && touched.telField && <div className="errorMessage">{errors.telField}</div>}
            </div>
            <div className="formControl">
            </div>
            <div className="formControl">
                <label htmlFor="emailInput">Email</label>
                <Field 
                  id="emailInput"
                  name='emailField' 
                  placeholder="hello@hello.com"
                  type="email"
                  />
                  {errors.emailField && touched.emailField && <div className="errorMessage">{errors.emailField}</div>}
            </div>
            <div className="formControl">
            </div>
            <div className="formControl">
                <h3>Drop-off Address</h3>
                <label htmlFor="addressDropOffImput">Street Address</label>
                <Field 
                  id="addresslDropOffInput"
                  name='addressDropOffField' 
                  placeholder="Street Address"
                  />
                  {errors.addressDropOffField && touched.addressDropOffField && <div className="errorMessage">{errors.addressDropOffField}</div>}
            </div>
            <div className="formControl">
                <h3>Drop-off Contact</h3>
              <div className="ratioWrap">
                <Field 
                  name='sameAsMainContactDropOff' 
                  type="checkbox"
                  />
                <label htmlFor="locationResidential">Same as Main Contact Info</label>
              </div>
            </div>

            <div className="formControl">
                <label htmlFor="cityDropOffImput">City</label>
                <Field 
                  id="cityDropOffInput"
                  name='cityDropOffField' 
                  placeholder="city"
                  />
                  {errors.cityDropOffField && touched.cityDropOffField && <div className="errorMessage">{errors.cityDropOffField}</div>}
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="stateDropOffImput">State</label>
                <Field 
                  id="stateDropOffInput"
                  name='stateDropOffField' 
                  placeholder="state"
                  />
                  {errors.stateDropOffField && touched.stateDropOffField && <div className="errorMessage">{errors.stateDropOffField}</div>}
            </div>
            <div className="formControl"></div>
            <div className="formControl">
              <label htmlFor="dropOff">Zip Code</label>
              <Field 
                name='zipCodeDropOff' 
                placeholder="zip code"
                type="number"
                validate={validateZipCode}
                />
                {errors.zipCodeDropOff && touched.zipCodeDropOff && <div className="errorMessage">{errors.zipCodeDropOff}</div>}
            </div>
            <div className="formControl"></div>

            <div className="formControl">
              <label htmlFor="dropOff">Additional Information</label>
              <Field 
                name='textareaDropOff' 
                placeholder="Additional notes, special instructions, gate code, etc"
                component="textarea"
                />
                {errors.textareaDropOff && touched.textareaDropOff && <div className="errorMessage">{errors.textareaDropOff}</div>}
            </div>
            <div className="formControl"></div>
            
            <div className="formControl">
                <h3>Pick-up Address</h3>
                <label htmlFor="addressPickUpImput">Street Address</label>
                <Field 
                  id="addresslPickUpInput"
                  name='addressPickUpField' 
                  placeholder="Street Address"
                  />
                  {errors.addressPickUpField && touched.addressPickUpField && <div className="errorMessage">{errors.addressPickUpField}</div>}
            </div>
            <div className="formControl">
                <h3>Drop-off Contact</h3>
              <div className="ratioWrap">
                <Field 
                  name='sameAsMainContactPickUp' 
                  type="checkbox"
                  />
                <label htmlFor="locationResidential">Same as Main Contact Info</label>
              </div>
            </div>


            

            {/* 

            <div className="formControl">
                <h3>Pick-up Address</h3>
                <label htmlFor="nameImput">Street Address</label>
                <input type="text" name="name" placeholder="Street Address" className="form-control" id="nameImput" />
            </div>
            <div className="formControl">
                <h3>Pick-up Contact</h3>
              <div className="ratioWrap">
                <input type="checkbox" id="locationResidential" name="location" value="0"/>
                <label htmlFor="locationResidential">Same as Main Contact Info</label>
              </div>
              
            </div>

            <div className="formControl">
                <label htmlFor="lastNameImput">City</label>
                <input type="text" name="lastName" placeholder="City" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="lastNameImput">State</label>
                <input type="text" name="lastName" placeholder="State" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>
            <div className="formControl">
              <label htmlFor="dropOff">Zip Code</label>
              <input type="number" name="name" placeholder="zip code" className="form-control" id="nameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
              <label htmlFor="dropOff">Additional Information</label>
              <textarea id="comments-area" name="textarea" placeholder="Additional notes, special instructions, gate code, etc" value="" />
            </div>
            <div className="formControl"></div> */}

            <div className="formControl submitControl fullLenght">
              <button className="whiteBtn" type="submit" onClick={() => setDirection('back')}>
                <span>Previous</span>
              </button>
              <button type="submit" onClick={() => setDirection('next')}>
                <span>Next</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

// AddressFormStep.propTypes = {
//   formData: PropTypes.object.isRequired,
//   setFormData: PropTypes.func.isRequired,
//   nextStep: PropTypes.func.isRequired
// };

