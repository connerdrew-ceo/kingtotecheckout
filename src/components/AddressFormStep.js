import React, { useState, useEffect } from 'react';
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
    .required('Email is required'),
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

const validationSchemaFourthStepDropOff = yup.object({
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
    .required('Email is required'),
  firstNameFiledDifferentDrop: yup
    .string()
    .required('First name is required'),
  lastNameFieldDifferentDrop: yup
    .string()
    .required('Last name is required'),
  telFieldDifferentDrop: yup
    .string()
    .required('Telephone is required'),
  emailFieldDifferentDrop: yup
    .string()
    .required('Email is required'),
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

const validationSchemaFourthStepPickUp = yup.object({
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
    .required('Email is required'),
  firstNameFiledDifferentPickUp: yup
    .string()
    .required('First name is required'),
  lastNameFiledDifferentPickUp: yup
    .string()
    .required('Last name is required'),
  telFiledDifferentPickUp: yup
    .string()
    .required('Telephone is required'),
  emailFiledDifferentPickUp: yup
    .string()
    .required('Email is required'),
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
    const [validationSchemaActive, setValidationSchemaActive] = useState(validationSchemaFourthStep);
    const [openHideFieldsDropOff, setOpenHideFieldsDropOff] = useState(formData.sameAsMainContactDropOff);
    let sameContactAsDropOff = (openHideFieldsDropOff) ? 'disabledField' : ''
    const [openHideFieldsPickUp, setOpenHideFieldsPickUp] = useState(formData.sameAsMainContactPickUp);
    let sameContactAsPickUp = (openHideFieldsPickUp) ? 'disabledField' : ''


    useEffect(() => {
      let removeErr = document.querySelectorAll('.rightFields .errorMessage');
      if(removeErr.length){
        removeErr[0].style.display = "none"
        removeErr[1].style.display = "none"
        removeErr[2].style.display = "none"
        removeErr[3].style.display = "none"
      }
      
      if(sameContactAsDropOff === 'disabledField' && sameContactAsPickUp === 'disabledField'){
        
        setValidationSchemaActive(validationSchemaFourthStep)
      }else if(sameContactAsDropOff === '' && sameContactAsPickUp === 'disabledField'){
        setValidationSchemaActive(validationSchemaFourthStepDropOff)
      }else{
        setValidationSchemaActive(validationSchemaFourthStepPickUp)
      }
        
      },
      [sameContactAsDropOff, sameContactAsPickUp]);
    
  return (
    <>
      <Header title='Enter Personal Details' step="Four" />
      <div className="introWrap">
        <h2>Your Details</h2>
        <p>Please fill out your contact information as Delivery and Pick-Up addresses</p>
      </div>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
        validationSchema={ validationSchemaActive }
        >
        {({ errors, touched }) => (
          <Form className="fifthForm">

            <div className="flexWrapFileds">
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
            </div>

            {/*   Drop-off Address   */}

            <div className="inlineFifth">
              <div className="leftFields">

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
                  <label htmlFor="cityDropOffImput">City</label>
                  <Field 
                    id="cityDropOffInput"
                    name='cityDropOffField' 
                    placeholder="city"
                    />
                    {errors.cityDropOffField && touched.cityDropOffField && <div className="errorMessage">{errors.cityDropOffField}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="stateDropOffImput">State</label>
                  <Field 
                    id="stateDropOffInput"
                    name='stateDropOffField' 
                    placeholder="state"
                    />
                    {errors.stateDropOffField && touched.stateDropOffField && <div className="errorMessage">{errors.stateDropOffField}</div>}
                </div>

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
                <div className="formControl">
                  <label htmlFor="dropOff">Additional Information</label>
                  <Field 
                    name='textareaDropOff' 
                    placeholder="Additional notes, special instructions, gate code, etc"
                    component="textarea"
                    />
                    {errors.textareaDropOff && touched.textareaDropOff && <div className="errorMessage">{errors.textareaDropOff}</div>}
                </div>

              </div>
              
              <div className="rightFields">

                <div className="formControl">
                  <h3>Drop-off Contact</h3>
                  <div className="ratioWrap checkboxInline">
                    {/* <label htmlFor="stateDropOffImput">State</label> */}
                    <Field 
                      id="sameAsMainDropOff"
                      name='sameAsMainContactDropOff' 
                      type="checkbox"
                      onClick={() => {
                        setOpenHideFieldsDropOff(!openHideFieldsDropOff)
                        
                        } 
                      }
                      />
                    <label htmlFor="sameAsMainDropOff">Same as Main Contact Info</label>
                  </div>
                </div>
                <div className="formControl">
                  <label htmlFor="firstNameFiledDifferentDrop" className={sameContactAsDropOff}>First Name</label>
                  <Field 
                    className={sameContactAsDropOff}
                    id="firstNameFiledDifferentDrop"
                    name='firstNameFiledDifferentDrop' 
                    placeholder="Jane"
                    />
                    {errors.firstNameFiledDifferentDrop && touched.firstNameFiledDifferentDrop && <div className="errorMessage">{errors.firstNameFiledDifferentDrop}</div>}
                </div>
                <div className="formControl">
                    <label htmlFor="lastNameFieldDifferentDrop" className={sameContactAsDropOff}>Last Name</label>
                    <Field 
                      className={sameContactAsDropOff}
                      id="lastNameFieldDifferentDrop"
                      name='lastNameFieldDifferentDrop' 
                      placeholder="Doe"
                      />
                      {errors.lastNameFieldDifferentDrop && touched.lastNameFieldDifferentDrop && <div className="errorMessage">{errors.lastNameFieldDifferentDrop}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="telFieldDifferentDrop" className={sameContactAsDropOff}>Phone</label>
                  <Field 
                        className={sameContactAsDropOff}
                        id="telFieldDifferentDrop"
                        name='telFieldDifferentDrop' 
                        placeholder="(555) 555 555"
                        type="tel"
                        />
                      {errors.telFieldDifferentDrop && touched.telFieldDifferentDrop && <div className="errorMessage">{errors.telFieldDifferentDrop}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="emailFieldDifferentDrop" className={sameContactAsDropOff}>Email</label>
                  <Field 
                    className={sameContactAsDropOff}
                    id="emailFieldDifferentDrop"
                    name='emailFieldDifferentDrop' 
                    placeholder="hello@hello.com"
                    type="email"
                    />
                      {errors.emailFieldDifferentDrop && touched.emailFieldDifferentDrop && <div className="errorMessage">{errors.emailFieldDifferentDrop}</div>}
                </div>
              </div>
            </div>

            {/* Pick-up Address */}

            <div className="inlineFifth">
              <div className="leftFields">
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
                  <label htmlFor="cityPickUpImput">City</label>
                  <Field 
                    id="cityPickUpInput"
                    name='cityPickUpField' 
                    placeholder="city"
                    />
                    {errors.cityPickUpField && touched.cityPickUpField && <div className="errorMessage">{errors.cityPickUpField}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="statePickUpImput">State</label>
                  <Field 
                    id="statePickUpInput"
                    name='statePickUpField' 
                    placeholder="state"
                    />
                    {errors.statePickUpField && touched.statePickUpField && <div className="errorMessage">{errors.statePickUpField}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="dropOff">Zip Code</label>
                  <Field 
                    name='zipCodePickUp' 
                    placeholder="zip code"
                    type="number"
                    validate={validateZipCode}
                    />
                    {errors.zipCodePickUp && touched.zipCodePickUp && <div className="errorMessage">{errors.zipCodePickUp}</div>}
                </div>
                
                <div className="formControl">
                  <label htmlFor="dropOff">Additional Information</label>
                  <Field 
                    name='textareaDropOff' 
                    placeholder="Additional notes, special instructions, gate code, etc"
                    component="textarea"
                    />
                    {errors.textareaDropOff && touched.textareaDropOff && <div className="errorMessage">{errors.textareaDropOff}</div>}
                </div>

              </div>

              <div className="rightFields">

                <div className="formControl">
                  <h3>Pick-up Contact</h3>
                  <div className="ratioWrap checkboxInline">
                    <Field 
                      id="sameAsMainPick"
                      name='sameAsMainContactPickUp' 
                      type="checkbox"
                      onClick={() => {
                        setOpenHideFieldsPickUp(!openHideFieldsPickUp)
                        
                        }
                      }
                      />
                    <label htmlFor="sameAsMainPick">Same as Main Contact Info</label>
                  </div>
                </div>

                <div className="formControl">
                  <label htmlFor="firstNameFiledDifferentPickUp" className={sameContactAsPickUp}>First Name</label>
                  <Field 
                    className={sameContactAsPickUp}
                    id="firstNameFiledDifferentPickUp"
                    name='firstNameFiledDifferentPickUp' 
                    placeholder="Jane"
                    />
                    {errors.firstNameFiledDifferentPickUp && touched.firstNameFiledDifferentPickUp && <div className="errorMessage">{errors.firstNameFiledDifferentPickUp}</div>}
                </div>

                <div className="formControl">
                  <label htmlFor="lastNameFiledDifferentPickUp" className={sameContactAsPickUp}>Last Name</label>
                  <Field 
                    className={sameContactAsPickUp}
                    id="lastNameFiledDifferentPickUp"
                    name='lastNameFiledDifferentPickUp' 
                    placeholder="Doe"
                    />
                    {errors.lastNameFiledDifferentPickUp && touched.lastNameFiledDifferentPickUp && <div className="errorMessage">{errors.lastNameFiledDifferentPickUp}</div>}

                </div>
                <div className="formControl">
                  <label htmlFor="telFiledDifferentPickUp" className={sameContactAsPickUp}>Phone</label>
                  <Field 
                        className={sameContactAsPickUp}
                        id="telFiledDifferentPickUp"
                        name='telFiledDifferentPickUp' 
                        placeholder="(555) 555 555"
                        type="tel"
                        />
                      {errors.telFiledDifferentPickUp && touched.telFiledDifferentPickUp && <div className="errorMessage">{errors.telFiledDifferentPickUp}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="emailFiledDifferentPickUp" className={sameContactAsPickUp}>Email</label>
                  <Field 
                    className={sameContactAsPickUp}
                    id="emailFiledDifferentPickUp"
                    name='emailFiledDifferentPickUp' 
                    placeholder="hello@hello.com"
                    type="email"
                    />
                      {errors.emailFiledDifferentPickUp && touched.emailFiledDifferentPickUp && <div className="errorMessage">{errors.emailFiledDifferentPickUp}</div>}
                </div>
                
              </div>
            </div>
            
            
            
            <div className="formControl submitControl fullLenght">
              <button className="whiteBtn" type="submit" onClick={() => prevStep()}>
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
