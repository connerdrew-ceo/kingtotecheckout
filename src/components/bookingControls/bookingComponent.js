import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayPicker from "react-day-picker";
import { TimeOption } from "./TimeOption"

export const BookingComponent = () => {
    
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const [openTimeLayerDrop, setOpenTimeLayerDrop] = useState(false);
  let layerClassListDrop = 'calendarAndTimeWrap'

  if(openTimeLayerDrop){
    layerClassListDrop = 'calendarAndTimeWrap timeOn'
  }

  const [dateDropOff, setDateDropOff] = useState('');
  const handleDayDropOff = (day, { selected }) => {

    setOpenTimeLayerDrop(true)
    setDateDropOff(day.toLocaleDateString(undefined, dateOptions))
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
                        <TimeOption startAt="7:00" endAt="9:00"/>
                        <TimeOption startAt="7:30" endAt="9:30"/>
                        <TimeOption startAt="8:00" endAt="10:00"/>
                        <TimeOption startAt="8:30" endAt="10:30"/>
                        <TimeOption startAt="9:00" endAt="11:00"/>
                    </div>
                </div>
            </div>
        </>
  );
};

