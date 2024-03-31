import './App.css';
import GetAllBikesData from './components/GetAllBikesData';
import RegisterBike from './components/RegisterBike';
import WalletConnect from './components/WalletConnect';
import RentBike from './components/RentBike';
import ReturnBike from './components/ReturnBike';

function App() {
  return (
    <div className="App">
      <div className='container-top'>
        <div className="top-left">
          <WalletConnect />
        </div>
        <div className="one">
          <h1>Bike Rental System</h1>
        </div>
        <div className="top-right">
            <GetAllBikesData />
        </div>
      </div>
      <div className="container">
        <div className="top-middle">
          <RentBike />
        </div>
        <div className='top-middle'>
          <ReturnBike />
        </div>
      </div>
      <div className="main-container">
        <div className="bottom-component">
          <RegisterBike />
        </div>
      </div>
    </div>
  );
}

export default App;
