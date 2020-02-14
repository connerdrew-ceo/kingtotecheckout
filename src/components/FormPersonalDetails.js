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

export const FormPersonalDetails = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
  const [toteBoxSelected, setToteBoxSelected] = useState(false);
  const [toteCarSelected, setToteCarSelected] = useState(false);

  useEffect(() => {

    const setToteIndex = () => {
      const matches = document.querySelectorAll('.toteBoxSlection')
      let prevTote = 0

      matches.forEach((item, index) => {
        item.addEventListener('click', event => {
          matches[prevTote].classList.remove('toteActive')
          matches[index].classList.add('toteActive')
          prevTote = index
          setToteBoxSelected(index)
        })
      })
    }
    const setCartIndex = () => {
      const matchesCart = document.querySelectorAll('.cartSelection')
      let prevCart = 0

      matchesCart.forEach((item, index) => {
        item.addEventListener('click', event => {
          matchesCart[prevCart].classList.remove('toteActive')
          matchesCart[index].classList.add('toteActive')
          prevCart = index
          setToteCarSelected(index)
        })
      })
    }
    setToteIndex()
    setCartIndex()
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

              <div className="toteBoxes">
                <div className="eachToteItem toteBoxSlection">
                  <p>1 Week rental</p>
                  <span className="price">$90</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>2 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>3 Week rental</p>
                  <span className="price">$145</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>4 Week rental</p>
                  <span className="price">$170</span>
                </div>
              </div>
              <p className="bottomCentered">$35 each additional week</p>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">35 Totes</label>
              <p>2 bedroom (250-500 sq ft)</p>
              <div className="toteBoxes">
                <div className="eachToteItem toteBoxSlection">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
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
                <div className="eachToteItem toteBoxSlection">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
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
                <div className="eachToteItem toteBoxSlection">
                  <p>1 Week rental</p>
                  <span className="price">$120</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>2 Week rental</p>
                  <span className="price">$160</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
                  <p>3 Week rental</p>
                  <span className="price">$195</span>
                </div>
                <div className="eachToteItem toteBoxSlection">
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
                <div className="eachToteItem cartSelection">
                  <p>1 Week rental</p>
                  <span className="price">$8</span>
                </div>
                <div className="eachToteItem cartSelection">
                  <p>2 Week rental</p>
                  <span className="price">$16</span>
                </div>
                <div className="eachToteItem cartSelection">
                  <p>3 Week rental</p>
                  <span className="price">$24</span>
                </div>
                <div className="eachToteItem cartSelection">
                  <p>4 Week rental</p>
                  <span className="price">$32</span>
                </div>
              </div>
            </div>

            <div className="formControl fullLenght">
              <label className="boldLabel">King Tote Wheels</label>
              <p>Easy-roller made to roll stacked totes</p>
              <div className="toteBoxes">
                <div className="eachToteItem cartSelection">
                  <p>1 Week rental</p>
                  <span className="price">$5</span>
                </div>
                <div className="eachToteItem cartSelection">
                  <p>2 Week rental</p>
                  <span className="price">$10</span>
                </div>
                <div className="eachToteItem cartSelection">
                  <p>3 Week rental</p>
                  <span className="price">$15</span>
                </div>
                <div className="eachToteItem cartSelection">
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

FormPersonalDetails.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
