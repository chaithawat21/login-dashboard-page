import { User } from '../types/userTypes';

interface UserListProps {
  filteredUsers: User[];
  selectedUser: User | null;
  handleUserClick: (user: User) => void;
}

const UserList = ({ filteredUsers, selectedUser, handleUserClick }:UserListProps) => {
  return (
    <div className="container-directory">
      {filteredUsers.length > 0 ? (
        <ul>
          {filteredUsers.map((user) => (
            <li 
              className="list-directory"
              key={user.id} 
              onClick={() => handleUserClick(user)}
            >
              <h3 className={`list-directory-name ${selectedUser?.id === user.id ? 'selected' : ''}`}>{user.firstname} {user.lastname}</h3>
              <span className={user?.isActive ? 'span-active' : 'span-inactive'}>{user?.isActive ? 'Active' : 'Inactive'}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-directory-empty">No users found</p>
      )}
    </div>
  );
}

export default UserList;
