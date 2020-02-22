import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Header } from './Header';
import "react-day-picker/lib/style.css";
import { CalendarControlsWrap } from './bookingControls/CalendarControlsWrap';

export const Scheduling = ({
    formData,
    setFormData,
    nextStep,
    prevStep
    }) => {
    const [direction, setDirection] = useState('back');
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
    let buttonClasses = (nextButtonDisabled) ? 'disabled' : ''
    if(formData.dateDropOff !== null && formData.datePickUp !== null) {
        buttonClasses = ''
    }
    const parentFunction = ( dateData ) => {
        if(dateData.kind === 'end'){
            if(dateData.stringDate === null){
                setNextButtonDisabled(true)
            }else{
                setNextButtonDisabled(false)
            }
        }
    }
    return (
        <>
        <Header title='Enter Personal Details' step="Three"/>
        <div className="introWrap">
            <h2>Scheduling</h2>
            <p>Please select a date and time to drop-off and pick-up totes</p>
        </div>
            <Formik
                initialValues={formData}
                onSubmit={values => {
                    direction === 'back' ? prevStep() : nextStep();
                }}
            >
            {() => (
                <Form>
                    <CalendarControlsWrap
                        formData={formData}
                        setFormData={setFormData}
                        origin="Scheduling"
                        parentFunction={parentFunction}
                    />
                    
                    <div className="formControl submitControl fullLenght">
                    <button className="whiteBtn" type="submit" onClick={() => prevStep()}>
                        <span>Previous</span>
                    </button>
                    <button className={buttonClasses} type="submit" onClick={() => setDirection('next')}>
                        <span>Next</span>
                    </button>
                    </div>
                </Form>
            )}
        </Formik>
        </>
    );
};

Scheduling.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
