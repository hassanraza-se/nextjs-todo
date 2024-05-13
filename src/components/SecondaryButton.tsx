import React from 'react';
import {ButtonProps} from "@/utills/ButtonTypes";

function SecondaryButton({
     type = 'button',
     onClick,
     children,
     className,
     ...other
 }: ButtonProps) {
    return (
        <button type={type}
                className={"px-3 py-2 bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50 text-white font-semibold rounded dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 " + className}
                onClick={onClick}
                {...other}
        >
            {children}
        </button>
    );
}

export default SecondaryButton;