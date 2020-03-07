import React, { useState, useEffect, useContext } from 'react';
import { FormUserDetails } from './FormUserDetails';
import { FormToteDetails } from './FormToteDetails';
import { Scheduling } from './Scheduling';
import { AddressFormStep } from './AddressFormStep';
import { Confirm } from './Confirm';
import { Success } from './Success';
import axios from "axios";
import { GlobalContext } from "../context/FormContext";

export const UserForm = () => {
  const [step, setStep] = useState(4);
  const [formData, setFormData] = useState({
    serviceArea: '',
    dropOff: '84020',
    pickUp: '84020',
    locationType: '16',
    firstBooking: '',
    lasttBooking: '',
    toteBoxesField: '',
    toteCarField: '',

    firstNameFiled: '',
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

    // firstNameFiled: 'Jorge',
    // lastNameField: 'Zozaya',
    // telField: '23344444',
    // emailField: 'hola@hola.com',
    // addressDropOffField: 'address 1',
    // sameAsMainContactDropOff: true,
    // cityDropOffField: 'city',
    // stateDropOffField: 'state',
    // zipCodeDropOff: '',
    // textareaDropOff: '',
    // addressPickUpField: 'address 2',
    // sameAsMainContactPickUp: true,
    // cityPickUpField: 'city',
    // statePickUpField: 'state',
    // zipCodePickUp: '',
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
    cvcField: '',
    billingZipCode: '',
    dateDropOff: null,
    datePickUp: null,
    timeRangeDropStart: null,
    timeRangeDropEnd: null,
    timeRangePickStart: null,
    timeRangePickEnd: null,
    schedulingSummary: null,
    securityToken: null,
    promoCodeField: ''
    //toteBoxesGlobalInfo: null,
  });


  const { dispatch } = useContext(GlobalContext);
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  //const tokenEndPoint = 'https://kingtote.vonigo.com/api/v1/security/login/?appVersion=1company=Vonigo&password=a8b58ed9ef2fffb4a5ddb88626fa2727&userName=King.tote'
  const tokenEndPoint = 'https://kingtote.vonigo.com/api/v1/security/login/?appVersion=1company=Vonigo&password=de1485461568b6ce64c6687e98a9e194&userName=API.user'
  
  const [tokenGenerated, setTokenGenerated] = useState(null);
  const [franchises, setFranchises] = useState(null);
  const [zips, setZips] = useState(null);
  const [serviceTypes, setServiceTypes] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.get(tokenEndPoint)
        .then(res => {
          //console.log('Response: ', res)
          if(res.data !== null && res.data.securityToken){
            //console.log('tokenGenerated: ', res.data.securityToken)
            setTokenGenerated(res.data.securityToken);
            setLoad(true);

            dispatch({
              type: "SET_TOKEN",
              payload: res.data.securityToken
            })
          }
        })
        .catch(err => {
            setError(err.message);
            setLoad(true)
        })
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

        setFormData({
          ...formData,
          'securityToken': tokenGenerated
        });

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
