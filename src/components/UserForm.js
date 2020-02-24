import React, { useState, useEffect } from 'react';
import { FormUserDetails } from './FormUserDetails';
import { FormToteDetails } from './FormToteDetails';
import { Scheduling } from './Scheduling';
import { AddressFormStep } from './AddressFormStep';
import { Confirm } from './Confirm';
import { Success } from './Success';
import axios from "axios";

export const UserForm = () => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceArea: '',
    dropOff: '',
    pickUp: '',
    locationType: 'residential',
    firstBooking: '',
    lasttBooking: '',
    toteBoxesField: '',
    toteCarField: '',
    firstNameFiled: '',
    lastNameField: '',
    telField: '',
    emailField: '',
    addressDropOffField: '',
    sameAsMainContactDropOff: true,
    cityDropOffField: '',
    stateDropOffField: '',
    zipCodeDropOff: '',
    textareaDropOff: '',
    addressPickUpField: '',
    sameAsMainContactPickUp: true,
    cityPickUpField: '',
    statePickUpField: '',
    zipCodePickUp: '',
    textareaPickUp: '',

    // firstNameFiled: 'Jorge',
    // lastNameField: 'Zozaya',
    // telField: '23344444',
    // emailField: 'hola@hola.com',
    // addressDropOffField: 'address 1',
    // sameAsMainContactDropOff: true,
    // cityDropOffField: 'city',
    // stateDropOffField: 'state',
    // zipCodeDropOff: '22222',
    // textareaDropOff: '',
    // addressPickUpField: 'address 2',
    // sameAsMainContactPickUp: true,
    // cityPickUpField: 'city',
    // statePickUpField: 'state',
    // zipCodePickUp: '11111',
    // textareaPickUp: '',

    firstNameFiledDifferentDrop: '',
    lastNameFieldDifferentDrop: '',
    telFieldDifferentDrop: '',
    emailFieldDifferentDrop: '',

    firstNameFiledDifferentPickUp: '',
    lastNameFiledDifferentPickUp: '',
    telFiledDifferentPickUp: '',
    emailFiledDifferentPickUp: '',

    cardHolderNameFiled: '',
    cardNumberField: '',
    expirationDateField: '',
    cvvField: '',
    billingZipCode: '',
    box25totes: null,
    box35totes: null,
    box50totes: null,
    box70totes: null,
    handleCart: null,
    kingcart: null,
    dateDropOff: null,
    datePickUp: null,
    timeRangeDropStart: null,
    timeRangeDropEnd: null,
    timeRangePickStart: null,
    timeRangePickEnd: null,
    schedulingSummary: null,
    securityToken: null,
    serviceTypes: null
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const tokenEndPoint = 'https://kingtote.vonigo.com/api/v1/security/login/?appVersion=1company=Vonigo&password=a8b58ed9ef2fffb4a5ddb88626fa2727&userName=King.tote'
  
  const [tokenGenerated, setTokenGenerated] = useState(null);
  const [franchises, setFranchises] = useState(null);
  const [zips, setZips] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  //let listFranchises = ''

  useEffect(() => {
      axios.get(tokenEndPoint)
            .then(res => {
              if(res.data !== null){
                console.log('tokenGenerated: ', res.data.securityToken)
                setFormData({
                  ...formData,
                  'securityToken': res.data.securityToken
                });
              }
              setTokenGenerated(res.data.securityToken);
              setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true)
            })
          
  }, []);

  useEffect(() => {

    let franchisesEndPoint = 'https://kingtote.vonigo.com/api/v1/resources/franchises/?securityToken='+ tokenGenerated + '&pageNo=1&pageSize=50&method=0'
    
    axios.get(franchisesEndPoint)
            .then(res => {
              if(res.data !== null){
                setFranchises(res.data.Franchises)
              }
              setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true)
            })
    
  }, [tokenGenerated]);

  useEffect(() => {

    let zipCodeEndPoint = 'https://kingtote.vonigo.com/api/v1/resources/zips/?securityToken='+ tokenGenerated + '&pageNo=1&pageSize=50'

    axios.get(zipCodeEndPoint)
            .then(res => {
              if(res.data !== null){
                setZips(res.data.Zips)
                console.log('res.data.Zips: ',res.data.Zips)
              }
              setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true)
            })
  }, [tokenGenerated]);


  switch (step) {
    case 1:
      return (
        <FormUserDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          franchises={franchises}
          zipCodes={zips}
        />
      );
    case 2:
      return (
        <FormToteDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <Scheduling
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <AddressFormStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 5:
      return (
        <Confirm 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      );
    default:
      return <Success />;
  }
};
