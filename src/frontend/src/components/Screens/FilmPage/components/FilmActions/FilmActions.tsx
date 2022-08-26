import { actionsMap } from './actionsMap';

interface FilmActionsProps {}

const FilmActions = ({}: FilmActionsProps) => {
    const handleActionClick = (name: string) => {
        switch (name) {
            case 'share': {
            }
        }
    };

    return (
        <div>
            {actionsMap.map((action) => (
                <div
                    className='inline p-3'
                    onClick={() => handleActionClick(action.name)}
                    key={action.id}
                >
                    <action.icon className='inline cursor-pointer hover:fill-superRed' />
                </div>
            ))}
        </div>
    );
};

export default FilmActions;
