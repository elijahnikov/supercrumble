// import clxsm from '@/lib/clsxm';
// import * as React from 'react';
// import { IconType } from 'react-icons/lib';

import React from 'react';

// type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
//     name: string;
//     label?: string;
//     icon?: any;
//     placeholder: string;
//     type: string;
//     handleChange: Function;
// };

// const InputField = ({
//     icon,
//     handleChange,
//     size: _,
//     ...props
// }: InputFieldProps) => {
//     let IconTag = icon ? icon : null;
//     return (
//         <div className='w-[100%] text-left'>
//             {props.label && (
//                 <div>
//                     <label className='mb-2 text-sm font-bold text-white'>
//                         {props.label}
//                     </label>
//                 </div>
//             )}
//             <input
//                 className='w-[100%] rounded border-gray-800 bg-crumble-200 py-2 px-3 text-white'
//                 {...props}
//                 type={props.type}
//                 spellCheck={false}
//                 placeholder={props.placeholder}
//                 onChange={(e) => handleChange(e)}
//             />
//         </div>
//     );
// };

// export default InputField;

enum InputFieldVariant {
    'primary',
}

type InputFieldProps = React.ComponentPropsWithRef<'input'> & {
    isDarkBg?: boolean;
    placeholder?: string;
    variant?: keyof typeof InputFieldVariant;
    label?: string;
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            children,
            className,
            disabled: inputDisabled,
            variant = 'primary',
            isDarkBg = false,
            placeholder,
            label,
            ...rest
        },
        ref
    ) => {
        const disabled = inputDisabled;

        return (
            <div className='w-[100%] text-left'>
                {label && (
                    <div>
                        <label className='mb-2 text-sm font-bold text-white'>
                            {label}
                        </label>
                    </div>
                )}
                <input
                    ref={ref}
                    disabled={disabled}
                    placeholder={placeholder}
                    className='w-[100%] rounded border-gray-800 bg-crumble-200 py-2 px-3 text-white'
                    {...rest}
                >
                    {children}
                </input>
            </div>
        );
    }
);

export default InputField;
