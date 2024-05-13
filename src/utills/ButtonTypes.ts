import React from "react";

export type ButtonType = 'button' | 'submit' | 'reset' | undefined;

export type ButtonProps = {
    type?: ButtonType;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
}
