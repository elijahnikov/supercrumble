import * as React from 'react';
import { IconType } from 'react-icons/lib';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label?: string;
    icon?: any;
    placeholder: string;
    type: string;
    handleChange: Function;
};

const InputField = ({ icon, size: _, ...props }: InputFieldProps) => {
    let IconTag = icon ? icon : null;
    return (
        <div className='w-[100%] text-left'>
            {props.label && (
                <div>
                    <label className='mb-2 text-sm font-bold text-white'>
                        {props.label}
                    </label>
                </div>
            )}
            <input
                className='w-[100%] rounded border-gray-800 bg-crumble-200 py-2 px-3 text-gray-700'
                {...props}
                type={props.type}
                spellCheck={false}
                placeholder={props.placeholder}
                onChange={(e) => props.handleChange(e)}
            />
        </div>
    );
};

export default InputField;
