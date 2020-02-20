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
});
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
            {/* <div className="formControl">
                <label htmlFor="nameImput">Phone</label>
                <input type="tel" name="name" placeholder="(555) 555 555" className="form-control" id="nameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="lastNameImput">Email</label>
                <input type="email" name="email" placeholder="hello@hello.com" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>



            <div className="formControl">
                <h3>Drop-off Address</h3>
                <label htmlFor="nameImput">Street Address</label>
                <input type="text" name="name" placeholder="Street Address" className="form-control" id="nameImput" />
            </div>
            <div className="formControl">
                <h3>Drop-off Contact</h3>
              <div className="ratioWrap">
                <input type="checkbox" id="locationResidential" name="location" value="0"/>
                <label htmlFor="locationResidential">Same as Main Contact Info</label>
              </div>
              
            </div>

            <div className="formControl">
                <label htmlFor="lastNameImput">City</label>
                <input type="text" name="city" placeholder="City" className="form-control"  />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="lastNameImput">State</label>
                <input type="text" name="state" placeholder="State" className="form-control"  />
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
            <div className="formControl"></div>


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

