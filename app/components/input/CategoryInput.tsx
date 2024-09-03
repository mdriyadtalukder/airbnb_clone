import { LiaBell } from "react-icons/lia";

type categoryinputProps = {
    icon: IconType;
    label: string;
    selected: boolean;
    onClick: (value: string) => void
}
const CategoryInput = ({ icon: Icon, label, selected, onClick }: categoryinputProps) => {
    return (
        <div onClick={() => onClick(label)} className={`        rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
 ${selected ? 'border-black' : 'border-neutral-200'}`}>
            <Icon size={30}></Icon>
            <div className="font-semibold">
                {label}
            </div>
        </div>
    );
};

export default CategoryInput;