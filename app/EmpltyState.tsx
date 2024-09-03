'use client';
import { useRouter } from "next/navigation";
import Heading from "./components/Heading";
import Button from "./components/Button";

interface EmpltyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}
const EmpltyState = ({ title = "No exact matches!", subtitle = "try changing or removing some of your filters", showReset }: EmpltyState) => {
    const route = useRouter();
    return (
        <div className="
        h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading title={title} subtitle={subtitle} center> </Heading>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button outline label="Remove all filters" onClick={() => route.push('/')}>

                    </Button>
                )}
            </div>
        </div>
    );
};

export default EmpltyState;