'use client';
import { useRouter } from "next/navigation";
import Heading from "./components/Heading";
import Button from "./components/Button";
import ClientOnly from "./components/ClientOnly";

interface EmptyStateProps { // Corrected the interface name to be more conventional
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState = ({ title = "No exact matches!", subtitle = "Try changing or removing some of your filters", showReset }: EmptyStateProps) => {
    const router = useRouter();
    return (
        <ClientOnly>
            <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
                <Heading title={title} subtitle={subtitle} center />
                <div className="w-48 mt-4">
                    {showReset && (
                        <Button outline label="Remove all filters" onClick={() => router.push('/')}>
                        </Button>
                    )}
                </div>
            </div>
        </ClientOnly>
    );
};

export default EmptyState;
