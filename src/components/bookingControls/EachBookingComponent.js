import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayPicker from "react-day-picker";
import { TimeOption } from "./TimeOption"

export const EachBookingComponent = ({ controlType, updateStateSchedulingStart, updateStateSchedulingTime, currentDate, startingTime, endingTime }) => {

    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTimeStart, setSelectedTimeStart] = useState(startingTime);
    const [selectedTimeEnd, setSelectedTimeEnd] = useState(endingTime);
    const [dateDropOff, setDateDropOff] = useState('');
    const [openTimeLayerDrop, setOpenTimeLayerDrop] = useState(false);
    const [showResumeInfo, setShowResumeInfo] = useState(false);
    
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = [
        {startAt: '7:00', endAt: '9:00'},
        {startAt: '7:30', endAt: '9:30'},
        {startAt: '8:00', endAt: '10:00'},
        {startAt: '8:30', endAt: '10:30'},
        {startAt: '9:00', endAt: '11:00'}
    ];

    let openDetailedBooking = 'bookingComponent'

    if(showResumeInfo){
        openDetailedBooking = 'bookingComponent openDetailedBooking'
    }
    
    let layerClassListDrop = 'calendarAndTimeWrap'

    if(openTimeLayerDrop){
        layerClassListDrop = 'calendarAndTimeWrap timeOn'
    }
    
    const handleDayDropOff = (day, { selected }) => {
        setOpenTimeLayerDrop(true)
        setDateDropOff(day.toLocaleDateString(undefined, dateOptions))
    };

    const closeCalendar = () => {
        setOpenTimeLayerDrop(false)
        setShowResumeInfo(true)
        updateStateSchedulingStart({kind: controlType, stringDate: dateDropOff})
    };

    const changeSelectedTime = (key) => {
        setSelectedTime(key)
        setSelectedTimeStart(timeOptions[key].startAt)
        setSelectedTimeEnd(timeOptions[key].endAt)
        updateStateSchedulingTime({kind: controlType, stringTimeStart: timeOptions[key].startAt, stringTimeEnd: timeOptions[key].endAt})
    };

    let tabsContent = timeOptions.map((timeOpt, index) => {
        return <TimeOption 
                    listClasses={selectedTime === index ? 'timeOption openSelectedDetail' : 'timeOption'}
                    key={index} 
                    trackKey={index}
                    startAt={timeOpt.startAt} 
                    endAt={timeOpt.endAt} 
                    changeSelectedTime={changeSelectedTime}
                    closeCalendar={closeCalendar}
                />
    });

    useEffect(() => {

        if(currentDate !== null){
            setOpenTimeLayerDrop(false)
            setShowResumeInfo(true)
            setDateDropOff(currentDate)
        }
    }, [])

    return (
        <>
            <div className={openDetailedBooking}>
                <div className="dateAndTimeSelected">
                    <p className="dateSelected">{dateDropOff}
                        <br/>
                        bwtween {selectedTimeStart} am - {selectedTimeEnd} am
                    </p>
                    <span className="iconEditTime" onClick={() => setShowResumeInfo(false)}>
                    </span>
                </div>
                <div className={layerClassListDrop}>
                    <div className="calendarLayer">
                        <DayPicker 
                            onDayClick={handleDayDropOff}
                            disabledDays={[
                                {
                                    before: new Date(),
                                },
                            ]}
                        />
                    </div>
                    <div className="timeLayer">
                        <br/>
                        <p className="dateSelected" onClick={() => setOpenTimeLayerDrop(false)}><span>&#60;</span>  {dateDropOff}</p>
                        <div className="timeOptionsWrap">
                            {tabsContent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

