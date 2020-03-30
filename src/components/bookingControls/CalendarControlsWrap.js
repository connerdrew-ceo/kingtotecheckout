import React, { useState } from 'react';
import { EachBookingComponent } from './EachBookingComponent'

export const CalendarControlsWrap = ({
    formData,
    setFormData,
    origin,
    parentFunction
    }) => {
        const [schedulingSummaryLocal, setSchedulingSummaryLocal] = useState( (formData.schedulingSummary === null) ? 0 : formData.schedulingSummary);
        const [serviceWeeks, setServiceWeeks] = useState(0)
        const calculateDays = (endDate) => {
            let dt1Full = new Date(formData.dateDropOff)
            let dt2Full = new Date(endDate)
            dt1Full = Math.round(( dt2Full - dt1Full) / (1000*60*60*24))
            return dt1Full
        }
        const [enableCalendar, setEnableCalendar] = useState( (formData.dateDropOff === null) ? false : true );

        const [arrayDisabled, setArrayDisabled] = useState([])

        
        const updateStateSchedulingStart = ( dateData ) => {
            if(dateData.kind === 'start'){
                setEnableCalendar(true)
                setFormData({
                    ...formData,
                    'dateDropOff': dateData.stringDate
                });
                calculateDays(0)

                setArrayDisabled(dateData.arr)
                
            }else{
                if(dateData.stringDate === null){
                    setEnableCalendar(false)
                }else{
                    setSchedulingSummaryLocal( calculateDays(dateData.stringDate) )
                }
                setFormData({
                    ...formData,
                    'datePickUp': dateData.stringDate,
                    'schedulingSummary': calculateDays(dateData.stringDate)
                });
            }
            if(origin === 'Scheduling') parentFunction(dateData)
        }
        const updateStateSchedulingTime = (timeData) => {
            if(timeData.kind === 'start'){
                setFormData({
                    ...formData,
                    'timeRangeDropStart': timeData.stringTimeStart,
                    'timeRangeDropEnd': timeData.stringTimeEnd
                });
            }else{
                setFormData({
                    ...formData,
                    'timeRangePickStart': timeData.stringTimeStart,
                    'timeRangePickEnd': timeData.stringTimeEnd
                });
            }
        }
    return (
        <>
            <div className="formControl">
                <label className="boldLabelCalendar">Select Drop-off Date/Time</label>
                <EachBookingComponent
                    formData={formData}
                    updateStateSchedulingStart={updateStateSchedulingStart} 
                    updateStateSchedulingTime={updateStateSchedulingTime} 
                    controlType="start" 
                    currentDate={formData.dateDropOff}
                    startingTime={formData.timeRangeDropStart}
                    endingTime={formData.timeRangeDropEnd}
                    enabled={true}
                    setServiceWeeks={setServiceWeeks}
                    arrayDisabled={arrayDisabled}
                    />
            </div>
            <div className="formControl">
                <label className="boldLabelCalendar">Select Pick-up Date/Time</label>
                <EachBookingComponent
                    formData={formData}
                    updateStateSchedulingStart={updateStateSchedulingStart} 
                    updateStateSchedulingTime={updateStateSchedulingTime} 
                    controlType="end" 
                    currentDate={formData.datePickUp}
                    startingTime={formData.timeRangePickStart}
                    endingTime={formData.timeRangePickEnd}
                    enabled={enableCalendar}
                    setServiceWeeks={setServiceWeeks}
                    arrayDisabled={arrayDisabled}
                    />
            </div>
            <div className="formControl">
                <label className="boldLabelCalendar">Scheduling Summary</label>
                <p>{(schedulingSummaryLocal > 0) ? schedulingSummaryLocal : 0 } days total</p>
                {
                    (schedulingSummaryLocal > 0 && (schedulingSummaryLocal/serviceWeeks) > 7 ) ? (
                        <p><strong>You have selected more days than your original package and are subject to additional charges</strong></p>
                    ) : ''
                }
            </div>
            {/* {
            (origin === 'Scheduling') ? (
                <div className="formControl">
                    <label className="boldLabelCalendar">Scheduling Summary</label>
                    <p>{(schedulingSummaryLocal > 0) ? schedulingSummaryLocal : 0 } days total</p>
                    {
                        (schedulingSummaryLocal > 0 && (schedulingSummaryLocal/serviceWeeks) > 7 ) ? (
                            <p><strong>You have selected more days than your original package and are subject to additional charges</strong></p>
                        ) : ''
                    }
                </div>
            ) : ''
            } */}
        </>
    );
};
