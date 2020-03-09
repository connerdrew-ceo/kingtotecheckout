import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from "axios";

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

    const [openHideFieldsBillingAddress, setOpenHideFieldsBillingAddress] = useState(formData.sameAddressAsDropOff);

    const [openHideFieldsDropOff, setOpenHideFieldsDropOff] = useState(formData.sameAsMainContactDropOff);
    const [openHideFieldsPickUp, setOpenHideFieldsPickUp] = useState(formData.sameAsMainContactPickUp);


    const makeRequest = (values) => {

      let createClientFields = {
                                  method: "3",
                                  Fields: [
                                    {
                                      "fieldID": 121,
                                      "optionID": 59
                                    },
                                    {
                                      "fieldID": 126,
                                      "fieldValue": values.lastNameField + ' ' + values.firstNameFiled
                                    },
                                    {
                                      "fieldID": 112,
                                      "fieldValue": values.telField
                                    },
                                    {
                                      "fieldID": 1091,
                                      "fieldValue": values.emailField
                                    }    
                                  ]
                                }
      

      createClientFields = JSON.stringify(createClientFields)

      
      console.log('createClientFields >>> ', createClientFields)

      axios.post('https://kingtote.vonigo.com/api/v1/data/Clients/?securityToken='+formData.securityToken, createClientFields)
            .then(res => {
              console.log('Response: ', res)
              if(res.data !== null){
                
              }
            })
            .catch(err => {
              console.log('Error >> ', err)
            })
      

    } 

    useEffect(() => {

      let removeErr = document.querySelectorAll('.rightFields .errorMessage');
      if(removeErr.length){
        removeErr[0].style.display = "none"
        removeErr[1].style.display = "none"
        removeErr[2].style.display = "none"
        removeErr[3].style.display = "none"
      }
      
      if(openHideFieldsDropOff && openHideFieldsPickUp){

        console.log('>>> openHideFieldsDropOff && openHideFieldsPickUp ')
        setValidationSchemaActive(validationSchemaFourthStep)

      }else if(!openHideFieldsDropOff && openHideFieldsPickUp){

        console.log('>>> else if !openHideFieldsDropOff && openHideFieldsPickUp ')
        setValidationSchemaActive(validationSchemaFourthStepDropOff)

      }else{

        console.log('>>> else openHideFieldsDropOff && openHideFieldsPickUp ')
        setValidationSchemaActive(validationSchemaFourthStepPickUp)
      }
        
    },[openHideFieldsDropOff, openHideFieldsPickUp]);
   
    
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
          makeRequest(values);
          // direction === 'back' ? prevStep() : nextStep();
        }}
        // validationSchema={ validationSchemaActive }
        >
        {({ errors, touched }) => (
          <Form className="fifthForm">

            {/* <div className="flexWrapFileds"> */}
            <div className="inlineFifth">
              <div className="leftFields">

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

              <div className="rightFields">

                <div className="formControl">
                  <h3>Billing Address</h3>
                  <div className="ratioWrap checkboxInline">
                    <Field 
                      id="sameAddressAsDropOff"
                      name='sameAsMainCoddressAsDropOff' 
                      type="checkbox"
                      onClick={() => {
                        setOpenHideFieldsBillingAddress(!openHideFieldsBillingAddress)
                        } 
                      }
                      />
                    <label htmlFor="sameAddressAsDropOff">Same as Drop-off Address</label>
                  </div>
                </div>
                <div className="formControl">
                  <label htmlFor="billingAddressField" className={(openHideFieldsBillingAddress) ? 'disabledField' : ''}>Street Address</label>
                  <Field 
                    className={(openHideFieldsBillingAddress) ? 'disabledField' : ''}
                    id="billingAddressField"
                    name='billingAddressField' 
                    placeholder="Street Address"
                    />
                    {errors.billingAddressField && touched.billingAddressField && <div className="errorMessage">{errors.billingAddressField}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="billingCityField" className={(openHideFieldsBillingAddress) ? 'disabledField' : ''}>City</label>
                  <Field 
                    className={(openHideFieldsBillingAddress) ? 'disabledField' : ''}
                    id="billingCityField"
                    name='billingCityField' 
                    placeholder="city"
                    />
                    {errors.billingCityField && touched.billingCityField && <div className="errorMessage">{errors.billingCityField}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="billingStateField" className={(openHideFieldsBillingAddress) ? 'disabledField' : ''}>State</label>
                  <Field 
                    className={(openHideFieldsBillingAddress) ? 'disabledField' : ''}
                    id="billingStateField"
                    name='billingStateField' 
                    placeholder="state"
                    />
                    {errors.billingStateField && touched.billingStateField && <div className="errorMessage">{errors.billingStateField}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="billingAddressZipField" className={(openHideFieldsBillingAddress) ? 'disabledField' : ''}>Zip Code</label>
                  <Field 
                    className={(openHideFieldsBillingAddress) ? 'disabledField' : ''}
                    id="billingAddressZipField"
                    name='billingAddressZipField' 
                    placeholder="zip code"
                    type="number"
                    validate={validateZipCode}
                    />
                    {errors.billingAddressZipField && touched.billingAddressZipField && <div className="errorMessage">{errors.billingAddressZipField}</div>}
                </div>
              
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
                  <label htmlFor="firstNameFiledDifferentDrop" className={(openHideFieldsDropOff) ? 'disabledField' : ''}>First Name</label>
                  
                  <Field 
                    className={(openHideFieldsDropOff) ? 'disabledField' : ''}
                    id="firstNameFiledDifferentDrop"
                    name='firstNameFiledDifferentDrop' 
                    placeholder="Jane"
                    />
                    {errors.firstNameFiledDifferentDrop && touched.firstNameFiledDifferentDrop && <div className="errorMessage">{errors.firstNameFiledDifferentDrop}</div>}
                </div>
                <div className="formControl">
                    <label htmlFor="lastNameFieldDifferentDrop" className={(openHideFieldsDropOff) ? 'disabledField' : ''}>Last Name</label>
                    <Field 
                      className={(openHideFieldsDropOff) ? 'disabledField' : ''}
                      id="lastNameFieldDifferentDrop"
                      name='lastNameFieldDifferentDrop' 
                      placeholder="Doe"
                      />
                      {errors.lastNameFieldDifferentDrop && touched.lastNameFieldDifferentDrop && <div className="errorMessage">{errors.lastNameFieldDifferentDrop}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="telFieldDifferentDrop" className={(openHideFieldsDropOff) ? 'disabledField' : ''}>Phone</label>
                  <Field 
                        className={(openHideFieldsDropOff) ? 'disabledField' : ''}
                        id="telFieldDifferentDrop"
                        name='telFieldDifferentDrop' 
                        placeholder="(555) 555 555"
                        type="tel"
                        />
                      {errors.telFieldDifferentDrop && touched.telFieldDifferentDrop && <div className="errorMessage">{errors.telFieldDifferentDrop}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="emailFieldDifferentDrop" className={(openHideFieldsDropOff) ? 'disabledField' : ''}>Email</label>
                  <Field 
                    className={(openHideFieldsDropOff) ? 'disabledField' : ''}
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
                  <label htmlFor="firstNameFiledDifferentPickUp" className={(openHideFieldsPickUp) ? 'disabledField' : ''}>First Name</label>
                  <Field 
                    className={(openHideFieldsPickUp) ? 'disabledField' : ''}
                    id="firstNameFiledDifferentPickUp"
                    name='firstNameFiledDifferentPickUp' 
                    placeholder="Jane"
                    />
                    {errors.firstNameFiledDifferentPickUp && touched.firstNameFiledDifferentPickUp && <div className="errorMessage">{errors.firstNameFiledDifferentPickUp}</div>}
                </div>

                <div className="formControl">
                  <label htmlFor="lastNameFiledDifferentPickUp" className={(openHideFieldsPickUp) ? 'disabledField' : ''}>Last Name</label>
                  <Field 
                    className={(openHideFieldsPickUp) ? 'disabledField' : ''}
                    id="lastNameFiledDifferentPickUp"
                    name='lastNameFiledDifferentPickUp' 
                    placeholder="Doe"
                    />
                    {errors.lastNameFiledDifferentPickUp && touched.lastNameFiledDifferentPickUp && <div className="errorMessage">{errors.lastNameFiledDifferentPickUp}</div>}

                </div>
                <div className="formControl">
                  <label htmlFor="telFiledDifferentPickUp" className={(openHideFieldsPickUp) ? 'disabledField' : ''}>Phone</label>
                  <Field 
                        className={(openHideFieldsPickUp) ? 'disabledField' : ''}
                        id="telFiledDifferentPickUp"
                        name='telFiledDifferentPickUp' 
                        placeholder="(555) 555 555"
                        type="tel"
                        />
                      {errors.telFiledDifferentPickUp && touched.telFiledDifferentPickUp && <div className="errorMessage">{errors.telFiledDifferentPickUp}</div>}
                </div>
                <div className="formControl">
                  <label htmlFor="emailFiledDifferentPickUp" className={(openHideFieldsPickUp) ? 'disabledField' : ''}>Email</label>
                  <Field 
                    className={(openHideFieldsPickUp) ? 'disabledField' : ''}
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
