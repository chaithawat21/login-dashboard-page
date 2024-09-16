import { useState, useEffect, useCallback } from "react";
import mockData from '../data/mockData.json';
import { User } from '../types/userTypes';
import '../styles/DashboardPage.css';
import { useAuth } from '../hooks/useAuth';
import UserProfile from '../components/UserProfile';
import Search from '../components/Search';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';
import UserStats from '../components/UserStats';
import homeIcon from '../assets/dashboard/home.svg'
import dashboardIcon from '../assets/dashboard/dashboard.svg'
import settingIcon from '../assets/dashboard/setting.svg'
import signOutIcon from '../assets/dashboard/sign-out.svg'

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
    <main className="container-dashboard">
      <nav className="nav-dashboard">
        <div className="nav-menu">
        <img src={homeIcon} alt="home" className="img-home" />
        <img src={dashboardIcon} alt="dashboard" className="img-dashboard" />
        <img src={settingIcon} alt="setting" className="img-setting" />
        </div>
        <img src={signOutIcon} alt="sign-out" onClick={logout} className="img-logout" />
      </nav>
    <UserProfile loggedInUser={loggedInUser} selectedUser={selectedUser} />
    <div className="container-search">
      <UserDetails selectedUser={selectedUser} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UserList filteredUsers={filteredUsers} selectedUser={selectedUser} handleUserClick={handleUserClick} />
    </div>
    <UserStats totalUsers={users.length} averageAge={averageAge} />
  </main>
  );
}

export default DashboardPage;