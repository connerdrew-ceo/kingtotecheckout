import React from 'react';

export const TimeOption = ({listClasses, trackKey, startAt, endAt, changeSelectedTime, closeCalendar}) => {

    const timeConverter = (timeString, endTime) => {
        let num = timeString;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        
        return (endTime) ? (rhours+2) + ":" + rminutes : rhours + ":" + rminutes;
    }

    const clickTimeOpt = () => {
        changeSelectedTime(trackKey)
    }
    return (
        <>
            <div className={listClasses}>
                <div className="timeAvailable" onClick={() => clickTimeOpt()}>
                    <p>{timeConverter(startAt)} - {timeConverter(startAt, 'endTime')}</p>
                </div>
                <div className="timeSelected">
                    <div className="timeDetail">
                        <p>{timeConverter(startAt)} - {timeConverter(startAt, 'endTime')}</p>
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

