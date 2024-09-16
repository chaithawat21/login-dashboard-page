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
              className={`list-directory ${selectedUser?.id === user.id ? 'selected' : ''}`}
              key={user.id} 
              onClick={() => handleUserClick(user)}
              style={{ opacity: user.isActive ? 1 : 0.5 }}
            >
              <h3 className="list-directory-name">{user.firstname} {user.lastname}</h3>
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
