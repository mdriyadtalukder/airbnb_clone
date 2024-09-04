'use client';

import { Range } from "react-date-range";
import Calender from "./Calender";
import Button from "../Button";

interface ListiongReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];

}
const ListiongReservation : React.FC<ListiongReservationProps>  = ({ price, dateRange, totalPrice, onChangeDate, onSubmit, disabled, disabledDates }) => {
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    $ {price}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr />
            <Calender value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)}>

            </Calender>
            <hr />
            <div className="p-4">
                <Button
                    disabled={disabled}
                    label="Reserve"
                    onClick={onSubmit}></Button>
            </div>
            <div className="p-4
            flex flex-row items-center justify-center font-semibold text-lg">
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
    );
};

export default ListiongReservation;