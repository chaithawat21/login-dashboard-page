import homeIcon from "../assets/dashboard/home.svg"
import dashboardIcon from "../assets/dashboard/dashboard.svg"
import settingIcon from "../assets/dashboard/setting.svg"
import signOutIcon from "../assets/dashboard/sign-out.svg"

interface NavigationBarProp {
    logout: () => void;
}

const NavigationBar = ({logout}:NavigationBarProp) => {
  return (
    <nav className="nav-dashboard">
    <div className="nav-menu">
    <img src={homeIcon} alt="home" className="img-home" />
    <img src={dashboardIcon} alt="dashboard" className="img-dashboard" />
    <img src={settingIcon} alt="setting" className="img-setting" />
    </div>
    <img src={signOutIcon} alt="sign-out" onClick={logout} className="img-logout" />
  </nav>
  )
}

export default NavigationBar