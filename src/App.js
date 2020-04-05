import React from 'react';
import { UserForm } from './components/UserForm';
import 'react-credit-cards/lib/styles.scss'
import './App.scss';
// import {PageView, initGA} from './components/Tracking';
// const trackingGAID = 'UA-55582204-1';
// initGA(trackingGAID);
// PageView();
  
export const App = () => {
  return <UserForm />;
};

export default App;
