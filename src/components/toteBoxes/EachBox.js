import React from 'react';

export const EachBox = ({listClasses, trackKey, dataBox, changeSelectedBox}) => {

    const clickBoxHandler = () => {
        changeSelectedBox(trackKey)
    }
    return (
        <>
            <div className={listClasses} onClick={() => clickBoxHandler()}>
                <p>{dataBox.week} Week rental</p>
                <span className="price">${dataBox.price}</span>
            </div>
        </>
    );
};

