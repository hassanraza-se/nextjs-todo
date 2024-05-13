import React from 'react';

type cardProps = {
    children: React.ReactNode;
    className?: string;
    innerRef?: (element: HTMLElement | null) => void;
    [key: string]: unknown;
}
function Card({ children, className, innerRef, ...other }: cardProps) {
    return (
        <div ref={innerRef} className={"rounded shadow-lg border border-gray-300 " + className} {...other}>
            {children}
        </div>
    );
}

export default Card;