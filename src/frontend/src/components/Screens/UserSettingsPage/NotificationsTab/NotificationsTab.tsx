interface NotificationsTabProps {}

const NotificationsTab = ({}: NotificationsTabProps) => {
    return (
        <div className='p-5'>
            <div className='float-left text-left'>
                <h3>Notifications</h3>
                <p className='text-sm text-superRed'>
                    Choose when and how you recieve emails and/or in-app
                    notifications from us.
                </p>
            </div>
        </div>
    );
};

export default NotificationsTab;
