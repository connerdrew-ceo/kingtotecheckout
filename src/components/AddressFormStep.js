import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux'


export const AddressFormStep = ({
    formData,
    setFormData,
    nextStep,
    prevStep
    }) => {
    const [direction, setDirection] = useState('back');

  return (
    <>
      <Header title='Enter Personal Details' step="Four" />

      <div className="introWrap">
        <h2>Your Details</h2>
        <p>Please fill out your contact information as Delivery and Pick-Up addresses</p>

        
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
                <h3>Main Contact Information</h3>
                <label htmlFor="nameImput">First Name</label>
                <input type="text" name="name" placeholder="Jane" className="form-control" id="nameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="lastNameImput">Last Name</label>
                <input type="text" name="lastName" placeholder="Doe" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="nameImput">Phone</label>
                <input type="tel" name="name" placeholder="(555) 555 555" className="form-control" id="nameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="lastNameImput">Email</label>
                <input type="email" name="lastName" placeholder="hello@hello.com" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>



            <div className="formControl">
                <h3>Drop-off Address</h3>
                <label htmlFor="nameImput">Street Address</label>
                <input type="text" name="name" placeholder="Street Address" className="form-control" id="nameImput" />
            </div>
            <div className="formControl">
                <h3>Drop-off Contact</h3>
              <div className="ratioWrap">
                <input type="radio" id="locationResidential" name="location" value="0"/>
                <label htmlFor="locationResidential">Residential</label>
              </div>
              
            </div>

            <div className="formControl">
                <label htmlFor="lastNameImput">City</label>
                <input type="text" name="lastName" placeholder="City" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="lastNameImput">State</label>
                <input type="text" name="lastName" placeholder="State" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>


            <div className="formControl">
                <h3>Pick-up Address</h3>
                <label htmlFor="nameImput">Street Address</label>
                <input type="text" name="name" placeholder="Street Address" className="form-control" id="nameImput" />
            </div>
            <div className="formControl">
                <h3>Pick-up Contact</h3>
              <div className="ratioWrap">
                <input type="radio" id="locationResidential" name="location" value="0"/>
                <label htmlFor="locationResidential">Residential</label>
              </div>
              
            </div>

            <div className="formControl">
                <label htmlFor="lastNameImput">City</label>
                <input type="text" name="lastName" placeholder="City" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl">
                <label htmlFor="lastNameImput">State</label>
                <input type="text" name="lastName" placeholder="State" className="form-control" id="lastNameImput" />
            </div>
            <div className="formControl"></div>

            <div className="formControl submitControl fullLenght">
              <button className="button global whiteBtn" type="submit" onClick={() => setDirection('back')}>
                <span>Previous</span>
              </button>
              <button className="button global" type="submit" onClick={() => setDirection('back')}>
                <span>Next</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

AddressFormStep.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

