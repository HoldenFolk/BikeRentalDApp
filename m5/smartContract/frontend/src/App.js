import './App.css';
import GetAllBikesData from './components/GetAllBikesData';
import RegisterBike from './components/RegisterBike';
import WalletConnect from './components/WalletConnect';
import RentBike from './components/RentBike';
import RentBikeData from './components/RentBikeData';
import RentBikeDataPast from './components/RentBikeDataPast';
import WalletSwitcher from './components/WalletSwitcher';
import { WalletProvider } from './context/WalletContext';
import ReturnBike from './components/ReturnBike';
import ClaimBike from './components/ClaimBike';
import background from './Image/Bixi.jpg';

function App() {
  return (
    <WalletProvider>
      <div className="App" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}>
        <div className='container-top'>
          <div className="top-left">
            <WalletSwitcher />
          </div>
          <div className="one">
            <h1>PIXI</h1>
          </div>
          <div className="top-right">
            <GetAllBikesData />
          </div>
        </div>
        <div className="container">
          <div className="top-middle">
            <RentBike />
          </div>
          <div className="top-middle">
            <RentBikeData />
          </div>
          <div className='top-middle'>
            <ReturnBike />
          </div>
        </div>
        <div className="container">
          <div className='top-middle'>
            <ClaimBike />
          </div>
          <div className='top-middle'>
            <RentBikeDataPast />
          </div>
        </div>
        <div>
          <RegisterBike />
        </div>
      </div>
    </WalletProvider>
  );
}

export default App;
