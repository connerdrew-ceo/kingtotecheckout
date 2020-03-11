import React, { useState, useEffect, useContext } from 'react';
//import PropTypes from 'prop-types';
import { Header } from './Header';
import { CalendarControlsWrap } from './bookingControls/CalendarControlsWrap'
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Cards from 'react-credit-cards';
import axios from "axios";
import { GlobalContext } from "../context/FormContext";

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

let dropOffGlobalObj = {
  contactID: 0,
  locationID: 0,
  optionID: 245
}

let pickUpGlobalObj = {
  contactID: 0,
  locationID: 0,
  optionID: 246
}

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

    const [tokenGenerated, setTokenGenerated] = useState(null);
    const { state, dispatch } = useContext(GlobalContext);
    


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
    //console.log('trackFocus name: ', name)
    //console.log('trackFocus value: ', value)
    setFocus(e.target.name)
  }

  const createWorkOrders = async () => {

    let workOrderFields = {
                        securityToken: state.securityToken,
                        method: '3',
                        clientID: '1',
                        Fields: [
                          {
                            "fieldID": 978,
                            "fieldValue": 'Online booking. No summary data'
                          },
                          {
                            "fieldID": 982,
                            "fieldValue": (formData.locationType === '16') ? 10278 : 10173
                          } 
                        ]
                      }

    workOrderFields = JSON.stringify(workOrderFields)

    // console.log(' createWorkOrders >> ', workOrderFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/WorkOrders/?', workOrderFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      console.log('createWorkOrders response : ', res)
      if(res.data !== null){
        //console.log('okay lockAvailabilityFields: ', res.data.Contact.objectID)
        //setMainContact(res.data.Contact.objectID)
      }
    } catch (err) {
      console.log('Error createWorkOrders >> ', err)
    }
    
  }

  const createNewJob = async () => {

    let newJobFields = {
                        securityToken: state.securityToken,
                        method: '3',
                        clientID: '1',
                        Fields: [
                          {
                            "fieldID": 978,
                            "fieldValue": 'Online booking. No summary data'
                          },
                          {
                            "fieldID": 982,
                            "fieldValue": (formData.locationType === '16') ? 10278 : 10173
                          } 
                        ]
                      }

    newJobFields = JSON.stringify(newJobFields)

    //console.log(' createNewJob >> ', newJobFields)
    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Jobs/?', newJobFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      console.log('createNewJob response : ', res)
      if(res.data !== null){

        
      }
    } catch (err) {
      console.log('Error createNewJob >> ', err)
    }
    
  }

  const lockAvailability = async ( objectID, requestType) => {

    let lockAvailabilityFields = {
                                securityToken: state.securityToken,
                                method: '2',
                                dayID: (requestType === 'dropOff') ? state.dropOffObj.dayID : state.pickUpObj.dayID,
                                routeID: (requestType === 'dropOff') ? state.dropOffObj.routeID : state.pickUpObj.routeID,
                                locationID: objectID,
                                serviceTypeID: formData.locationType,
                                duration: 60,
                                startTime: (requestType === 'dropOff') ? state.dropOffObj.startTime : state.pickUpObj.startTime
                              }

    lockAvailabilityFields = JSON.stringify(lockAvailabilityFields)

    //console.log(requestType + ' lockAvailabilityFields >> ', lockAvailabilityFields)
    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/resources/availability/?', lockAvailabilityFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      console.log(requestType + ' lockAvailabilityFields response : ', res)
      if(res.data !== null){  

        createNewJob()
      }
    } catch (err) {
        console.log(requestType + ' Error lockAvailabilityFields>> ', err)
    }
    
  }

  const setBillingAddress = async (locationID) => {

    console.log('setBillingAddress > ', locationID)

    let setBillingAddressFields = {
                                securityToken: state.securityToken,
                                method: '9',
                                objectID: locationID,
                                
                              }

    setBillingAddressFields = JSON.stringify(setBillingAddressFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Locations/?', setBillingAddressFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      console.log('setBillingAddress response : ', res)
      if(res.data !== null){
        //console.log('setBillingAddress okay: ', res.data)
        //setMainContact(res.data.Contact.objectID)
      }
    } catch (err) {
      console.log('Error setBillingAddress >> ', err)
    }
  }

  const addLocation = async (values, objectID, requestType) => {

    let addLocationFields = {
                              securityToken: state.securityToken,
                              method: '3',
                              clientID: objectID,
                              Fields: [
                                {
                                  "fieldID": 773,
                                  "fieldValue": (requestType === 'dropOff') ? values.addressDropOffField : values.addressPickUpField
                                },
                                {
                                  "fieldID": 776,
                                  "fieldValue": (requestType === 'dropOff') ? values.cityDropOffField : values.cityPickUpField
                                },
                                {
                                  "fieldID": 778,
                                  "optionID": '9847'
                                },
                                {
                                  "fieldID": 775,
                                  "fieldValue": (requestType === 'dropOff') ? values.zipCodeDropOff : values.zipCodePickUp
                                },
                                {
                                  "fieldID": 779,
                                  "optionID": '9906'
                                },
                                {
                                  "fieldID": 9713,
                                  "fieldValue": (requestType === 'dropOff') ? values.textareaDropOff : values.textareaPickUp
                                }
                              ]
                            }
    
    addLocationFields = JSON.stringify(addLocationFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Locations/?', addLocationFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      console.log(requestType +' Locations response : ', res)
        if(res.data !== null){

          // set logic for Billing address
          if(requestType === 'pickUp'){

            setBillingAddress(res.data.Location.objectID)
            lockAvailability(res.data.Location.objectID, requestType)
            pickUpGlobalObj.locationID = res.data.Location.objectID

            return

          }else if(requestType === 'dropOff'){ 
            lockAvailability(res.data.Location.objectID, requestType)
            dropOffGlobalObj.locationID = res.data.Location.objectID
          }
          addLocation(values, objectID, 'pickUp')
        }
    } catch (err) {
      console.log(requestType + ' Error Locations>> ', err)
    }
    
  }

  const setMainContact = async (mainContactID) => {

    let setMainContactFields = {
                                securityToken: state.securityToken,
                                method: '9',
                                objectID: mainContactID,
                                
                              }

    setMainContactFields = JSON.stringify(setMainContactFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Contacts/?', setMainContactFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      console.log('setMainContactFields response : ', res)
      if(res.data.Contact !== null){

        //console.log('setMainContactFields okay: ', res.data.Contact.objectID)
        //setMainContact(res.data.Contact.objectID)
      }
    } catch (err) {
        console.log('Error WorkOrders >> ', err)
    }
    
  }

  const createContact = async (values, objectID, contactType) => {

    let createContactFields = {
                                securityToken: state.securityToken,
                                method: '3',
                                clientID: objectID,
                                Fields: [
                                  {
                                    "fieldID": 127,
                                    "fieldValue": values.firstNameFiled
                                  },
                                  {
                                    "fieldID": 128,
                                    "fieldValue": values.lastNameField
                                  },
                                  {
                                    "fieldID": 1088,
                                    "fieldValue": values.telField
                                  },
                                  {
                                    "fieldID": 97,
                                    "fieldValue": values.emailField
                                  }    
                                ]
                              }

    createContactFields = JSON.stringify(createContactFields)
    //console.log('createContactFields >> ', createContactFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Contacts/?', createContactFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });

      console.log(contactType,' + + + + + + Contacts: ', res)
      if(res.data.Contact !== null){

        if(contactType === 'main'){
          setMainContact(res.data.Contact.objectID)
        }

        //if(contactType === 'dropOff')

        if(!values.sameAsMainContactDropOff){
          //createContact(values, objectID, 'dropOff')
        }
    
        if(!values.sameAsMainContactPickUp){
          //createContact(values, objectID, 'pickUp')
        }
      }
    } catch (err) {
      console.log(contactType,' Error Contacts>> ', err)
    }

  }

  const createClient = async (values) => {

    console.log('GLobal obj >> ', values)

    let createClientFields = {
                                securityToken: state.securityToken,
                                method: '3',
                                Fields: [
                                  {
                                    "fieldID": 121,
                                    "optionID": (formData.locationType === '16') ? 59 : 60
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

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Clients/?', createClientFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      console.log('Clients Response: ', res)
      if(res.data.Client !== null){
        //setCLientId(res.Client.objectID)
        console.log('create contact ', res.data.Client.objectID)
        createContact(values, res.data.Client.objectID, 'main')
        addLocation(values, res.data.Client.objectID, 'dropOff')
      }
    } catch (err) {
        console.log('Error Clients  >> ', err)
    }
  }

  // useEffect(() => {
  //   const generateToken = async () => {
  //     const tokenEndPoint = 'https://kingtote.vonigo.com/api/v1/security/login/?appVersion=1company=Vonigo&password=de1485461568b6ce64c6687e98a9e194&userName=API.user'

  //     try {
  //       const res = await axios.get(tokenEndPoint)
  //       console.log(res.data);
  //       setTokenGenerated(res.data.securityToken);
  //       dispatch({
  //         type: "SET_TOKEN",
  //         payload: res.data.securityToken
  //       })
  //     } catch (err) {
  //         console.error(err);
  //     }
  //   }
  //   generateToken();
  // }, []);

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
          createClient(values);
          direction === 'back' ? prevStep() : nextStep();
          // console.log('AddressFormStep submit >>>> ', values)
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
                  <label htmlFor="promoCodeField">Promo Code</label>
                  <Field 
                    id="promoCodeField"
                    name='promoCodeField' 
                    placeholder="Enter Code"
                    type="string"
                    />
                    
              </div>
              <div className="wrapBillingInline">
                <label className="transparent">Apply</label>
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

