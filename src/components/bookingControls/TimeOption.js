import React, { useState } from 'react';

export const TimeOption = ({startAt, endAt, closeCalendar}) => {

    const [openConfirm, setOpenConform] = useState(false);
    let openConfirmClassList = 'timeOption'

    if(openConfirm){
        openConfirmClassList = 'timeOption openSelectedDetail'
    }
    return (
        <>
            <div className={openConfirmClassList}>
                <div className="timeAvailable" onClick={() => setOpenConform(true)}>
                    <p>{startAt} am - {endAt} am</p>
                </div>
                <div className="timeSelected">
                    <div className="timeDetail">
                        <p>{startAt} - {endAt}</p>
                    </div>
                    <button className="button global" onClick={closeCalendar}>
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        </>
    );
};

