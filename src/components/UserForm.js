import React, { useState, useEffect, useContext } from 'react';
import { FormUserDetails } from './FormUserDetails';
import { FormToteDetails } from './FormToteDetails';
import { Scheduling } from './Scheduling';
import { AddressFormStep } from './AddressFormStep';
import { Confirm } from './Confirm';
import { Success } from './Success';
import axios from "axios";
import { GlobalContext } from "../context/FormContext";
import {PageView, initGA} from './Tracking';
import {Event} from './Tracking';

const trackingGAID = 'UA-55582204-1';
initGA(trackingGAID);
PageView();
let params = {
  step:`Step ${1}`,
  action: 'started',
  desc: `A new user visited the page.`
}
Event(params);
export const UserForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceArea: '',
    dropOff: '',
    pickUp: '',
    locationType: '16',

    firstNameField: '',
    lastNameField: '',
    telField: '',
    emailField: '',
    sameAddressAsDropOff: false,
    billingAddressField: '',
    billingCityField: '',
    billingStateField: '',
    billingAddressZipField: '',

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

    firstNameFieldDifferentDrop: '',
    lastNameFieldDifferentDrop: '',
    telFieldDifferentDrop: '',
    emailFieldDifferentDrop: '',

    firstNameFieldDifferentPickUp: '',
    lastNameFieldDifferentPickUp: '',
    telFieldDifferentPickUp: '',
    emailFieldDifferentPickUp: '',

    cardHolderNameField: '',
    cardNumberField: '',
    expirationDateField: '',
    cvcField: '',
    
    dateDropOff: null,
    datePickUp: null,
    timeRangeDropStart: null,
    timeRangeDropEnd: null,
    timeRangePickStart: null,
    timeRangePickEnd: null,
    schedulingSummary: null,
    securityToken: null,
    promoCodeField: ''
  });

  const { dispatch } = useContext(GlobalContext);
  const nextStep = () => {
    let action = `next`;
    let params = {
      step:`Step ${step}`,
      action: action,
      desc: `[Step ${step}] -> [Step ${step+1}]`
    }
    Event(params);
    setStep(prev => prev + 1)
  }
  const prevStep = () => {
    let action = `prev`;
    let params = {
      step:`Step ${step}`,
      action: action,
      desc: `[Step ${step}] -> [Step ${step-1}]`
    }
    Event(params);
    setStep(prev => prev - 1);
  }  

  //const tokenEndPoint = 'https://kingtote.vonigo.com/api/v1/security/login/?appVersion=1company=Vonigo&password=a8b58ed9ef2fffb4a5ddb88626fa2727&userName=King.tote'
  const tokenEndPoint = 'https://kingtote.vonigo.com/api/v1/security/login/?appVersion=1company=Vonigo&password=de1485461568b6ce64c6687e98a9e194&userName=API.User'
  
  const [tokenGenerated, setTokenGenerated] = useState(null);
  const [franchises, setFranchises] = useState(null);
  const [zips, setZips] = useState(null);
  const [serviceTypes, setServiceTypes] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [resetCalendars, setResetCalendars] = useState(false);


  useEffect(() => {

    const generateToken = async () => {

      try {
        const res = await axios.get(tokenEndPoint)
        setTokenGenerated(res.data.securityToken);
        setLoad(true);

        dispatch({
          type: "SET_TOKEN",
          payload: res.data.securityToken
        })
      } catch (err) {
          console.error(err);
          setError(err.message);
          setLoad(true)
      }
    }
    generateToken();

  }, []);

  useEffect(() => {

    let franchisesEndPoint = 'https://kingtote.vonigo.com/api/v1/resources/franchises/?securityToken='+ tokenGenerated + '&pageNo=1&pageSize=50&method=0'
    
    if(tokenGenerated){
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

        // setFormData({
        //   ...formData,
        //   'securityToken': tokenGenerated
        // });

    }else{
      if(!load && error !== null){
        //window.location.reload();
        console.log('reload...')
      }
    }
    
  }, [tokenGenerated]);

  useEffect(() => {

    let zipCodeEndPoint = 'https://kingtote.vonigo.com/api/v1/resources/zips/?securityToken='+ tokenGenerated + '&pageNo=1&pageSize=50'

    if(tokenGenerated){
      axios.get(zipCodeEndPoint)
            .then(res => {
              if(res.data !== null){
                setZips(res.data.Zips)
              }
              setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true)
            });
    }
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
          serviceTypes={serviceTypes}
          setServiceTypes={setServiceTypes}
          setResetCalendars={setResetCalendars}
        />
      );
    case 2:
      return (
        <FormToteDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          serviceTypes={serviceTypes}
          setServiceTypes={setServiceTypes}
          resetCalendars={resetCalendars}
          setResetCalendars={setResetCalendars}
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
      let action = `submit`;
      let params = {
        step:`Step ${step}`,
        action: action,
        desc: `submitted`
      }
      Event(params);      
      return <Success />;
  }
};
