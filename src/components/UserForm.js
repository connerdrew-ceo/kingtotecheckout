import React, { useState } from 'react';
import { FormUserDetails } from './FormUserDetails';
import { FormToteDetails } from './FormToteDetails';
import { Scheduling } from './Scheduling';
import { AddressFormStep } from './AddressFormStep';
import { Confirm } from './Confirm';
import { Success } from './Success';

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
    schedulingSummary: null
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  switch (step) {
    case 1:
      return (
        <FormUserDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
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
