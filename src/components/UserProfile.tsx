import { User } from '../types/userTypes';

interface UserProfileProps {
    loggedInUser: User | null;
    selectedUser: User | null;
}

const UserProfile = ({ loggedInUser, selectedUser }: UserProfileProps) => {
    return (
        <div className="container-user">
            <div className="container-user-profile">
                <h1 className="text-welcome">Welcome to the Dashboard!</h1>
                <h2 className="text-name">{loggedInUser?.firstname} {loggedInUser?.lastname}</h2>
                <p className="text-user"><strong>Email:</strong> {loggedInUser?.email}</p>
                <p className="text-user"><strong>Position:</strong> {loggedInUser?.position}</p>
                <p className="text-user"><strong>Age:</strong> {loggedInUser?.age}</p>
                <p className="text-user"><strong>Status:</strong> {selectedUser?.isActive ? 'Active' : 'Inactive'}</p>
            </div>
            
        </div>
    );
}

export default UserProfile;
