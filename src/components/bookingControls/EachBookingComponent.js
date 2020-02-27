import React, { useState, useEffect } from 'react';
import DayPicker from "react-day-picker";
import axios from "axios";
import { TimeOption } from "./TimeOption"

let dateAvailable = new Date();
let dateSuggested = new Date();
let dayStartRange = '';
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = [
    {startAt: '7:00', endAt: '9:00'},
    {startAt: '7:30', endAt: '9:30'},
    {startAt: '8:00', endAt: '10:00'},
    {startAt: '8:30', endAt: '10:30'},
    {startAt: '9:00', endAt: '11:00'}
];

export const EachBookingComponent = ({  formData,
                                        controlType, 
                                        updateStateSchedulingStart, 
                                        updateStateSchedulingTime, 
                                        currentDate, 
                                        startingTime, 
                                        endingTime, 
                                        enabled,
                                        tokenGenerated }) => {

    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTimeStart, setSelectedTimeStart] = useState(startingTime);
    const [selectedTimeEnd, setSelectedTimeEnd] = useState(endingTime);
    const [dateDropOff, setDateDropOff] = useState('');
    const [openTimeLayerDrop, setOpenTimeLayerDrop] = useState(false);
    const [showResumeInfo, setShowResumeInfo] = useState(false);

    const [timeSpacesAvailable, setTimeSpacesAvailable] = useState(null);
    
    const addWeeks = (dt, n) => {
        if(n){
            return new Date(dt.setDate(dt.getDate() + (n * 7) + 1 ));
        }
        dayStartRange = new Date(dt.setDate(dt.getDate()));
        return new Date(dt.setDate(dt.getDate() + 1));
    }

    const getNumberOfWeeks = () => {
        let maxNumber = 0
        let arrSwitch = []
        let bufferToteBoxesGlobalInfo = formData.toteBoxesGlobalInfo

        bufferToteBoxesGlobalInfo.map((eachElem) => {
            if(eachElem.indexActive !== null) arrSwitch.push(eachElem.indexActive)
        });

        arrSwitch.forEach(function(eachDate) {
            if (eachDate !== null && eachDate > maxNumber) {
                maxNumber = eachDate
            }
        });             
        return maxNumber + 1
    }

    let openDetailedBooking = 'bookingComponent'

    if(showResumeInfo){
        openDetailedBooking = 'bookingComponent openDetailedBooking'
    }
    
    let layerClassListDrop = 'calendarAndTimeWrap'

    if(openTimeLayerDrop){
        layerClassListDrop = 'calendarAndTimeWrap timeOn'
    }

    let calendarControlClasses = 'calendarLayer'

    if( !enabled){
        calendarControlClasses = 'calendarLayer disabled'

    }else{
        dateAvailable = (controlType === 'end') ?   addWeeks(new Date(formData.dateDropOff) )  
                                                :   new Date()

        dateSuggested = addWeeks(new Date(formData.dateDropOff), getNumberOfWeeks() )
        
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


        console.log('timeSpacesAvailable[key] >>> ', timeSpacesAvailable[key].startTime)
        setSelectedTime(key)
        setSelectedTimeStart(timeSpacesAvailable[key].startTime)
        setSelectedTimeEnd(timeSpacesAvailable[key].startTime)
        updateStateSchedulingTime({ kind: controlType, 
                                    stringTimeStart: timeSpacesAvailable[key].startTime, 
                                    stringTimeEnd: timeSpacesAvailable[key].startTime})
        // setSelectedTimeStart(timeOptions[key].startAt)
        // setSelectedTimeEnd(timeOptions[key].endAt)
        // updateStateSchedulingTime({ kind: controlType, 
        //                             stringTimeStart: timeOptions[key].startAt, 
        //                             stringTimeEnd: timeOptions[key].endAt})

        
    };

    const resetControl = () => {

        setShowResumeInfo(false)

        if(controlType === 'start'){
            updateStateSchedulingStart({kind: 'end', stringDate: null})
            setSelectedTime(null)
        }
    }

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

        let weekInSeconds = 7 * 24 * 60 * 60 * 1000;
        let dateNow = (new Date( Date.now() ).getTime() / 1000).toFixed(0) + '';
        let dateWithWeeks = (new Date( Date.now() + weekInSeconds ).getTime() / 1000 ).toFixed(0) + '';
        
        let availabilityEndPoint = 'https://kingtote.vonigo.com/api/v1/resources/availability/?securityToken=' + 
                                    tokenGenerated + '&method=0&pageNo=1&pageSize=100&duration=120&dateStart=' +
                                    dateNow + '&dateEnd=' + dateWithWeeks + '&zip=' + formData.dropOff + '&serviceTypeID=' +
                                    formData.locationType;



        if(controlType === 'start'){

          axios.get(availabilityEndPoint)
                .then(res => {
                  if(res.data !== null){
                      console.log('Response dropOff >>>> ', res.data.Availability)
                      setTimeSpacesAvailable(res.data.Availability)
                    // setFranchises(res.data.Franchises)
                  }
                  // setLoad(true);
                })
                .catch(err => {
                    console.log('Error >>>> ', err)
                    // setError(err.message);
                    // setLoad(true)
                })
        }else{

            weekInSeconds = 14 * 24 * 60 * 60 * 1000;
            
            availabilityEndPoint = 'https://kingtote.vonigo.com/api/v1/resources/availability/?securityToken=' + 
                                    tokenGenerated + '&method=0&pageNo=1&pageSize=100&duration=120&dateStart=' +
                                    dateNow + '&dateEnd=' + dateWithWeeks + '&zip=' + formData.pickUp + '&serviceTypeID=' +
                                    formData.locationType;

            axios.get(availabilityEndPoint)
            .then(res => {
                if(res.data !== null){
                    console.log('Response pickUp >>>> ', res.data.Availability)
                    
                    setTimeSpacesAvailable(res.data.Availability)
                // setFranchises(res.data.Franchises)
                }
                // setLoad(true);
            })
            .catch(err => {
                console.log('Error >>>> ', err)
                // setError(err.message);
                // setLoad(true)
            })
    
            
        }
        
    }, []);

    useEffect(() => {
        if(currentDate !== null){
            setOpenTimeLayerDrop(false)
            setShowResumeInfo(true)
            setDateDropOff(currentDate)
        }else{
            if(controlType === 'end'){
                setShowResumeInfo(false)
                setSelectedTime(null)
            }
        }
    }, [currentDate])

    return (
        <>
            <div className={openDetailedBooking}>
                <div className="dateAndTimeSelected">
                    <p className="dateSelected">{dateDropOff}
                        <br/>
                        bwtween {selectedTimeStart} am - {selectedTimeEnd} am
                    </p>
                    <span className="iconEditTime" onClick={() => resetControl() }>
                    </span>
                </div>
                <div className={layerClassListDrop}>
                    <div className={calendarControlClasses}>
                        {(controlType==='start') ? (
                            <DayPicker 
                                onDayClick={handleDayDropOff}
                                disabledDays={[
                                    {
                                        before: dateAvailable,
                                    },
                                    { daysOfWeek: [0] }
                                ]}
                            />
                        ) : (
                            <DayPicker 
                                className="endCalendar"
                                onDayClick={handleDayDropOff}
                                selectedDays={dateSuggested, {
                                    after: dayStartRange,
                                    before: dateSuggested,
                                }}
                                disabledDays={[
                                    {
                                        before: dateAvailable,
                                    },
                                    { daysOfWeek: [0] }
                                ]}
                            />
                        )}
                        <div className="hideCalendar"></div>
                    </div>
                    <div className="timeLayer">
                        <br/>
                        <p className="dateSelected" onClick={() => setOpenTimeLayerDrop(false)}><span>&#60;</span>  {dateDropOff}</p>
                        <div className="timeOptionsWrap">
                            {timeSpacesAvailable && (
                                timeSpacesAvailable.map((timeRow, index) => {

                                    let temporalTimeFormat = timeRow.startTime / 60

                                    return <TimeOption 
                                                listClasses={selectedTime === index ? 'timeOption openSelectedDetail' : 'timeOption'}
                                                key={index} 
                                                trackKey={index}
                                                startAt={timeRow.startTime / 60} 
                                                endAt={timeRow.startTime / 60} 
                                                changeSelectedTime={changeSelectedTime}
                                                closeCalendar={closeCalendar}
                                            />
                                })
                            )}

                            {/* {tabsContent} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
