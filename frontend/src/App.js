import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './components/User';
import AddUser from './components/AddUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/edituser' element={<AddUser />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
