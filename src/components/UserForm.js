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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceArea: '17',
    dropOff: '84020',
    pickUp: '84020',
    locationType: '16',

    firstNameField: 'Main-FName',
    lastNameField: 'Main-LName',
    telField: '1234567890',
    emailField: 'Main-Email@main.co',
    sameAddressAsDropOff: false,
    billingAddressField: 'StreetAddress(Billing)',
    billingCityField: 'City(Billing)',
    billingStateField: 'State(Billing)',
    billingAddressZipField: '84020',

    addressDropOffField: 'StreetAddress(DropOff)',
    sameAsMainContactDropOff: true,
    cityDropOffField: 'City(DropOff)',
    stateDropOffField: 'State(DropOff)',
    zipCodeDropOff: '84020',
    textareaDropOff: 'Comments(DropOff)',

    addressPickUpField: 'StreetAddress(PickUp)',
    sameAsMainContactPickUp: true,
    cityPickUpField: 'City(PickUp)',
    statePickUpField: 'State(PickUp)',
    zipCodePickUp: '84020',
    textareaPickUp: 'Comments(PickUp)',

    firstNameFieldDifferentDrop: 'DropOff-FName',
    lastNameFieldDifferentDrop: 'DropOff-LName',
    telFieldDifferentDrop: 'DropOff-Telephone',
    emailFieldDifferentDrop: 'DropOff-Email@main.co',

    firstNameFieldDifferentPickUp: 'PickUp-FName',
    lastNameFieldDifferentPickUp: 'PickUp-LName',
    telFieldDifferentPickUp: 'PickUp-Telephone',
    emailFieldDifferentPickUp: 'PickUp-Email@main.co',

    cardHolderNameFiled: 'Cardholder-FName',
    cardNumberField: '232323232323',
    expirationDateField: '2323',
    cvcField: '123',
    billingZipCode: '84020',
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

    const generateToken = async () => {

      try {
        const res = await axios.get(tokenEndPoint)
        console.log(res.data);
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
