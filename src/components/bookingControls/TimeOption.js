import React from 'react';

export const TimeOption = (props) => {
  return (
    <>
        <div className="timeOption">
            <div className="timeAvailable">
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

