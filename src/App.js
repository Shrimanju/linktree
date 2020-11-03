import './App.css';
import SideNavBar from './app/component/sidenavbar/SideNavBar';
import TopNavBar from './app/component/topnavbar/TopNavBar';
import MobileView from './app/component/MobileView/MobileView';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className='app'>
          <SideNavBar className='sidebar' />
          <TopNavBar className='topnavbar' />
          <MobileView className='mobileview' />
    </div>
  );
}

export default App;
