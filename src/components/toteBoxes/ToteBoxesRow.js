import React from 'react';

//export const ToteBoxesRow = ({listClasses, trackKey, startAt, endAt, changeSelectedTime, closeCalendar}) => {
export const ToteBoxesRow = () => {
    const clickTimeOpt = () => {
        //changeSelectedTime(trackKey)
    }

    return (
        <>
            <div className="formControl fullLenght">
                <label className="boldLabel">25 Totes</label>
                <p>1 bedroom (250-500 sq ft)</p>
                <div className="toteBoxes toteBoxes25">
                    <div className="eachToteItem toteBoxItem25">
                    <p>1 Week rental</p>
                    <span className="price">$90</span>
                    </div>
                    <div className="eachToteItem toteBoxItem25">
                    <p>2 Week rental</p>
                    <span className="price">$120</span>
                    </div>
                    <div className="eachToteItem toteBoxItem25">
                    <p>3 Week rental</p>
                    <span className="price">$145</span>
                    </div>
                    <div className="eachToteItem toteBoxItem25">
                    <p>4 Week rental</p>
                    <span className="price">$170</span>
                    </div>
                </div>
                <p className="bottomCentered">$35 each additional week</p>
            </div>
        </>
    );
};

