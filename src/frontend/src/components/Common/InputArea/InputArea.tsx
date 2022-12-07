import clxsm from '@/lib/clsxm';
import * as React from 'react';
import { IconType } from 'react-icons/lib';

enum InputAreaVariant {
    'primary',
}

type InputAreaProps = React.ComponentPropsWithRef<'textarea'> & {
    isDarkBg?: boolean;
    placeholder?: string;
    variant?: keyof typeof InputAreaVariant;
};

const InputArea = React.forwardRef<HTMLTextAreaElement, InputAreaProps>(
    (
        {
            children,
            className,
            disabled: inputDisabled,
            variant = 'primary',
            isDarkBg = false,
            placeholder,
            ...rest
        },
        ref
    ) => {
        const disabled = inputDisabled;

        return (
            <textarea
                ref={ref}
                disabled={disabled}
                placeholder={placeholder}
                className={clxsm(
                    'h-full w-full rounded border-gray-800 bg-crumble-200 py-2 px-3 text-white'
                )}
                {...rest}
            >
                {children}
            </textarea>
        );
    }
);

export default InputArea;
