'use client'
interface ListCategoryProps {
    label: string;
    description: string;
}
const ListCategory = ({ label, description }: ListCategoryProps) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                    <div className="font-light text-neutral-500">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCategory;