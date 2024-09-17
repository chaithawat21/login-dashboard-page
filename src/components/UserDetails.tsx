import { User } from "../types/userTypes";

interface UserDetailsProps {
    selectedUser: User | null;
  }
  
  const UserDetails = ({ selectedUser }:UserDetailsProps) => {
    if (!selectedUser) return null;
    return (
      <div className="container-directory-details">
        <div className="container-directory-head">
        <h2 className="text-directory-head">{selectedUser.firstname} {selectedUser.lastname}</h2>
        <span className={selectedUser?.isActive ? 'span-active' : 'span-inactive'}>{selectedUser?.isActive ? 'Active' : 'Inactive'}</span>
        </div>
        <p className="text-directory-detail">Email: {selectedUser.email}</p>
        <p className="text-directory-detail">Position: {selectedUser.position}</p>
        <p className="text-directory-detail">Age: {selectedUser.age}</p>
      </div>
    );
  }
  
  export default UserDetails;