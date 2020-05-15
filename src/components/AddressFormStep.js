import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const validationSchemaFourthStep = yup.object({
  firstNameField: yup
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
    .required('State is required')
});

const validateAddress = value => {

  let error;
  if (!value) {
    error = 'Street is required';
  }
  return error;
};

const validateCity = value => {

  let error;
  if (!value) {
    error = 'City is required';
  }
  return error;
};

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

const validateState = value => {

  let error;
  if (!value) {
    error = 'State is required';
  }

  return error;
};

const validateName = value => {

  let error;
  if (!value) {
    error = 'First name is required';
  }

  return error;
};

const validateLastName = value => {

  let error;
  if (!value) {
    error = 'Last name is required';
  }

  return error;
};

const validateTelephone = value => {

  let error;
  if (!value) {
    error = 'Telephone is required';
  }

  return error;
};

const validateEmail = value => {

  let error;
  if (!value) {
    error = 'Email name is required';
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
  const [openHideFieldsBillingAddress, setOpenHideFieldsBillingAddress] = useState(formData.sameAddressAsDropOff);
  const [openHideFieldsDropOff, setOpenHideFieldsDropOff] = useState(formData.sameAsMainContactDropOff);
  const [openHideFieldsPickUp, setOpenHideFieldsPickUp] = useState(formData.sameAsMainContactPickUp);


  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0
    });
  }, []);

  return (
    <>
      <Header title='Enter Personal Details' step="Four" />
      <div className="introWrap">
        <h2>Your Details</h2>
        <p>Please fill out your contact information and Delivery and Pick-Up addresses</p>
      </div>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
        validationSchema={validationSchemaFourthStep}
      >
        {({ errors, touched }) => (
          <Form className="fifthForm">

            <div className="inlineFifth">
              <div className="leftFields">

                <div className="formControl">
                  <h3>Main Contact Information</h3>
                  <label htmlFor="firstNameInput">First Name</label>
                  <Field
                    id="firstNameInput"
                    name='firstNameField'
                    placeholder="Jane"
                  />
                  {errors.firstNameField && touched.firstNameField && <div className="errorMessage">{errors.firstNameField}</div>}
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
                      name='sameAddressAsDropOff'
                      type="checkbox"
                      onClick={() => {
                        setOpenHideFieldsBillingAddress(!openHideFieldsBillingAddress)
                      }}
                    />
                    <label htmlFor="sameAddressAsDropOff">Same as Drop-off Address</label>
                  </div>
                </div>
                {
                  (openHideFieldsBillingAddress) ? (
                    ''
                  ) : (
                      <>
                        <div className="formControl">
                          <label htmlFor="billingAddressField">Street Address</label>
                          <Field
                            id="billingAddressField"
                            name='billingAddressField'
                            placeholder="Street Address"
                            validate={validateAddress}
                          />
                          {errors.billingAddressField && touched.billingAddressField && <div className="errorMessage">{errors.billingAddressField}</div>}
                        </div>
                        <div className="formControl">
                          <label htmlFor="billingCityField">City</label>
                          <Field
                            id="billingCityField"
                            name='billingCityField'
                            placeholder="city"
                            validate={validateCity}
                          />
                          {errors.billingCityField && touched.billingCityField && <div className="errorMessage">{errors.billingCityField}</div>}
                        </div>
                        <div className="formControl">
                          <label htmlFor="billingStateField">State</label>
                          <Field
                            id="billingStateField"
                            name='billingStateField'
                            placeholder="state"
                            validate={validateState}
                          />
                          {errors.billingStateField && touched.billingStateField && <div className="errorMessage">{errors.billingStateField}</div>}
                        </div>
                        <div className="formControl">
                          <label htmlFor="billingAddressZipField">Zip Code</label>
                          <Field
                            id="billingAddressZipField"
                            name='billingAddressZipField'
                            placeholder="zip code"
                            type="number"
                            validate={validateZipCode}
                          />
                          {errors.billingAddressZipField && touched.billingAddressZipField && <div className="errorMessage">{errors.billingAddressZipField}</div>}
                        </div>
                      </>
                    )
                }
              </div>
            </div>
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
                {
                  (openHideFieldsDropOff) ? (
                    ''
                  ) : (
                      <>
                        <div className="formControl">
                          <label htmlFor="firstNameFieldDifferentDrop">First Name</label>
                          <Field
                            id="firstNameFieldDifferentDrop"
                            name='firstNameFieldDifferentDrop'
                            placeholder="Jane"
                            validate={validateName}
                          />
                          {errors.firstNameFieldDifferentDrop && touched.firstNameFieldDifferentDrop && <div className="errorMessage">{errors.firstNameFieldDifferentDrop}</div>}
                        </div>
                        <div className="formControl">
                          <label htmlFor="lastNameFieldDifferentDrop">Last Name</label>
                          <Field
                            id="lastNameFieldDifferentDrop"
                            name='lastNameFieldDifferentDrop'
                            placeholder="Doe"
                            validate={validateLastName}
                          />
                          {errors.lastNameFieldDifferentDrop && touched.lastNameFieldDifferentDrop && <div className="errorMessage">{errors.lastNameFieldDifferentDrop}</div>}
                        </div>
                        <div className="formControl">
                          <label htmlFor="telFieldDifferentDrop">Phone</label>
                          <Field
                            id="telFieldDifferentDrop"
                            name='telFieldDifferentDrop'
                            placeholder="(555) 555 555"
                            type="tel"
                            validate={validateTelephone}
                          />
                          {errors.telFieldDifferentDrop && touched.telFieldDifferentDrop && <div className="errorMessage">{errors.telFieldDifferentDrop}</div>}
                        </div>
                        <div className="formControl">
                          <label htmlFor="emailFieldDifferentDrop">Email</label>
                          <Field
                            id="emailFieldDifferentDrop"
                            name='emailFieldDifferentDrop'
                            placeholder="hello@hello.com"
                            type="email"
                            validate={validateEmail}
                          />
                          {errors.emailFieldDifferentDrop && touched.emailFieldDifferentDrop && <div className="errorMessage">{errors.emailFieldDifferentDrop}</div>}
                        </div>
                      </>
                    )
                }
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
                    name='textareaPickUp'
                    placeholder="Additional notes, special instructions, gate code, etc"
                    component="textarea"
                  />
                  {/* {errors.textareaDropOff && touched.textareaDropOff && <div className="errorMessage">{errors.textareaDropOff}</div>} */}
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
                {
                  (openHideFieldsPickUp) ? (
                    ''
                  ) : (
                      <>
                        <div className="formControl">
                          <label htmlFor="firstNameFieldDifferentPickUp">First Name</label>
                          <Field
                            id="firstNameFieldDifferentPickUp"
                            name='firstNameFieldDifferentPickUp'
                            placeholder="Jane"
                            validate={validateName}
                          />
                          {errors.firstNameFieldDifferentPickUp && touched.firstNameFieldDifferentPickUp && <div className="errorMessage">{errors.firstNameFieldDifferentPickUp}</div>}
                        </div>
                        <div className="formControl">
                          <label htmlFor="lastNameFieldDifferentPickUp">Last Name</label>
                          <Field
                            id="lastNameFieldDifferentPickUp"
                            name='lastNameFieldDifferentPickUp'
                            placeholder="Doe"
                            validate={validateLastName}
                          />
                          {errors.lastNameFieldDifferentPickUp && touched.lastNameFieldDifferentPickUp && <div className="errorMessage">{errors.lastNameFieldDifferentPickUp}</div>}

                        </div>
                        <div className="formControl">
                          <label htmlFor="telFieldDifferentPickUp">Phone</label>
                          <Field
                            id="telFieldDifferentPickUp"
                            name='telFieldDifferentPickUp'
                            placeholder="(555) 555 555"
                            type="tel"
                            validate={validateTelephone}
                          />
                          {errors.telFieldDifferentPickUp && touched.telFieldDifferentPickUp && <div className="errorMessage">{errors.telFieldDifferentPickUp}</div>}
                        </div>
                        <div className="formControl">
                          <label htmlFor="emailFieldDifferentPickUp">Email</label>
                          <Field
                            id="emailFieldDifferentPickUp"
                            name='emailFieldDifferentPickUp'
                            placeholder="hello@hello.com"
                            type="email"
                            validate={validateEmail}
                          />
                          {errors.emailFieldDifferentPickUp && touched.emailFieldDifferentPickUp && <div className="errorMessage">{errors.emailFieldDifferentPickUp}</div>}
                        </div>
                      </>
                    )
                }
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
