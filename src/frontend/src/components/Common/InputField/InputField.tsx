import clxsm from '@/lib/clsxm';
import React from 'react';
import { IconType } from 'react-icons/lib';

enum InputFieldVariant {
    'primary',
}

type InputFieldProps = React.ComponentPropsWithRef<'input'> & {
    isDarkBg?: boolean;
    placeholder?: string;
    variant?: keyof typeof InputFieldVariant;
    label?: string;
    leftInfo?: string;
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            children,
            className,
            leftInfo,
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
            <div className={`${leftInfo && 'flex'} w-[100%] text-left`}>
                {label && (
                    <div>
                        <label className='ml-1 text-sm font-bold text-white'>
                            {label}
                        </label>
                    </div>
                )}
                {leftInfo && (
                    <div className=' mt-[0.2px] h-[42px] rounded-l-sm border-[1px] border-r-0 border-gray-800 bg-gray-900 py-2 px-3 text-sm'>
                        <p className='mt-[2px] text-slate-400'>{leftInfo}</p>
                    </div>
                )}
                <input
                    ref={ref}
                    disabled={disabled}
                    placeholder={placeholder}
                    // className={`${
                    // leftInfo ? 'rounded-r-sm' : 'rounded'
                    // } w-[100%] border-gray-800 bg-crumble-200 py-2 px-3 text-white ${className}`}
                    className={clxsm(
                        'w-[100%] border-gray-800 bg-crumble-200 py-2 px-3 text-white',
                        [leftInfo ? ['rounded-r-sm'] : ['rounded']],
                        className
                    )}
                    {...rest}
                >
                    {children}
                </input>
            </div>
        );
    }
);

export default InputField;
