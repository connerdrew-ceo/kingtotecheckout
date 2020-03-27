import React, {useState} from 'react';
import { EachBox } from './EachBox'

export const ToteBoxesRow = ({trackKey, dataObj, updateSelectedBox}) => {
    // let dataObj1= dataObj.filter(item=>item.title!=='Additional Tote')
    console.log(dataObj)
    const [selectedBox, setSelectedBox] = useState(dataObj.indexActive);
    if(dataObj.title === 'Additional Tote'){
        return null
    }
    
    const changeSelectedBox = (key) => {
        if(selectedBox === key){
            setSelectedBox(null)
            updateSelectedBox({parent:trackKey, child:null})

        }else{
            setSelectedBox(key)
            updateSelectedBox({parent:trackKey, child:key})
        }
    }
    const boxesRender = dataObj.prices
    console.log(dataObj);
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
                <label className="boldLabel">{dataObj.title}</label>
                <p>{dataObj.sub}</p>
                <div className="toteBoxes">
                    {toteBoxes}
                </div>
                {dataObj.additionalWeek && <p className="bottomCentered">{dataObj.additionalWeek}</p>}
            </div>
        </>
    );
};

