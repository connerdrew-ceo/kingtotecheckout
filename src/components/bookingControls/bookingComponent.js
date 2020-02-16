import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayPicker from "react-day-picker";

export const BookingComponent = () => {
  
    
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const [openTimeLayerDrop, setOpenTimeLayerDrop] = useState(false);
  let layerClassListDrop = 'calendarAndTimeWrap'

  if(openTimeLayerDrop){
    layerClassListDrop = 'calendarAndTimeWrap timeOn'
  }

  const [openTimeLayerPick, setOpenTimeLayerPick] = useState(false);
  const [dateDropOff, setDateDropOff] = useState('');
  const [datePickUp, setDatePickUp] = useState('');
  let layerClassListPick = 'calendarAndTimeWrap'
  
  if(openTimeLayerPick){
    layerClassListPick = 'calendarAndTimeWrap timeOn'
  }
  
  const handleDayDropOff = (day, { selected }) => {

    setOpenTimeLayerDrop(true)
    setDateDropOff(day.toLocaleDateString(undefined, dateOptions))
    if(selected){
        console.log('selected ', selected);
    }
  }

  const handleDayPickUp = (day, { selected }) => {

    setOpenTimeLayerPick(true)

    setDatePickUp(day.toLocaleDateString(undefined, dateOptions))
    console.log(day.toLocaleDateString())
    
    if(selected){
        console.log('selected ', selected);
    }
  }

  return (
        <>
        <div className={layerClassListDrop}>
            <div className="calendarLayer">
                <DayPicker 
                    onDayClick={handleDayDropOff}
                />
            </div>
            <div className="timeLayer">
                <br/>
                <p className="dateSelected" onClick={() => setOpenTimeLayerDrop(false)}><span>&#60;</span>  {dateDropOff}</p>
                <div className="timeOptionsWrap">
                    <div className="timeOption">
                        <p>7:00 am - 9:00 am</p>
                    </div>
                    <div className="timeOption">
                        <p>7:30 am - 9:30 am</p>
                    </div>
                    <div className="timeOption">
                        <p>8:00 am - 10:00 am</p>
                    </div>
                    <div className="timeOption">
                        <p>8:30 am - 10:30 am</p>
                    </div>
                    <div className="timeOption">
                        <p>9:00 am - 11:00 am</p>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
};

