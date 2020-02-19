
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mainLogo from '../images/kt_logo_150.png';

export const Header = ({ step }) => {
  const [currentStep, setCurrentStep] = useState('stepWrap step'+ step);

  useEffect(() => {
    setCurrentStep('stepWrap step'+ step)
  }, [step])

  return (
    <div>
      <div className="headerComponent">
        <a href="/">
          <img src={mainLogo} alt="golf"/>
        </a>
        <div className={currentStep}>
          <div className="eachStep first"></div>
          <div className="eachStep"></div>
          <div className="eachStep"></div>
          <div className="eachStep"></div>
          <div className="eachStep"></div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};
