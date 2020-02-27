import React from 'react';

export const TimeOption = ({listClasses, trackKey, startAt, endAt, changeSelectedTime, closeCalendar}) => {

    const addFormatToTime = (timeString, type) => {

        if(type) {
            return (timeString >= 12) ? timeString+ ':00 pm' : timeString+ ':00 am'
        }
        return (timeString >= 12) ? timeString+ ' pm' : timeString+ ' am'

    }

    const clickTimeOpt = () => {
        changeSelectedTime(trackKey)
    }
    return (
        <>
            <div className={listClasses}>
                <div className="timeAvailable" onClick={() => clickTimeOpt()}>
                    <p>{addFormatToTime(startAt, 'long')} - {addFormatToTime(startAt, 'long')}</p>
                </div>
                <div className="timeSelected">
                    <div className="timeDetail">
                        <p>{addFormatToTime(startAt)} - {addFormatToTime(startAt)}</p>
                    </div>
                    <button className="button global" onClick={(e) => {
                        e.preventDefault()
                        closeCalendar()
                        }}>
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        </>
    );
};

