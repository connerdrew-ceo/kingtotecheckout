import React from 'react';

export const EachBox = ({listClasses, trackKey, dataBox, changeSelectedBox}) => {

    const clickBoxHandler = () => {
        changeSelectedBox(trackKey)
    }
    return (
        <>
            <div className={listClasses} onClick={() => clickBoxHandler()}>
                <p>{dataBox.week} {(dataBox.week > 1 ? 'Weeks' : 'Week')} rental</p>
                <span className="price">${ (dataBox.price % 1 !== 0) ? dataBox.price+'0' : dataBox.price  }</span>
            </div>
        </>
    );
};

