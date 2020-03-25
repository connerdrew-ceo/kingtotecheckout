import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Header } from './Header';
import { CalendarControlsWrap } from './bookingControls/CalendarControlsWrap'
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Cards from 'react-credit-cards';
import axios from "axios";
import { GlobalContext } from "../context/FormContext";
import { merchantName_17, merchantKey_17, merchantName_20, merchantKey_20, merchantName_21, merchantKey_21, authNetURL } from './constant';
let merchantName, merchantKey = ''
const API = 'https://kingtote.vonigo.com/'
let globalFormValues = ''

const validationSchemaFourthStep = yup.object({
  cardHolderNameField: yup
    .string()
    .required('Name is required'),
  cardNumberField: yup
    .string()
    .required('Card number is required'),
  expirationDateField: yup
    .string()
    .required('Expiration date is required'),
});

let dropOffGlobalObj = {
  clientID: 0,
  contactID: 0,
  locationID: 0,
  lockID: 0,
  optionID: 245,
  workOrder: 0,
  jobID: 0
}

let pickUpGlobalObj = {
  clientID: 0,
  contactID: 0,
  locationID: 0,
  lockID: 0,
  optionID: 246,
  workOrder: 0,
  jobID: 0
}

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
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
    const [globalDiscount, setGlobalDiscount] = useState(0);
    const [width] = useWindowSize();
    const { state } = useContext(GlobalContext);

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
      } else if (stringValue.length > 4) {
        error = 'CVC code is 4 digits or less';
      } else if (stringValue.length < 3) {
        error = 'CVC code is 3 digits at least';
      }
      return error;
  };

  const trackFocus = (e) => {
    //const { name, value } = e.target;
    //console.log('trackFocus name: ', name)
    //console.log('trackFocus value: ', value)
    setFocus(e.target.name)
  }

  const getPromoDiscount = async (e) => {

    e.preventDefault()

    let inputVal = document.getElementById('promoCodeField').value;

    if(inputVal === '' || inputVal.length < 2) setGlobalDiscount(0)
    
    let discountFields = {
      "securityToken": state.securityToken,
      "method": "1",
      "promo": inputVal
    }

    discountFields = JSON.stringify(discountFields)

    try {
      const res = await axios.post(API + 'api/v1/resources/promos/?', discountFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });

      if(res.data !== null){
        
        setGlobalDiscount(res.data.Promo[0].promoDiscount)
      }
    } catch (err) {
        console.log('Error getPromoDiscount  >> ', err)
    }

  }

  const getProfileUsingID = async (customerProfileId, jobID, authNetTransaction) => {

    let authNetClient, authNetCard, authNetTransactionLog = 0
    let authorizeFilds9dot3 = {
        "getCustomerProfileRequest": {
            "merchantAuthentication": {
                "name": merchantName,
                "transactionKey": merchantKey
            },
            "customerProfileId": customerProfileId,
            "includeIssuerInfo": "true"
        }
      }

      authorizeFilds9dot3 = JSON.stringify(authorizeFilds9dot3)

      try {                           
        const res = await axios.post(authNetURL, authorizeFilds9dot3, {
          headers: {
          'Content-Type': 'application/json',
          }
        });
        console.log(' $ getProfileUsingID : ', res.data)
        if(res.data !== null){

          if(res.data.messages.resultCode === 'Ok'){

            authNetClient = customerProfileId
            //authNetCard = res.data.profile.paymentProfiles[0]
            //authNetTransactionLog = res.data.profile.paymentProfiles[0]

            createPayment(jobID, authNetTransaction, authNetClient, authNetCard, authNetTransactionLog, getTotalPrice())

          }
          
        }
      } catch (err) {
        console.log('Error getProfileUsingID >> ', err)
      }
  

  }

  const getValuesToCompletePayment = async (jobID, authNetTransaction) => {

    let authNetClient, authNetCard, authNetTransactionLog = 0
    let customerProfileId = 0

    let authorizeFilds9dot2 = {
      "createCustomerProfileRequest": {
          "merchantAuthentication": {
            "name": merchantName,
            "transactionKey": merchantKey
          },
          "profile": {
            "email": globalFormValues.emailField,
            "paymentProfiles": {
                "customerType": "individual",
                "payment": {
                    "creditCard": {
                        "cardNumber": numberCard,
                        "expirationDate": expiry
                    }
                }
            }
          }
      }
    }

    authorizeFilds9dot2 = JSON.stringify(authorizeFilds9dot2)

    try {                           
      const res = await axios.post(authNetURL, authorizeFilds9dot2, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      console.log(' $ getValuesToCompletePayment : ', res.data)
      if(res.data !== null){

        if(res.data.messages.resultCode === 'Error'){

          customerProfileId = res.data.messages.message[0].text
          customerProfileId = customerProfileId.split(' ')[5]
          getProfileUsingID(customerProfileId, jobID, authNetTransaction)

          //console.log('customerProfileId >> ', customerProfileId)
        }
        
        if(res.data.messages.resultCode === 'Ok'){
          authNetClient = res.data.customerProfileId
          authNetCard = res.data.customerPaymentProfileIdList[0]
          authNetTransactionLog = res.data.validationDirectResponseList[0]
          
          createPayment(jobID, authNetTransaction, authNetClient, authNetCard, authNetTransactionLog, getTotalPrice())
        }
        
      }
    } catch (err) {
      console.log('Error getValuesToCompletePayment >> ', err)
    }

  }

  const getTotalPriceWithDiscount = (totalPrice) => {

    return totalPrice = (totalPrice * (100 - globalDiscount)) / 100
  }

  const getTotalPrice = () => {
    if(!state.toteBoxesContent){
      return 0
    }
    else{
      let totalPrice = 0;
      let selectedTotes = state.toteBoxesContent.filter(toteRow => toteRow.indexActive !== null)
      for (var i = 0, len = selectedTotes.length; i < len; i++) {
        let toteRow = selectedTotes[i];
        totalPrice += toteRow.prices[toteRow.indexActive].price
      }
      return formatPrice(totalPrice);                    
    }
  }

  const getBillTo = () => {
    var retData = {
        "firstName": state.firstNameField,
        "lastName": state.lastNameField,
        "company": "",
        "address": state.addressDropOffField,
        "city": state.cityDropOffField,
        "state": state.stateDropOffField,
        "zip": state.zipCodeDropOff,
        "country": state.locationType===16?'USA':'Canada'
    }
    if(!state.sameAddressAsDropOff){
      retData.address = state.billingAddressField
      retData.city = state.billingCityField
      retData.state = state.billingStateField
      retData.zip = state.billingAddressZipField
      retData.country = state.locationType===16?'USA':'Canada'
    }
    if(!state.sameAsMainContactDropOff){
      retData.firstName = state.firstNameFieldDifferentDrop
      retData.lastName = state.lastNameFieldDifferentDrop
    }
    return retData
  }
  const getShipTo = () => {
    let retData = {
        "firstName": state.firstNameField,
        "lastName": state.lastNameField,
        "company": "",
        "address": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
    }
    retData.address = state.addressPickUpField
    retData.city = state.cityPickUpField
    retData.state = state.statePickUpField
    retData.zip = state.zipCodePickUp
    retData.country = state.locationType===16?'USA':'Canada'
    if(!state.sameAsMainContactPickUp){
      retData.firstName = state.firstNameFieldDifferentPickUp
      retData.lastName = state.lastNameFieldDifferentPickUp
    }
    return retData
  }

  const createAuthorize = async (jobID) => {
    console.log('total price >>>' + getTotalPrice())
    let authorizeFilds = {
      "createTransactionRequest": {
          "merchantAuthentication": {
            "name": merchantName,
            "transactionKey": merchantKey
          },
          "refId": jobID,
          "transactionRequest": {
              "transactionType": "authCaptureTransaction",
              "amount": getTotalPrice(),
              "payment": {
                  "creditCard": {
                      "cardNumber": numberCard,
                      "expirationDate": expiry,
                      "cardCode": cvc
                  }
              },
              "billTo": getBillTo(),
              "shipTo": getShipTo()
          }
        }
      }

      authorizeFilds = JSON.stringify(authorizeFilds)

      try {                           
        const res = await axios.post(authNetURL, authorizeFilds, {
          headers: {
          'Content-Type': 'application/json',
          }
        });
        //console.log(' $ createAuthorize : ', res.data)
        if(res.data !== null){
          getValuesToCompletePayment(jobID, res.data.transactionResponse.transId )
        }
      } catch (err) {
        console.log('Error createAuthorize >> ', err)
      }
  
  }

  const createPayment = async ( jobID, authNetTransaction, authNetClient, authNetCard, authNetTransactionLog, amount ) => {
    
    let newPaymentFields = {
      securityToken: state.securityToken,
      method: '3',
      clientID: dropOffGlobalObj.clientID,
      jobID: jobID,
      authNetClient: authNetClient,
      authNetCard: authNetCard,
      authNetCardLast4Digits: numberCard.substring(11,15),
      authNetTransaction: authNetTransaction,
      authNetTransactionLog: authNetTransactionLog,
      Fields: [
        {
          "fieldID": 930,
          "fieldValue": amount
        },
        {
          "fieldID": 931,
          "fieldValue": amount
        },
        {
          "fieldID": 936,
          "optionID": 10124
        },
        {
          "fieldID": 928,
          "fieldValue": 'Online booking. No summary data'
        } 
      ]
      }

      newPaymentFields = JSON.stringify(newPaymentFields)

      try {
        const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Payments/?', newPaymentFields, {
          headers: {
          'Content-Type': 'application/json',
          }
        });
        console.log(' $ $ $ createPayment : ', res.data)
        if(res.data !== null){

          direction === 'back' ? prevStep() : nextStep();
          //alert('Congratulations!')
          document.body.classList.remove('busy-cursor');
          //createWorkOrders(res.data.Job.objectID, 'dropOff')
          //createWorkOrders(res.data.Job.objectID, 'pickUp')
          
        }
      } catch (err) {
        console.log('Error createPayment >> ', err)
      }
    
  }

  const createWorkOrders = async ( jobID, requestType ) => {

    let workOrderFields = {
                        securityToken: state.securityToken,
                        method: '3',
                        jobID: jobID,
                        lockID: (requestType === 'dropOff') ? dropOffGlobalObj.lockID : pickUpGlobalObj.lockID,
                        clientID: (requestType === 'dropOff') ? dropOffGlobalObj.clientID : pickUpGlobalObj.clientID,
                        contactID: (requestType === 'dropOff') ? dropOffGlobalObj.contactID : pickUpGlobalObj.contactID,
                        locationID: (requestType === 'dropOff') ? dropOffGlobalObj.locationID : pickUpGlobalObj.locationID,
                        serviceTypeID: formData.locationType,
                        Fields: [
                          {
                            "fieldID": 200,
                            "fieldValue": 'Online booking. No summary data'
                          },
                          {
                            "fieldID": 186,
                            "fieldValue": 60
                          },
                          {
                            "fieldID": 201,
                            "optionID": (requestType === 'dropOff') ? 245 : 246
                          } 
                        ]
                      }

    workOrderFields = JSON.stringify(workOrderFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/WorkOrders/?', workOrderFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      
      if(res.data !== null){
        
        if(requestType === 'dropOff'){
          dropOffGlobalObj.workOrder = res.data.WorkOrder.objectID
        }else{
          pickUpGlobalObj.workOrder = res.data.WorkOrder.objectID
        }
      }
    } catch (err) {
      console.log(requestType,' Error createWorkOrders >> ', err)
    }
    
  }

  const createNewJob = async () => {

    let newJobFields = {
                        securityToken: state.securityToken,
                        method: '3',
                        clientID: dropOffGlobalObj.clientID,
                        Fields: [
                          {
                            "fieldID": 978,
                            "fieldValue": 'Online booking. No summary data'
                          },
                          {
                            "fieldID": 982,
                            "optionID": (formData.locationType === '16') ? 10278 : 10173
                          } 
                        ]
                      }

    newJobFields = JSON.stringify(newJobFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Jobs/?', newJobFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      if(res.data !== null){
        createWorkOrders(res.data.Job.objectID, 'dropOff')
        createWorkOrders(res.data.Job.objectID, 'pickUp')
        createAuthorize(res.data.Job.objectID)
        
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

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/resources/availability/?', lockAvailabilityFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      
      if(res.data !== null){
        
        if(requestType === 'dropOff'){
          dropOffGlobalObj.lockID = res.data.Ids.lockID
          createNewJob()
        }

        if(requestType === 'pickUp'){
          pickUpGlobalObj.lockID = res.data.Ids.lockID
        }
      }
    } catch (err) {
        console.log(requestType + ' Error lockAvailabilityFields>> ', err)
    }
    
  }

  const setBillingAddress = async (locationID) => {

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
      
      if(res.data !== null){
        console.log('setBillingAddress : ', res.data)
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

      if(requestType === 'billing'){

        addLocationFields = {
                              securityToken: state.securityToken,
                              method: '3',
                              clientID: objectID,
                              Fields: [
                                {
                                  "fieldID": 773,
                                  "fieldValue": values.billingAddressField
                                },
                                {
                                  "fieldID": 776,
                                  "fieldValue": values.billingCityField
                                },
                                {
                                  "fieldID": 778,
                                  "optionID": '9847'
                                },
                                {
                                  "fieldID": 775,
                                  "fieldValue": values.billingAddressZipField
                                },
                                {
                                  "fieldID": 779,
                                  "optionID": '9906'
                                },
                                {
                                  "fieldID": 9713,
                                  "fieldValue": '-'
                                }
                              ]
                            }
    }
    
    addLocationFields = JSON.stringify(addLocationFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Locations/?', addLocationFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      
        if(res.data !== null){
          console.log("\n")
          console.log(requestType +' Locations : ', res.data)
          
          if(requestType === 'billing'){
            setBillingAddress(res.data.Location.objectID)
            return
          }

          if(requestType === 'pickUp'){

            if(!values.sameAddressAsDropOff){
              addLocation(values, objectID, 'billing')
            }
            
            lockAvailability(res.data.Location.objectID, requestType)
            pickUpGlobalObj.locationID = res.data.Location.objectID

            return

          }else if(requestType === 'dropOff'){ 

            lockAvailability(res.data.Location.objectID, requestType)
            dropOffGlobalObj.locationID = res.data.Location.objectID

            if(values.sameAddressAsDropOff){
              setBillingAddress(res.data.Location.objectID)
            }
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
      //console.log('setMainContactFields response : ', res)
      if(res.data.Contact !== null){

        //console.log('setMainContactFields okay: ', res.data.Contact.objectID)
        //setMainContact(res.data.Contact.objectID)
      }
    } catch (err) {
        console.log('Error WorkOrders >> ', err)
    }
    
  }

  const getContactInfoByType = (values, objectID, contactType) => {
    let createContactFields
    let firstName
    let lastName
    let tel
    let email
    switch (contactType) {
      case "main":
        firstName = values.firstNameField
        lastName = values.lastNameField
        tel = values.telField
        email = values.emailField
        break;
      case "dropOff":
        firstName = values.firstNameFieldDifferentDrop
        lastName = values.lastNameFieldDifferentDrop
        tel = values.telFieldDifferentDrop
        email = values.emailFieldDifferentDrop
        break;
      case "pickUp":
        firstName = values.firstNameFieldDifferentPickUp
        lastName = values.lastNameFieldDifferentPickUp
        tel = values.telFieldDifferentPickUp
        email = values.emailFieldDifferentPickUp
        break;
      default:
        break;
    }
    createContactFields = {
      securityToken: state.securityToken,
      method: '3',
      clientID: objectID,
      Fields: [
        {
          "fieldID": 127,
          "fieldValue": firstName
        },
        {
          "fieldID": 128,
          "fieldValue": lastName
        },
        {
          "fieldID": 1088,
          "fieldValue": tel
        },
        {
          "fieldID": 97,
          "fieldValue": email
        }    
      ]
    }
    return createContactFields;
  }

  const createContact = async (values, objectID, contactType) => {
    console.log(values);
    let createContactFields = getContactInfoByType(values, objectID, contactType);

    createContactFields = JSON.stringify(createContactFields)
    //console.log('createContactFields >> ', createContactFields)

    try {
      const res = await axios.post('https://kingtote.vonigo.com/api/v1/data/Contacts/?', createContactFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });

      
      if(res.data.Contact !== null){

        //console.log(contactType,' + + + + + + Contacts: ', res.data )

        if(contactType === 'main'){
          setMainContact(res.data.Contact.objectID)
          if(values.sameAsMainContactDropOff){
            dropOffGlobalObj.contactID = res.data.Contact.objectID
          }
          if(values.sameAsMainContactPickUp){
            pickUpGlobalObj.contactID = res.data.Contact.objectID
          }
        }

        if(contactType === 'dropOff'){
          dropOffGlobalObj.contactID = res.data.Contact.objectID
        }

        if(contactType === 'pickUp'){
          pickUpGlobalObj.contactID = res.data.Contact.objectID
        }

        
      }
    } catch (err) {
      console.log(contactType,' Error Contacts>> ', err)
    }

  }

  const createClient = async (values) => {

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
                                    "fieldValue": values.lastNameField + ' ' + values.firstNameField
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


    globalFormValues = values

    switch (values.serviceArea) {
      case "17":
        merchantName = merchantName_17
        merchantKey = merchantKey_17
        break;
      case "20":
        merchantName = merchantName_20
        merchantKey = merchantKey_20
        break;
      case "21":
        merchantName = merchantName_21
        merchantKey = merchantKey_21
        break;
      default:
        break;
    }

    console.log('values.serviceArea >> ', values.serviceArea)

    createClientFields = JSON.stringify(createClientFields)

    try {
      const res = await axios.post(API + 'api/v1/data/Clients/?', createClientFields, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      if(res.data.Client !== null){
        await createContact(values, res.data.Client.objectID, 'main')
        if(!values.sameAsMainContactDropOff && dropOffGlobalObj.contactID === 0){
          await createContact(values, res.data.Client.objectID, 'dropOff')
        }
        if(!values.sameAsMainContactPickUp && pickUpGlobalObj.contactID === 0){
          await createContact(values, res.data.Client.objectID, 'pickUp')
        }
        addLocation(values, res.data.Client.objectID, 'dropOff')
        dropOffGlobalObj.clientID = res.data.Client.objectID
        pickUpGlobalObj.clientID = res.data.Client.objectID
        
      }
    } catch (err) {
        console.log('Error Clients  >> ', err)
    }
  }

  useEffect(() => {
    window.scrollTo({
        behavior: "smooth",
        top: 0
    });
  }, []);

  const formatPrice = (price) => {
    
    return (price % 1 !== 0) ? price.toFixed(2) : price.toFixed(2)
    
  }

  return (
    <>
      <Header title='Confirm User Data' step="Five"/>
      <div className="introWrap">
        <h2>Order Confirmation</h2>
        <p>Please provide Payment Information and review your order details</p>
      </div>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          createClient(values);
          document.body.classList.add('busy-cursor');
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
                  name='cardHolderNameField' 
                  placeholder="Jane Doe"
                  validate={validateNameCardHolder}
                  onFocus={trackFocus}
                  />
                {errors.cardHolderNameField && touched.cardHolderNameField && <div className="errorMessage">{errors.cardHolderNameField}</div>}
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
                <h3>Order Details </h3>
                {
                  state.toteBoxesContent ? state.toteBoxesContent
                    .filter(toteRow => toteRow.indexActive !== null)
                    .map((toteRow, index) => {
                      return <div key={index} className="rowDetailWrap">
                                <p>{toteRow.title}</p>
                                <span>${ formatPrice(toteRow.prices[toteRow.indexActive].price) }</span>
                            </div>
                    }) : ''
                }
                {
                  (globalDiscount > 0) ? (
                    <>
                    <div className="rowDetailWrap">
                      <p>Discount </p>
                      <span>- ${ (getTotalPrice() * globalDiscount) / 100}</span>
                    </div>
                    <div className="rowDetailWrap topLine">
                      <p>Sub Total </p>
                      <span>${ formatPrice(getTotalPriceWithDiscount( getTotalPrice()))}</span>
                    </div>
                    </>
                  ) : ''
                }
                <div className="rowDetailWrap ">
                  <p>Taxes </p>
                  <span>${ formatPrice((getTotalPriceWithDiscount( getTotalPrice())) * .075 ) }</span>
                </div>
                <div className="rowDetailWrap topLine">
                  <p>Total</p>
                  <span>${ formatPrice((getTotalPriceWithDiscount( getTotalPrice()) * 1.075) ) }</span>
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
                <button className="whiteBtn" onClick={ getPromoDiscount }>
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
                <span>{ (width > 768) ? 'Submit Order' : 'Submit' } </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

