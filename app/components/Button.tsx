"use client";
import { IconType } from "react-icons";
type ButtonProps = {
    label?: string;
    onClick?: (e:React.MouseEvent<HTMLButtonElement>)=>void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    Icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, small, Icon }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outline ? 'border-black' : 'border-rose-500'} ${outline ? "bg-white text-black" : "bg-rose-500 "} ${outline ? 'text-black' : 'text-white'} ${small ? 'py-1' : 'py-3'} ${small ? 'text-sm ' : 'text-md'} ${small ? 'font-light' : 'font-semibold'} ${small ? 'border-[1px]' : 'border-2'} `}>
            {
                Icon && (
                    <Icon size={24} className='absolute left-4 top-3'>

                    </Icon>
                )
            }
            {label}
        </button>
    );
};

export default Button;