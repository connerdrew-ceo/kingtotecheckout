import React, { useState } from 'react';

export const TimeOption = ({listClasses, trackKey, startAt, endAt, changeSelectedTime, closeCalendar}) => {

    const [openConfirm, setOpenConfirm] = useState(false);
    let openConfirmClassList = 'timeOption'

    const thisKey = trackKey

    if(openConfirm){
        openConfirmClassList = 'timeOption openSelectedDetail'
    }

    const clickTimeOpt = () => {
        changeSelectedTime(thisKey)
    }

    return (
        <>
            <div className={listClasses}>
                <div className="timeAvailable" onClick={() => clickTimeOpt()}>
                    <p>{startAt} am - {endAt} am</p>
                </div>
                <div className="timeSelected">
                    <div className="timeDetail">
                        <p>{startAt} - {endAt}</p>
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

