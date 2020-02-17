import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Header';



const useStyles = makeStyles(theme => ({
  introWrap: {
    padding: '0 2%',
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export const FormToteDetails = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');

  const [toteBox25, setToteBox25] = useState(-1);
  const [toteBox35, setToteBox35] = useState(-1);
  const [toteBox50, setToteBox50] = useState(-1);
  const [toteBox70, setToteBox70] = useState(-1);

  const [heavyDutyCart, setHeavyDutyCart] = useState(-1);
  const [easyRollCart, setEasyRollCart] = useState(-1);
  
  useEffect(() => {

    const setToteIndex = () => {

      const matches = document.querySelectorAll('.toteBoxItem25')
      let prevTote25 = 0

      matches.forEach((item, index) => {
        item.addEventListener('click', event => {
          matches[prevTote25].classList.remove('toteActive')
          matches[index].classList.add('toteActive')
          prevTote25 = index
          setToteBox25(index)
        })
      })

      const matches35 = document.querySelectorAll('.toteBoxItem35')
      let prevTote35 = 0

      matches35.forEach((item, index) => {
        item.addEventListener('click', event => {
          matches35[prevTote35].classList.remove('toteActive')
          matches35[index].classList.add('toteActive')
          prevTote35 = index
          setToteBox35(index)
        })
      })

      const matches50 = document.querySelectorAll('.toteBoxItem50')
      let prevTote50 = 0

      matches50.forEach((item, index) => {
        item.addEventListener('click', event => {
          matches50[prevTote50].classList.remove('toteActive')
          matches50[index].classList.add('toteActive')
          prevTote50 = index
          setToteBox50(index)
        })
      })

      const matches70 = document.querySelectorAll('.toteBoxItem70')
      let prevTote70 = 0

      matches70.forEach((item, index) => {
        item.addEventListener('click', event => {
          matches70[prevTote70].classList.remove('toteActive')
          matches70[index].classList.add('toteActive')
          prevTote70 = index
          setToteBox70(index)
        })
      })

      const matchesHeavyDutyCart = document.querySelectorAll('.heavyDutyCart')
      let prevHeavyDuty = 0

      matchesHeavyDutyCart.forEach((item, index) => {
        item.addEventListener('click', event => {
          matchesHeavyDutyCart[prevHeavyDuty].classList.remove('toteActive')
          matchesHeavyDutyCart[index].classList.add('toteActive')
          prevHeavyDuty = index
          setHeavyDutyCart(index)
        })
      })

      const matchesEasyRollCart = document.querySelectorAll('.easyRollCart')
      let prevEasyRoll = 0

      matchesEasyRollCart.forEach((item, index) => {
        item.addEventListener('click', event => {
          matchesEasyRollCart[prevEasyRoll].classList.remove('toteActive')
          matchesEasyRollCart[index].classList.add('toteActive')
          prevEasyRoll = index
          setEasyRollCart(index)
        })
      })
    }
    
    setToteIndex()
  }, [])

  return (
    <>
      <Header title='Enter Personal Details' step="Two"/>

      <div className="introWrap">
        <h2>Order details</h2>
        <p>Please select the applicable option(s) bellow.</p>
      </div>

      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
      >
        {({ errors, touched }) => (

          <Form className={classes.form}>

            <div className="formControl fullLenght">
              <label className="boldLabel">25 Totes</label>
              <p>1 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes toteBoxes25">
                <div className="eachToteItem toteBoxItem25">
                  <p>1 Week rental</p>
                  <span className="price">$90</span>
                </div>
                <div className="eachToteItem toteBoxItem25">
                  <p>2 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem toteBoxItem25">
                  <p>3 Week rental</p>
                  <span className="price">$145</span>
                </div>
                <div className="eachToteItem toteBoxItem25">
                  <p>4 Week rental</p>
                  <span className="price">$170</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">35 Totes</label>
              <p>2 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes toteBoxes25">
                <div className="eachToteItem toteBoxItem35">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem toteBoxItem35">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem toteBoxItem35">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem toteBoxItem35">
                  <p>4 Week rental</p>
                  <span className="price">$230</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">50 Totes</label>
              <p>3 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes">
                <div className="eachToteItem toteBoxItem50">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem toteBoxItem50">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem toteBoxItem50">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem toteBoxItem50">
                  <p>4 Week rental</p>
                  <span className="price">$230</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">70 Totes</label>
              <p>4 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes">
                <div className="eachToteItem toteBoxItem70">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem toteBoxItem70">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem toteBoxItem70">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem toteBoxItem70">
                  <p>4 Week rental</p>
                  <span className="price">$230</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
            </div>

            {/* Tote cars */}

            <div className="formControl fullLenght">
              <label className="boldLabel">King Tote Hand Cart</label>
              <p>Heavy duty tubular steel car with tires</p>
              <div className="toteBoxes">
                <div className="eachToteItem heavyDutyCart">
                  <p>1 Week rental</p>
                  <span className="price">$8</span>
                </div>
                <div className="eachToteItem heavyDutyCart">
                  <p>2 Week rental</p>
                  <span className="price">$16</span>
                </div>
                <div className="eachToteItem heavyDutyCart">
                  <p>3 Week rental</p>
                  <span className="price">$24</span>
                </div>
                <div className="eachToteItem heavyDutyCart">
                  <p>4 Week rental</p>
                  <span className="price">$32</span>
                </div>
              </div>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">King Tote Wheels</label>
              <p>Easy-roller made to roll stacked totes</p>
              <div className="toteBoxes">
                <div className="eachToteItem easyRollCart">
                  <p>1 Week rental</p>
                  <span className="price">$5</span>
                </div>
                <div className="eachToteItem easyRollCart">
                  <p>2 Week rental</p>
                  <span className="price">$10</span>
                </div>
                <div className="eachToteItem easyRollCart">
                  <p>3 Week rental</p>
                  <span className="price">$15</span>
                </div>
                <div className="eachToteItem easyRollCart">
                  <p>4 Week rental</p>
                  <span className="price">$20</span>
                </div>
              </div>
            </div>

            <div className="formControl submitControl fullLenght">
              <button className="button global whiteBtn" type="submit" onClick={() => setDirection('back')}>
                <span>Previous</span>
              </button>
              <button className="button global" type="submit" onClick={() => setDirection('next')}>
                <span>Next</span>
              </button>
            </div>
          
          </Form>
        )}
      </Formik>
    </>
  );
};

FormToteDetails.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
