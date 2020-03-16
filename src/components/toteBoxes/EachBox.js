import React from 'react';

export const EachBox = ({listClasses, trackKey, dataBox, changeSelectedBox}) => {

    const clickBoxHandler = () => {
        changeSelectedBox(trackKey)
    }
    return (
        <>
            <div className={listClasses} onClick={() => clickBoxHandler()}>
                <p>{dataBox.week} Week rental</p>
                <span className="price">${ (dataBox.price % 1 !== 0) ? dataBox.price+'0' : dataBox.price  }</span>
            </div>
        </>
    );
};

