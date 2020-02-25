import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { Header } from './Header';
import { CalendarControlsWrap } from './bookingControls/CalendarControlsWrap'
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Cards from 'react-credit-cards';

const validationSchemaFourthStep = yup.object({
  cardHolderNameFiled: yup
    .string()
    .required('Name is required'),
  cardNumberField: yup
    .string()
    .required('Card number is required'),
  expirationDateField: yup
    .string()
    .required('Expiration date is required'),
    
});

const validateZipCode = value => {

  let stringValue = value + ''
  let error;
    if (!value) {
      error = 'Zip code required';
    } else if (stringValue.length > 5) {
      error = 'postal code is 5 digits';
    } else if (stringValue.length < 5) {
      error = 'postal code is 5 digits';
    }
    return error;
};



export const Confirm = ({ 
    formData, 
    setFormData,
    prevStep, 
    nextStep }) => {
    const [direction, setDirection] = useState('back');
    const [cvc, setCVC] = useState('');
    const [expiry, setExpiry] = useState('');
    const [focus, setFocus] = useState('');
    const [nameCard, setNameCard] = useState('');
    const [numberCard, setNumberCard] = useState('');


  const validateNameCardHolder = value => {

    setNameCard(value)
  };

  const validateNameCardNumber = value => {

    setNumberCard(value)
  };

  const validateDateExp = value => {

    setExpiry(value)
  };

  const validateCVCCode = value => {
    let stringValue = value + ''
    let error;

    setCVC(value)
      if (!value) {
        error = 'CVC required';
      } else if (stringValue.length > 3) {
        error = 'CVC code is 3 digits';
      } else if (stringValue.length < 3) {
        error = 'CVC code is 3 digits';
      }
      return error;
  };

  const trackFocus = (e) => {
    const { name, value } = e.target;
    console.log('trackFocus name: ', name)
    console.log('trackFocus value: ', value)

    setFocus(e.target.name)
  }

  return (
    <>
      <Header title='Confirm User Data' step="Five"/>
      <div className="introWrap">
        <h2>Order Confirmation</h2>
        <p>Please fill out your contact information as Delivery and Pick-Up addresses</p>
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
                <h3>Payment Information</h3>

                <div className="cardWarp">
                  <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={nameCard}
                    number={numberCard}
                    />

                </div>
                <label htmlFor="cardHolderNameInput">Cardholder Name</label>
                <Field 
                  id="cardHolderNameInput"
                  name='cardHolderNameFiled' 
                  placeholder="Jane Doe"
                  validate={validateNameCardHolder}
                  onFocus={trackFocus}
                  />
                {errors.cardHolderNameFiled && touched.cardHolderNameFiled && <div className="errorMessage">{errors.cardHolderNameFiled}</div>}
            </div>
            <div className="formControl"></div>
            <div className="formControl">
                <label htmlFor="cardNumberInput">Card Number</label>
                <Field 
                  id="cardNumberInput"
                  name='cardNumberField' 
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  validate={validateNameCardNumber}
                  onFocus={trackFocus}
                  />
                  {errors.cardNumberField && touched.cardNumberField && <div className="errorMessage">{errors.cardNumberField}</div>}
            </div>
            <div className="formControl"></div>
            
            <div className="formControl inlineFields">
              <div className="wrapBillingInline">
                  <label htmlFor="expirationDateInput">Expiration Date</label>
                  <Field 
                    id="expirationDateInput"
                    name='expirationDateField' 
                    placeholder="MM/YYYY"
                    type="string"
                    validate={validateDateExp}
                    onFocus={trackFocus}
                    />
                    {errors.expirationDateField && touched.expirationDateField && <div className="errorMessage">{errors.expirationDateField}</div>}
              </div>
              <div className="wrapBillingInline">
                  <label htmlFor="cvcInput">CVV</label>
                  <Field 
                    id="cvcInput"
                    name='cvcField' 
                    placeholder="3 digit code"
                    type="number"
                    validate={validateCVCCode}
                    onFocus={trackFocus}
                    />
                    {errors.cvcField && touched.cvcField && <div className="errorMessage">{errors.cvcField}</div>}
              </div>
            </div>
            
            <div className="formControl">
            </div>
            <div className="formControl">
              <label htmlFor="billingZipCode">Billing Zip Code</label>
              <Field 
                name='billingZipCode' 
                placeholder="zip code"
                type="number"
                validate={validateZipCode}
                />
                {errors.billingZipCode && touched.billingZipCode && <div className="errorMessage">{errors.billingZipCode}</div>}
            </div>

            <div className="formControl"></div>
            <div className="formControl">
                <h3>Order Details</h3>
                <div className="rowDetailWrap">
                  <p>35 Totes (1 Week)</p>
                  <span>$120</span>
                </div>
                <div className="rowDetailWrap">
                  <p>Additional Day x 4</p>
                  <span>$120</span>
                </div>
                <div className="rowDetailWrap disccountStyle">
                  <p>Additional Day x 4</p>
                  <span>$120</span>
                </div>
            </div>

            <div className="formControl">
            </div>

            <div className="formControl inlineFields">
              <div className="wrapBillingInline">
                  <label htmlFor="expirationDateInput">Expiration Date</label>
                  <Field 
                    id="expirationDateInput"
                    name='expirationDateField' 
                    placeholder="MM/YYYY"
                    type="string"
                    />
                    {errors.expirationDateField && touched.expirationDateField && <div className="errorMessage">{errors.expirationDateField}</div>}
              </div>
              <div className="wrapBillingInline">
                <label className="transparent" htmlFor="expirationDateInput">Apply</label>
                <button className="whiteBtn" onClick={() => console.log('hola') }>
                  <span>Apply</span>
                </button>
              </div>
            </div>

            <div className="formControl">
            </div>

            <CalendarControlsWrap
              formData={formData}
              setFormData={setFormData}
              origin="Confirm"
            />

            <div className="formControl submitControl fullLenght">
              <button className="whiteBtn" type="submit" onClick={() => prevStep()}>
                <span>Previous</span>
              </button>
              <button type="submit" className="submitOrder" onClick={() => setDirection('next')}>
                <span>Submit Order</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    
    </>
  );
};

