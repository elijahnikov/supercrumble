import clxsm from '@/lib/clsxm';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { IconType } from 'react-icons/lib';

enum ButtonVariant {
    'primary',
    'secondary',
    'transparent',
}

type ButtonProps = {
    isLoading?: boolean;
    isDarkBg?: boolean;
    variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            disabled: buttonDisabled,
            isLoading,
            variant = 'primary',
            isDarkBg = false,
            ...rest
        },
        ref
    ) => {
        const disabled = isLoading || buttonDisabled;

        return (
            <button
                ref={ref}
                type='button'
                disabled={disabled}
                className={clxsm(
                    'inline-flex items-center rounded px-4 py-2 font-semibold',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
                    'shadow-sm',
                    'justify-center',
                    'transition-colors duration-75',
                    [
                        variant === 'primary' && [
                            'bg-superRed text-white',
                            'border-none',
                            'text-center',
                            'hover:bg-red-400 hover:text-white',
                            'disabled:bg-red-400 disabled:hover:bg-red-400',
                        ],
                    ],
                    [
                        variant === 'secondary' && [
                            'bg-gray-800 text-white',
                            'border-none',
                            'text-center',
                            'hover:bg-gray-600 hover:text-white',
                            'disabled:bg-gray-600 disabled:hover:bg-gray-600',
                        ],
                        variant === 'transparent' && [
                            'bg-transparent text-white',
                            'border-none',
                            'text-center',
                            'hover:bg-gray-600 hover:text-white',
                            'disabled:bg-gray-600 disabled:hover:bg-gray-600',
                        ],
                    ],
                    'disabled:cursor-not-allowed',
                    isLoading &&
                        'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
                    className
                )}
                {...rest}
            >
                {isLoading && (
                    <div
                        className={clxsm(
                            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                            {
                                'text-white': ['gray.800', 'dark'].includes(
                                    variant
                                ),
                                'text-black': ['light'].includes(variant),
                                'text-primary-500': [
                                    'outline',
                                    'ghost',
                                ].includes(variant),
                            }
                        )}
                    >
                        <ImSpinner2 className='animate-spin' />
                    </div>
                )}
                {children}
            </button>
        );
    }
);

export default Button;
