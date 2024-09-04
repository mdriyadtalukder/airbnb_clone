import React from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
interface CalenderProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}
const Calender : React.FC<CalenderProps> = ({ value, onChange, disabledDates }) => {
    return (
        <DateRange
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction='vertical'
            showDateDisplay={false}
            maxDate={new Date()}
            disabledDates={disabledDates}
        />


    );
};

export default Calender;