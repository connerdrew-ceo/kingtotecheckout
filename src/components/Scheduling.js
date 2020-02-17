import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Header } from './Header';
import { BookingComponent } from './bookingControls/BookingComponent'
import "react-day-picker/lib/style.css";


export const Scheduling = ({
    formData,
    setFormData,
    nextStep,
    prevStep
    }) => {
    const [direction, setDirection] = useState('back');

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
            setFormData(values);
            direction === 'back' ? prevStep() : nextStep();
            }}
        >
            {({ errors, touched }) => (
            <Form>
                <div className="formControl">
                    <label className="boldLabel">Select Drop-off Date/Time</label>
                    <BookingComponent />
                </div>
                <div className="formControl">
                    <label className="boldLabel">Select Pick-up Date/Time</label>
                    <BookingComponent />
                </div>
                <div className="formControl submitControl fullLenght">
                <button className="button global whiteBtn" type="submit" onClick={() => setDirection('back')}>
                    <span>Previous</span>
                </button>
                <button className="button global">
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
