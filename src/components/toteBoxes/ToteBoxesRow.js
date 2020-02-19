import React, {useState} from 'react';

import { EachBox } from './EachBox'

export const ToteBoxesRow = ({trackKey, dataObj, updateSelectedBox, closeCalendar}) => {
    const [selectedBox, setSelectedBox] = useState(null);

    const changeSelectedBox = (key) => {
        (selectedBox === key) ? setSelectedBox(null) : setSelectedBox(key)

        updateSelectedBox({parent:trackKey, child:key})
    }

    const boxesRender = dataObj.prices
    let toteBoxes = boxesRender.map((toteBox, index) => {
        return <EachBox 
                    listClasses={selectedBox === index ? 'eachToteItem toteActive' : 'eachToteItem'}
                    key={index} 
                    trackKey={index}
                    dataBox={toteBox}
                    changeSelectedBox={changeSelectedBox}
                />
    });

    return (
        <>
            <div className="formControl fullLenght">
                <label className="boldLabel">{dataObj.title} - {trackKey}</label>
                <p>{dataObj.sub}</p>
                <div className="toteBoxes">
                    {toteBoxes}
                </div>
                {dataObj.additionalWeek && <p className="bottomCentered">{dataObj.additionalWeek}</p>}
            </div>
        </>
    );
};

