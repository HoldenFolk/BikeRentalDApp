import './App.css';
import GetAllBikesData from './components/GetAllBikesData';
import RegisterBike from './components/RegisterBike';
import WalletConnect from './components/WalletConnect';
import RentBike from './components/RentBike';
import ReturnBike from './components/ReturnBike';

function App() {
  return (
    <div className="App">
      
      <WalletConnect />
      <RegisterBike />
      <RentBike />
      <ReturnBike />
      <GetAllBikesData />
    </div>
  );
}

export default App;
