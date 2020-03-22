import React, { useState, useEffect, useContext } from 'react';
import DayPicker from "react-day-picker";
import axios from "axios";
import { TimeOption } from "./TimeOption";
import { GlobalContext } from "../../context/FormContext";

let dateAvailable = new Date();
let dateSuggested = '';
let theYear = new Date().getFullYear();
let theMonth = new Date().getMonth();
let formatedDay = '';
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateOptionsNumeric = { year: 'numeric', month: '2-digit', day: '2-digit' };

export const EachBookingComponent = ({  formData,
                                        controlType, 
                                        updateStateSchedulingStart, 
                                        updateStateSchedulingTime, 
                                        currentDate, 
                                        startingTime, 
                                        endingTime, 
                                        enabled }) => {

    const { state, dispatch } = useContext( GlobalContext );
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTimeEnd, setSelectedTimeEnd] = useState(endingTime);
    const [dateDropOff, setDateDropOff] = useState('');
    const [openTimeLayerDrop, setOpenTimeLayerDrop] = useState(false);
    const [showResumeInfo, setShowResumeInfo] = useState(false);
    const [timeSpacesAvailable, setTimeSpacesAvailable] = useState(null);
    
    const addWeeks = (dt, n) => {
        if(n){
            return new Date(dt.setDate(dt.getDate() + (n * 7) ));
        }
        return new Date(dt.setDate(dt.getDate() + 1));
    }

    const getNumberOfWeeks = () => {
        let maxNumber = 0
        let arrSwitch = []
        let bufferToteBoxesGlobalInfo = state.toteBoxesContent

        if(!bufferToteBoxesGlobalInfo){
            return maxNumber;
        }

        bufferToteBoxesGlobalInfo.forEach((eachElem) => {
            if(eachElem.indexActive !== null) arrSwitch.push(eachElem.indexActive)
        });

        arrSwitch.forEach((eachDate) => {
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

    const convertTo12HoursFormat = ( time ) => {

        if(time === null) return

        time = time.split(':')
        time = (time[0].length === 1) ? '0'+time[0]+':' + time[1] : time[0]+':' + time[1]

        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

        if (time.length > 1) { 
            time = time.slice (1)
            time[5] = +time[0] < 12 ? 'am' : 'pm'
            time[0] = +time[0] % 12 || 12
        }

        return time.join('')
    }

    const timeConverter = (timeString, endTime) => {
        let num = timeString;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        rminutes = (rminutes === 30 ) ? rminutes : '00'
        
        return (endTime) ? (rhours+2) + ":" + rminutes : rhours + ":" + rminutes;
    }

    const handleDayClick = (day) => {

        let availabilityEndPoint = ''
        let arrayFiltered = []
        let dateNow = (new Date( day ).getTime() / 1000).toFixed(0)
        dateNow = parseInt(dateNow)
        let weekInSeconds = getNumberOfWeeks()

        weekInSeconds = ( weekInSeconds * 7 ) * 24 * 60 * 60;

        let dateWithWeeks = parseInt(dateNow) + parseInt(weekInSeconds)

        formatedDay = day.toLocaleDateString(undefined, dateOptionsNumeric)
        formatedDay = formatedDay.split('/')
        formatedDay = formatedDay[2] + formatedDay[0] + formatedDay[1]

        setTimeSpacesAvailable(null)
        theYear = day.getFullYear()
        theMonth = day.getMonth()
        
        if(controlType === 'start'){

            

            availabilityEndPoint = 'https://kingtote.vonigo.com/api/v1/resources/availability/?securityToken=' + 
                                    state.securityToken + '&method=0&pageNo=1&pageSize=100&duration=60&dateStart=' +
                                    dateNow + '&dateEnd=' + dateWithWeeks + '&zip=' + formData.dropOff + '&serviceTypeID=' +
                                    formData.locationType;

            axios.get(availabilityEndPoint)
                .then(res => {
                    if(res.data.Availability !== null && res.data.Availability !== undefined ){

                        arrayFiltered = res.data.Availability.filter(timeRow => timeRow.dayID === formatedDay)
                        setTimeSpacesAvailable(arrayFiltered)
                }
                })
                .catch(err => {
                    console.log('Error availability >>> ', err)
                })
        }else{

            dateWithWeeks = dateNow + 86400

            availabilityEndPoint = 'https://kingtote.vonigo.com/api/v1/resources/availability/?securityToken=' + 
                                    state.securityToken + '&method=0&pageNo=1&pageSize=100&duration=60&dateStart=' +
                                    dateNow + '&dateEnd=' + dateWithWeeks + '&zip=' + formData.pickUp + '&serviceTypeID=' +
                                    formData.locationType;

            axios.get(availabilityEndPoint)
                .then(res => {
                    if(res.data.Availability !== null && res.data.Availability !== undefined ){

                        arrayFiltered = res.data.Availability.filter(timeRow => timeRow.dayID === formatedDay)
                        setTimeSpacesAvailable(arrayFiltered)
                    }
                })
                .catch(err => {
                    console.log('Error availability >>> ', err)
                })
        }

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
        setSelectedTimeEnd( timeSpacesAvailable[key].startTime)
        updateStateSchedulingTime({ kind: controlType, 
                                    stringTimeStart: timeSpacesAvailable[key].startTime, 
                                    stringTimeEnd: timeSpacesAvailable[key].startTime})
        
        if(controlType === 'start'){
            dispatch({
                type: "SET_DROP_OFF",
                payload: timeSpacesAvailable[key]
            })
        }else{
            dispatch({
                type: "SET_PICK_UP",
                payload: timeSpacesAvailable[key]
            })
        }
    };

    const resetControl = () => {
        setShowResumeInfo(false)
        if(controlType === 'start'){
            updateStateSchedulingStart({kind: 'end', stringDate: null})
            setSelectedTime(null)
        }
    }

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
                        between { convertTo12HoursFormat( timeConverter(selectedTimeEnd)) } - { convertTo12HoursFormat( timeConverter(selectedTimeEnd, 'endTime')) }
                    </p>
                    <span className="iconEditTime" onClick={() => resetControl() }>
                    </span>
                </div>
                <div className={layerClassListDrop}>
                    <div className={calendarControlClasses}>
                        {(controlType==='start') ? (
                            <DayPicker 
                                onDayClick={handleDayClick}
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
                                onDayClick={handleDayClick}
                                month={new Date( theYear, theMonth)}
                                selectedDays={new Date(dateSuggested)}
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
                            {(() => {
                                if (timeSpacesAvailable !== null && timeSpacesAvailable.length > 0) {
                                    return (
                                        timeSpacesAvailable
                                            .map((timeRow, index) => {
                                                return <TimeOption 
                                                            listClasses={selectedTime === index ? 'timeOption openSelectedDetail' : 'timeOption'}
                                                            key={index} 
                                                            trackKey={index}
                                                            startAt={ convertTo12HoursFormat( timeConverter(timeRow.startTime)) } 
                                                            endAt={ convertTo12HoursFormat( timeConverter(timeRow.startTime, 'endTime')) } 
                                                            changeSelectedTime={changeSelectedTime}
                                                            closeCalendar={closeCalendar}
                                                        />
                                        })
                                    )
                                } else if (timeSpacesAvailable !== null && timeSpacesAvailable.length === 0) {
                                    return (
                                        <div className="calendarAndTimeWrap">
                                            <div className="timeAvailable">
                                                <p>No schedules available.</p>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="calendarAndTimeWrap">
                                            <div className="timeAvailable">
                                                <p>Loading...</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })() }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
