import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Header } from './Header';
import { EachBookingComponent } from './bookingControls/EachBookingComponent'
import * as yup from 'yup';
import "react-day-picker/lib/style.css";

export const Scheduling = ({
    formData,
    setFormData,
    nextStep,
    prevStep
    }) => {
        
    const [direction, setDirection] = useState('back');

    const validationSchemaScheduling = yup.object({
        firstBooking: yup
          .string()
          .required('firstBooking is required'),
        lasttBooking: yup
          .string()
          .required('lasttBooking is required'),
      });

    const updateStateSchedulingStart = ( dateData ) => {

        if(dateData.kind === 'start'){
            setFormData({
                ...formData,
                'dateDropOff': dateData.stringDate
            });
        }else{
            setFormData({
                ...formData,
                'datePickUp': dateData.stringDate
            });
        }
    }
    const updateStateSchedulingTime = (timeData) => {

        if(timeData.kind === 'start'){
            setFormData({
                ...formData,
                'timeRangeDropStart': timeData.stringTimeStart,
                'timeRangeDropEnd': timeData.stringTimeEnd
            });
        }else{
            setFormData({
                ...formData,
                'timeRangePickStart': timeData.stringTimeStart,
                'timeRangePickEnd': timeData.stringTimeEnd
            });
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
                    console.log(values)
                    setFormData(values);
                    direction === 'back' ? prevStep() : nextStep();
                }}
                validationSchema={validationSchemaScheduling}
            >
            {({ errors, touched }) => (
                <Form>
                    <div className="formControl">
                        <label className="boldLabel">Select Drop-off Date/Time</label>
                        <EachBookingComponent 
                            updateStateSchedulingStart={updateStateSchedulingStart} 
                            updateStateSchedulingTime={updateStateSchedulingTime} 
                            controlType="start" 
                            currentDate={formData.dateDropOff}
                            startingTime={formData.timeRangeDropStart}
                            endingTime={formData.timeRangeDropEnd}
                            />

                        <Field 
                            name='firstBooking' 
                            placeholder="first booing"
                            />
                        {errors.firstBooking && touched.firstBooking && <div className="errorMessage">{errors.firstBooking}</div>}
                    </div>
                    <div className="formControl">
                        <label className="boldLabel">Select Pick-up Date/Time</label>
                        <EachBookingComponent 
                            updateStateSchedulingStart={updateStateSchedulingStart} 
                            updateStateSchedulingTime={updateStateSchedulingTime} 
                            controlType="end" 
                            currentDate={formData.datePickUp}
                            startingTime={formData.timeRangePickStart}
                            endingTime={formData.timeRangePickEnd}
                            />
                        <Field 
                            name='lasttBooking' 
                            placeholder="first booing"
                            />
                        {errors.lasttBooking && touched.lasttBooking && <div className="errorMessage">{errors.lasttBooking}</div>}
                    </div>
                    <div className="formControl submitControl fullLenght">
                    <button className="whiteBtn" type="submit" onClick={() => setDirection('back')}>
                        <span>Previous</span>
                    </button>
                    <button className="button" type="submit" onClick={() => setDirection('next')}>
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
