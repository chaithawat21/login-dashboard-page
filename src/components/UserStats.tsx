import nextIcon from '../assets/dashboard/next.svg'

interface UserStatsProps {
  totalUsers: number;
  averageAge: number;
  totalActiveUsers: number;
  totalInactiveUsers: number;

}

const UserStats = ({ totalUsers, averageAge, totalActiveUsers, totalInactiveUsers }: UserStatsProps) => {
  return (
    <div className="container-average">
      <div className="container-average-list">
        <div className='container-average-head'>
          <h3 className="text-head-average">TOTAL USERS</h3>
          <p className="text-average">{totalUsers}</p>
        </div>
        <img src={nextIcon} alt="next" className='img-next' />
      </div>
      <div className='container-average-list'>
          <div className='container-average-head'>
            <h3 className="text-head-average-active">TOTAL ACTIVE USERS</h3>
            <p className="text-average">{totalActiveUsers}</p>
          </div>
          <img src={nextIcon} alt="next" className='img-next' />
        </div>
      <div className='container-average-list'>
          <div className='container-average-head'>
            <h3 className="text-head-average-inactive">TOTAL INACTIVE USERS</h3>
            <p className="text-average">{totalInactiveUsers}</p>
          </div>
          <img src={nextIcon} alt="next" className='img-next' />
        </div>
        <div className='container-average-list'>
          <div className='container-average-head'>
            <h3 className="text-head-average">AVERAGE AGE OF USERS</h3>
            <p className="text-average">{averageAge.toFixed(2)}</p>
          </div>
          <img src={nextIcon} alt="next" className='img-next' />
        </div>
      </div>

  );
}

export default UserStats;