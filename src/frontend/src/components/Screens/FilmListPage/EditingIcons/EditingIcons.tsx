import { BsCheck, BsPencil, BsX } from 'react-icons/bs';

interface EditingIconsProps {
    editing: boolean;
    setEditing: (value: boolean) => void;
    handleUpdate: () => void;
}

const EditingIcons = ({
    editing,
    setEditing,
    handleUpdate,
}: EditingIconsProps) => {
    return (
        <>
            {!editing ? (
                <BsPencil
                    onClick={() => setEditing(!editing)}
                    className='mt-[14px] ml-4 h-[20px] w-[20px] cursor-pointer'
                />
            ) : (
                <>
                    <BsX
                        onClick={() => setEditing(!editing)}
                        className='mt-[5px] ml-4 h-[40px] w-[40px] cursor-pointer'
                    />
                    <BsCheck
                        onClick={() => handleUpdate()}
                        className='mt-[5px] ml-4 h-[40px] w-[40px] cursor-pointer'
                    />
                </>
            )}
        </>
    );
};

export default EditingIcons;
