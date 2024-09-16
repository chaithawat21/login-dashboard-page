import { User } from '../types/userTypes';

interface UserDetailsProps {
    selectedUser: User | null;
  }
  
  const UserDetails = ({ selectedUser }:UserDetailsProps) => {
    if (!selectedUser) return null;
    
    return (
      <div className="container-directory-details">
        <h2 className="text-search-head">User Profile</h2>
        <p className="text-search-detail"><strong>Full Name:</strong> {selectedUser.firstname} {selectedUser.lastname}</p>
        <p className="text-search-detail"><strong>Email:</strong> {selectedUser.email}</p>
        <p className="text-search-detail"><strong>Position:</strong> {selectedUser.position}</p>
        <p className="text-search-detail"><strong>Age:</strong> {selectedUser.age}</p>
      </div>
    );
  }
  
  export default UserDetails;