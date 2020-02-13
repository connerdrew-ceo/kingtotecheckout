
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import mainLogo from '../images/kt_logo_150.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    margin: 'auto'
  }
}));

export const Header = ({ title, step }) => {
  const classes = useStyles();
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
      {/* <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar> */}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};
