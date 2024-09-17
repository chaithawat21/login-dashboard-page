import { useState, useEffect } from "react";
import mockData from "../data/mockData.json";
import { User } from "../types/userTypes";
import "../styles/DashboardPage.css";
import { useAuth } from "../hooks/useAuth";
import UserProfile from "../components/UserProfile";
import Search from "../components/Search";
import FilterOption from "../components/FilterOption"
import UserList from "../components/UserList";
import UserDetails from "../components/UserDetails";
import UserStats from "../components/UserStats";
import NavigationBar from "../components/NavigationBar";


const DashboardPage = () => {
  const { loggedInUser, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filterOption, setFilterOption] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [averageAge, setAverageAge] = useState<number>(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [totalInactiveUsers, setTotalInactiveUsers] = useState<number>(0);
  const users = mockData.users;


  // users based on the search term
  useEffect(() => {
    let filtered = users.filter((user) =>
      (user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase())) &&
      user.id !== loggedInUser?.id// Exclude logged-in user
    );

    // apply filter based on filterOption
    if (filterOption === 'active') {
      filtered = filtered.filter((user) => user.isActive);
    } else if (filterOption === 'inactive') {
      filtered = filtered.filter((user) => !user.isActive);
    } else if (filterOption !== 'all') {
      filtered = filtered.filter((user) => user.position === filterOption);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterOption, loggedInUser, users]);

  // calculate the average age of all users
  useEffect(() => {
    const totalAge = users.reduce((sum, user) => sum + user.age, 0);
    const avgAge = totalAge / users.length;
    setAverageAge(avgAge);
  }, [users]);

  // calculate total active and inactive users
  useEffect(() => {
    const activeUsersCount = users.filter((user) => user.isActive).length;
    const inactiveUsersCount = users.length - activeUsersCount;
    setTotalActiveUsers(activeUsersCount);
    setTotalInactiveUsers(inactiveUsersCount);
  }, [users]);

  // click and set the selected user
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <main className="container-dashboard">
      <NavigationBar logout={logout} />
      <div className="container-user">
        <UserProfile loggedInUser={loggedInUser} />
        <UserDetails selectedUser={selectedUser} />
      </div>
      <div className="container-list-user">
        <div className="container-list-user-search">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <FilterOption
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
        </div>
        <UserList
          filteredUsers={filteredUsers}
          selectedUser={selectedUser}
          handleUserClick={handleUserClick}
        />
      </div>
      <UserStats
        totalUsers={users.length}
        averageAge={averageAge}
        totalActiveUsers={totalActiveUsers}
        totalInactiveUsers={totalInactiveUsers}
      />
    </main>
  );
}

export default DashboardPage;