import React from 'react';
import ReactDOM from 'react-dom';
import FormProvider from './context/FormContext'
import './index.css';
import App from './App';

ReactDOM.render(
    <FormProvider>
        <App />
    </FormProvider>
, document.getElementById('root'));
