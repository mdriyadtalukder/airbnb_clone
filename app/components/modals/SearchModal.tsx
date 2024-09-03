'use client';
import useSearchModal from "@/app/hooks/useSearchModal";
import Modals from "./Modals";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../input/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../listing/Calender";
import Counter from "../input/Counter";
enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}
const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selected'
    });
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, []);
    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, []);
    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const queryString = qs.stringify(updatedQuery, { skipNull: true });
        const url = `/?${queryString}`;

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [bathroomCount, dateRange.endDate, dateRange.startDate, guestCount, location?.value, onNext, params, roomCount, router, searchModal, step]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search';
        }
        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where do you wanna go?" subtitle="Find the perfect location!">
            </Heading>
            <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)}>

            </CountrySelect>
            <hr />
            <Map center={location?.lating}></Map>
        </div>
    )
    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where do you plan to go?" subtitle="make sure everyone is free!">
                </Heading>
                <Calender value={dateRange} onChange={(value) => setDateRange(value.selected)}>

                </Calender>
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="More Information" subtitle="Find your perfact place!">
                </Heading>
                <Counter
                    title="Guests"
                    subtitle="How many guest are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}>

                </Counter>
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do u need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}>

                </Counter>
                <Counter
                    title="Bathroom"
                    subtitle="How many bathroom do u need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}>

                </Counter>
            </div>
        )
    }

    return (
        <Modals
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filter"
            actionLabel={actionLabel}
            SecondaryactionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        >

        </Modals>
    );
};

export default SearchModal;