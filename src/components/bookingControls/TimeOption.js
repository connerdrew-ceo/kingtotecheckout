import React, { useState } from 'react';

export const TimeOption = (props) => {

    const [openConfirm, setOpenConform] = useState(false);
    let openConfirmClassList = 'timeOption'

    if(openConfirm){
        openConfirmClassList = 'timeOption openSelectedDetail'
    }

    return (
        <>
            <div className={openConfirmClassList}>
                <div className="timeAvailable" onClick={() => setOpenConform(true)}>
                    <p>{props.startAt} am - {props.endAt} am</p>
                </div>
                <div className="timeSelected">
                    <div className="timeDetail">
                        <p>{props.startAt} - {props.endAt}</p>
                    </div>
                    <button className="button global">
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        
        </>
    );
};

