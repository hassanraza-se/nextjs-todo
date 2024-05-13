import React from 'react';

type InputType = React.HTMLInputTypeAttribute;

interface InputProps {
    type?: InputType;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    placeholder?: string;
    className?: string;
    id?: string;
    value?: string;
    [key: string]: unknown;
}

function Input({
   type = 'text',
   onChange,
   name,
   placeholder,
   id,
   className,
   value = '',
   ...other
}: InputProps) {
    return (
        <input id={id}
               className={"p-2 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 " + className}
               type={type}
               onChange={onChange}
               name={name}
               placeholder={placeholder}
               value={value}
               {...other}
        />
    );
}

export default Input;