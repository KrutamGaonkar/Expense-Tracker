import './App.css';
import { ConfigProvider } from 'antd';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#ff4a4a',
        fontFamily: "Montserrat",
        buttonColor: "#ff4a4a"
      },
    }}  
    >
      <ToastContainer autoClose={2000}/>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
