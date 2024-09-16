

interface UserStatsProps {
    totalUsers: number;
    averageAge: number;
  }
  
  const UserStats = ({ totalUsers, averageAge }: UserStatsProps) => {
    return (
      <div className="container-average">
        <div className="container-total">
          <h3 className="text-head-total">TOTAL USERS</h3>
          <p className="text-total">{totalUsers}</p>
        </div>
        <div className="container-age">
          <h3 className="text-head-age">AVERAGE AGE OF USERS</h3>
          <p className="text-age">{averageAge.toFixed(2)}</p>
        </div>
      </div>
    );
  }
  
  export default UserStats;