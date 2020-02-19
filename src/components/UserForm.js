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
    locationType:'',
    firstName: '',
    lastName: '',
    toteBoxes:[
      {name: 'box25totes', weeks: null},
      {name: 'box35totes', weeks: null},
      {name: 'box50totes', weeks: null},
      {name: 'box70totes', weeks: null},
      {name: 'handleCart', weeks: null},
      {name: 'kingcart', weeks: null},
    ],
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
        <Confirm formData={formData} nextStep={nextStep} prevStep={prevStep} />
      );
    default:
      return <Success />;
  }
};
