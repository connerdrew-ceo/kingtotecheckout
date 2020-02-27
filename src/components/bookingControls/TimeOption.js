import React from 'react';

export const TimeOption = ({listClasses, trackKey, startAt, endAt, changeSelectedTime, closeCalendar}) => {

    const clickTimeOpt = () => {
        changeSelectedTime(trackKey)
    }
    return (
        <>
            <div className={listClasses}>
                <div className="timeAvailable" onClick={() => clickTimeOpt()}>
                    <p>{startAt} pm - {endAt + 2} pm</p>
                </div>
                <div className="timeSelected">
                    <div className="timeDetail">
                        <p>{startAt} - {endAt + 2}</p>
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

