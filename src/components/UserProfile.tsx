import { User } from "../types/userTypes";

interface UserProfileProps {
    loggedInUser: User | null;
}

const UserProfile = ({ loggedInUser }: UserProfileProps) => {
    return (
        <div className="container-user-profile">
            <div className='container-user-header'>
                <h1 className="text-welcome">Hi {loggedInUser?.firstname} {loggedInUser?.lastname}!</h1> <span className={loggedInUser?.isActive ? 'span-active' : 'span-inactive'}>{loggedInUser?.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <p className="text-user">Welcome back {loggedInUser?.firstname} {loggedInUser?.lastname}. We are glad you are here. Inspire the best work in people, enabling them to achieve their goals. </p>
            <p className="text-user"><strong>Email:</strong> {loggedInUser?.email}</p>
            <p className="text-user"><strong>Position:</strong> {loggedInUser?.position}</p>
            <p className="text-user"><strong>Age:</strong> {loggedInUser?.age}</p>
            <button className='button-view-details'>View Details</button>
        </div>
    );
}

export default UserProfile;
