'use client';
import { useEffect } from "react";
import EmpltyState from "./EmpltyState";

interface ErrorStateProps {
    error: Error;
}
const Error = ({ error }: ErrorStateProps) => {
    useEffect(() => {
        console.error(error);
    }, [error])
    return (
        <EmpltyState title="Uh Oh!" subtitle="Something went wrong!">

        </EmpltyState>
    );
};

export default Error;