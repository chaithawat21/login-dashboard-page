import { useState, useEffect, useCallback } from "react";
import mockData from '../data/mockData.json';
import '../styles/DashboardPage.css';
import { useAuth } from "../hooks/useAuth";

interface User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  position: string;
  isActive: boolean;
}


const DashboardPage = () => {
  const { loggedInUser, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [averageAge, setAverageAge] = useState<number>(0);
  const users = mockData.users;


  // Filter users based on the search term
  useEffect(() => {
      const filtered = users.filter((user) =>
         // Only show active users
        (user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position.toLowerCase().includes(searchTerm.toLowerCase())) &&
        user.id !== loggedInUser?.id// Exclude logged-in user
      );
    setFilteredUsers(filtered);
  }, [searchTerm, loggedInUser, users]);

  // Calculate the average age of all users
  useEffect(() => {
    const activeUsers = users.filter(user => user.isActive);
    const totalAge = activeUsers.reduce((sum, user) => sum + user.age, 0);
    const avgAge = totalAge / users.length;
    setAverageAge(avgAge);
  }, [users]);

  const handleUserClick = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  return (
    <div className="container-dashboard">
      <div className="container-user">
        <div className="container-user-profile">
          <h1 className="text-welcome">Welcome to the Dashboard!</h1>
          <h2 className="text-name">{loggedInUser?.firstname} {loggedInUser?.lastname}</h2>
          <p className="text-user"><strong>Email:</strong> {loggedInUser?.email}</p>
          <p className="text-user"><strong>Position:</strong> {loggedInUser?.position}</p>
          <p className="text-user"><strong>Age:</strong> {loggedInUser?.age}</p>
          <p><strong>Status:</strong> {selectedUser?.isActive ? 'Active' : 'Inactive'}</p>
        </div>
        <button onClick={logout} className="button-logout">
          LOGOUT
        </button>
      </div>
      
      <div className="container-search">
      {selectedUser && (
          <div className="container-directory-details">
            <h2 className="text-search-head">User Profile</h2>
            <p className="text-search-detail"><strong>Full Name:</strong> {selectedUser.firstname} {selectedUser.lastname}</p>
            <p className="text-search-detail"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="text-search-detail"><strong>Position:</strong> {selectedUser.position}</p>
            <p className="text-search-detail"><strong>Age:</strong> {selectedUser.age}</p>
          </div>
        )}
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-search"
          />
        </div>
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
                  <h3 className="list-directory-name" >{user.firstname} {user.lastname}</h3>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-directory-emptry">No users found</p>
          )}
        </div>
      </div>
      <div className="container-average">
        <div className="container-total">
          <h3 className="text-head-total">TOTAL USERS</h3>
          <p className="text-total">{mockData.users.length}</p>
        </div>
        <div className="container-age">
          <h3 className="text-head-age">AVERAGE AGE OF USERS</h3>
          <p className="text-age">{averageAge.toFixed(2)}</p>
        </div>
      </div>

    </div>


  );
}

export default DashboardPage;