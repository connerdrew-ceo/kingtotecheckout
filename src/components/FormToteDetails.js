import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form } from 'formik';
import { Header } from './Header';
import { ToteBoxesRow } from './toteBoxes/ToteBoxesRow'
import { GlobalContext } from "../context/FormContext";

let toteBoxesData = []
let bufferObj = []

export const FormToteDetails = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  serviceTypes,
  resetCalendars,
  setResetCalendars
}) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [direction, setDirection] = useState('back');
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  let buttonClasses = ''
  buttonClasses = (nextButtonDisabled) ? 'disabled' : ''

  if (resetCalendars) {
    setFormData({
      ...formData,
      'dateDropOff': null,
      'datePickUp': null,
      'schedulingSummary': null,
      'timeRangeDropStart': null,
      'timeRangeDropEnd': null,
      'timeRangePickStart': null,
      'timeRangePickEnd': null,
    });

    setResetCalendars(false)
  }

  const switchButtons = () => {

    if (state.toteBoxesContent === null) return
    let arrSwitch = []
    //console.log('arrSwitch > ', arrSwitch)
    state.toteBoxesContent.forEach((eachElem) => {
      if (eachElem.indexActive !== null) arrSwitch.push(eachElem)
    });

    (arrSwitch.length) ? setNextButtonDisabled(false) : setNextButtonDisabled(true)
  }

  const setToteBoxesInfo = (values) => {

    setFormData({
      ...formData,
      'zipCodeDropOff': formData.dropOff,
      'zipCodePickUp': formData.pickUp,
      'promoCodeField': values.promoCodeField,
    });
    dispatch({
      type: "UPDATE_TOTE_BOXES",
      payload: toteBoxesData
    })
  };

  const updateSelectedBox = (keyObj) => {
    toteBoxesData[keyObj.parent].indexActive = keyObj.child
    switchButtons()
  };

  const addElement = (elem, nameKey, bufferElem) => {
    const found = elem.findIndex(el => el.title === nameKey);
    if (found !== -1) {
      let temporalArrPush = elem[found].prices
      temporalArrPush.push(bufferElem)
    }

    return (found === -1) ? true : false
  };

  const setObjectBeforeRenderRows = (objOrigin) => {

    if (state.toteBoxesContent !== null) return

    let arrToteRows = []
    objOrigin.forEach((eachElem) => {
      eachElem.forEach((eachElemLevel1) => {
        let bufferElem = {
          price: eachElemLevel1.value,
          week: eachElemLevel1.priceBlockSequence,
          legend: eachElemLevel1.priceBlock
        }
        if (addElement(arrToteRows, eachElemLevel1.priceItemView, bufferElem)) {
          let additionalPrice = '';
          switch (eachElemLevel1.priceItemView) {
            case '25 Totes':
              additionalPrice = '$5';
              break;
            case '35 Totes':
              additionalPrice = '$7';
              break;
            case '50 Totes':
              additionalPrice = '$9';
              break;
            case '70 Totes':
              additionalPrice = '$11';
              break;
            case '100 Totes':
              additionalPrice = '$13';
              break;
            case 'King Tote Hand Truck':
              additionalPrice = '$2';
              break;
            case 'King Tote Wheels':
              additionalPrice = '$1';
              break;
            default:
              break;
          }
          arrToteRows.push({
            title: eachElemLevel1.priceItemView,
            indexActive: null,
            sub: eachElemLevel1.descriptionHelp,
            additionalWeek: `${additionalPrice} each additional week`,
            prices: [bufferElem]
          })
        } else {
        }
      })
    })
    toteBoxesData = arrToteRows

    dispatch({
      type: "UPDATE_TOTE_BOXES",
      payload: arrToteRows
    })
  };

  useEffect(() => {

    if (serviceTypes) {
      bufferObj = []
      let serviceTypesRowLocal = serviceTypes.filter((serviceTypesRow) => {
        return serviceTypesRow.priceBlockSequence === 1 && serviceTypesRow.isActive === true && serviceTypesRow.isOnline === true;
      })
      bufferObj.push(serviceTypesRowLocal)
      let serviceTypesRowLocal2 = serviceTypes.filter((serviceTypesRow) => {
        return serviceTypesRow.priceBlockSequence === 2 && serviceTypesRow.isActive === true && serviceTypesRow.isOnline === true;
      })
      bufferObj.push(serviceTypesRowLocal2)
      let serviceTypesRowLocal3 = serviceTypes.filter((serviceTypesRow) => {
        return serviceTypesRow.priceBlockSequence === 3 && serviceTypesRow.isActive === true && serviceTypesRow.isOnline === true;
      })
      bufferObj.push(serviceTypesRowLocal3)
      let serviceTypesRowLocal4 = serviceTypes.filter((serviceTypesRow) => {
        return serviceTypesRow.priceBlockSequence === 4 && serviceTypesRow.isActive === true && serviceTypesRow.isOnline === true;
      })
      bufferObj.push(serviceTypesRowLocal4)
      setObjectBeforeRenderRows(bufferObj)
    }
    switchButtons()

  }, [serviceTypes])


  return (
    <>
      <Header title='Enter Personal Details' step="Two" />
      <div className="introWrap">
        <h2>Order details</h2>
        <p>Please select the applicable option(s) below.</p>
      </div>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setToteBoxesInfo(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
      >
        {() => (
          <Form>
            {(state.toteBoxesContent !== null) ? (
              state.toteBoxesContent.map((toteRow, index) => {
                return <ToteBoxesRow
                  key={index}
                  trackKey={index}
                  dataObj={toteRow}
                  updateSelectedBox={updateSelectedBox}
                />
              })
            ) : (
                <>
                  <div className="formControl fullLenght">
                    <label className="boldLabel">Loading...</label>
                    <p>Loading...</p>
                    <div className="toteBoxes loadingToteBoxes">
                      <div className="eachToteItem">
                        <p>Week rental</p>
                        <span className="price">$ price</span>
                      </div>
                      <div className="eachToteItem">
                        <p>Week rental</p>
                        <span className="price">$ price</span>
                      </div>
                      <div className="eachToteItem">
                        <p>Week rental</p>
                        <span className="price">$ price</span>
                      </div>
                      <div className="eachToteItem">
                        <p>Week rental</p>
                        <span className="price">$ price</span>
                      </div>
                    </div>
                    <p className="bottomCentered">Loading..</p>
                  </div>
                  <div className="formControl fullLenght">
                    <label className="boldLabel">Loading...</label>
                    <p>Loading...</p>
                    <div className="toteBoxes loadingToteBoxes">
                      <div className="eachToteItem">
                        <p>Week rental</p>
                        <span className="price">$ price</span>
                      </div>
                      <div className="eachToteItem">
                        <p>Week rental</p>
                        <span className="price">$ price</span>
                      </div>
                      <div className="eachToteItem">
                        <p>Week rental</p>
                        <span className="price">$ price</span>
                      </div>
                      <div className="eachToteItem">
                        <p>Week rental</p>
                        <span className="price">$ price</span>
                      </div>
                    </div>
                    <p className="bottomCentered">Loading..</p>
                  </div>

                </>
              )}
            <div className="formControl"></div>
            <div className="formControl submitControl fullLenght">
              <button className="whiteBtn" type="submit" onClick={() => setDirection('back')}>
                <span>Previous</span>
              </button>
              <button type="submit" className={buttonClasses} onClick={() => setDirection('next')}>
                <span>Next</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

