import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Profile from './pages/Profile';
// import TestComp from './components/TestComp'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div className="w-screen h-screen flex justify-center items-center bg-blue-500">
            <Main />
          </div>
        }/>
        <Route path='/profile' element={
          <div className="w-screen h-screen flex justify-center items-center bg-blue-500">
            <Profile />
          </div>
        } />
      </Routes>
    </Router>
    // <div className="w-screen h-screen flex justify-center items-center bg-blue-500">
    //   {/* <TestComp /> */}
    //   <Main />
    //   <Profile />
    // </div>
  )
}

export default App
