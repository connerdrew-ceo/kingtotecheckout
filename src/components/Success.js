import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Header';

const useStyles = makeStyles(theme => ({
  textCenter: {
    textAlign: 'center'
  }
}));

export const Success = () => {
  const classes = useStyles();
  return (
    <div className={classes.textCenter}>
      <Header title='Success' step="Five" />
      <h1>Thank You For Your Submission</h1>
    </div>
  );
};
