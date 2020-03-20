import React, {useContext} from 'react';
import { Header } from './Header';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { GlobalContext } from "../context/FormContext";


let serviceTypeAndZip = null

export const FormUserDetails = ({ formData, 
                                  setFormData, 
                                  nextStep, 
                                  franchises, 
                                  zipCodes, 
                                  serviceTypes, 
                                  setServiceTypes }) => {

  let serviceAreaValue = ''

  const { state, dispatch } = useContext(GlobalContext);
  
  const validationSchemaFirstStep = yup.object({
    locationType: yup
      .string()
      .required('Pick up is required'),
    serviceArea: yup
      .string()
      .required('Service area is required'),
    pickUp: yup
      .number()
      .positive()
      .integer()
      .required('Pick up is required'),
  });
  
  const validateServideArea = value => {

    let error;
    if (!value) {
      error = 'Service area is required';
    } else {
      serviceAreaValue = parseInt(value) 
    }
    return error;
  };

  const zipCodeFilter = ( zipInteger ) => {
    let zipString = zipInteger + ''
    let zipCodeDropExist = zipCodes.filter(item => item.zip === zipString)
    return zipCodeDropExist
  };

  const toteBoxesRequest = ( zipValue, locationId ) => {

    if(serviceTypeAndZip === locationId+ '' +zipValue ) return

    dispatch({
      type: "UPDATE_TOTE_BOXES",
      payload: null
    })

    let priceListsEndPoint = 'https://kingtote.vonigo.com/api/v1/data/priceLists/?securityToken='+ state.securityToken +
                          '&method=2&zipCode=' + zipValue + '&serviceTypeID='+ locationId +
                          '&pageNo=1&pageSize=500'

      axios.get(priceListsEndPoint)
            .then(res => {
              if(res.data !== null){
                //console.log('res.data >> ', res.data)
                setServiceTypes(res.data.PriceItems)

                serviceTypeAndZip = locationId+ '' +zipValue
              }
            })
            .catch(err => {
              console.log('Error >> ', err)
            })
  };

  const validateZipCode = value => {
    let stringValue = value + ''
    let zipResult = ''
    let error;
      if (!value) {
        error = 'postal code is required';
      } else if (stringValue.length > 5) {
        error = 'postal code is 5 digits';
      } else if (stringValue.length < 5) {
        error = 'postal code is 5 digits';
      } else if (stringValue.length === 5) {
        zipResult = zipCodeFilter(value)
        if(zipResult.length > 0 && zipResult[0].franchiseID === serviceAreaValue){
          //console.log('perfect')
        } else {
          error = 'this code is out of the service area'
        }
      }
      return error;
  };

  return (
    <>
      <Header title='Enter Personal Details' step="One" />

      <div className="introWrap">
        <h2>Welcome</h2>
        <p>Get started by selecting a service area to verify we service your zip codes.</p>
      </div>

      <Formik
        initialValues={formData}
        onSubmit={values => {
          toteBoxesRequest( values.dropOff, values.locationType );
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchemaFirstStep}
        >
        {({ errors, touched }) => (
          <Form>
            <div className="formControl">
              <label htmlFor="nameImput">Service Area</label>
              <Field 
                as="select" 
                name="serviceArea"
                validate={validateServideArea}
                >
                  <option value="">select a service area</option>
                  {(franchises) ? (
                      franchises.map(p => <option key={p.franchiseID} value={p.franchiseID}>{p.franchiseName}</option>)
                  ) : ''
                  }
              </Field>
              {errors.serviceArea && touched.serviceArea && <div className="errorMessage">{errors.serviceArea}</div>}
            </div>
            <div className="formControl">
              
            </div>
            <div className="formControl">
              <label htmlFor="dropOff">Drop-off Zip Code</label>
              <Field 
                name='dropOff' 
                placeholder="zip code"
                type="number"
                validate={validateZipCode}
                />
                {errors.dropOff && touched.dropOff && <div className="errorMessage">{errors.dropOff}</div>}
            </div>
            <div className="formControl">
              <label htmlFor="pickUp">Pick-up Zip Code</label>
              <Field 
                name='pickUp' 
                placeholder="zip code"
                type="number"
                validate={validateZipCode}
                />
                {errors.pickUp && touched.pickUp && <div className="errorMessage">{errors.pickUp}</div>}
            </div>
            <div className="formControl">
              <label htmlFor="locationResidential">Location type</label>
              <div className="ratioWrap">
                <Field 
                  id="locationResidential"
                  name='locationType'
                  type="radio"
                  value="16"
                />
                <label htmlFor="locationResidential">Residential</label>
              </div>
              <div className="ratioWrap">
                <Field 
                  id="locationCommertial"
                  name='locationType'
                  type="radio"
                  value="15"
                />
                <label htmlFor="locationCommertial">Commertial</label>
              </div>
              {errors.locationType && touched.locationType && <div className="errorMessage">{errors.locationType}</div>}
            </div>
            <div className="formControl submitControl">
              <button className="button global" name="submit" type="submit">
                <span>Next</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
