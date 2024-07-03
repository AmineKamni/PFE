import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext.js'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar.js'
import About from './pages/About.js'
import Contact from './pages/Contact.js'
import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
import Report from './components/Report.js'
import Sidebarre from './components/Sidebar.js'
import Offer from './components/Offer.js'
import Appointments from './components/Appointments.js'
import Profile from './components/Profile.js'
import OfferId from './components/OfferId.js'
import Applications from './components/Applications.js'
import Validation from './components/Validation.js'
import PfeInfo from './components/PfeInfo.js'
import ViewReport from './components/ViewReport.js'
import Users from './components/Users.js'
import Welcome from './pages/Welcome.js'
import OffersForm from './components/OffersForm.js'
import PferInfoId from './components/PfeInfoId.js'
import { useState } from 'react'
import PfeInfoId from './components/PfeInfoId.js'
function App() {
  const {user} = useAuthContext()
  const [clicked, setClicked] = useState(false)
  const changeClicked = (e) =>{
    if(e == false){
      setClicked(true)
    }else if(e == true){
      setClicked(false)
    }else{  setClicked(!clicked)}
  
    
  }
  return (
    <div  className="App">
      <BrowserRouter>
      <Navbar changeClicked={changeClicked}/>
      <div className='margintop'>
      {user && <Sidebarre changeClicked={changeClicked}/>}
        <div   className={clicked?'marginsmall':'marginleft'}>
        <Routes>
          {!user &&  <Route path='/welcome' element={ <Welcome/> } /> }
          <Route path='/' element={ <Home /> } />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/report' element={<Report/>}/>
          <Route path='/report/view' element={<ViewReport/>}/>
          <Route path='/applications' element={<Applications/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/offer/:id' element={<OfferId/>}/>
          <Route path='/appointments' element={<Appointments/>}/>
          <Route path='/validation' element={<Validation/>}/>
          <Route path='/pfe' element={<PfeInfo/>}/>
          <Route path='/pfeinfo' element={<PfeInfoId/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/publish' element={<OffersForm/>}/>
          <Route 
              path="/login" 
              element={!user ?<Login changeClicked={changeClicked} /> :<Navigate to='/' />} 
            />
            <Route 
              path="/signup" 
              element={!user ?<Signup changeClicked={changeClicked} /> :<Navigate to='/' />} 
            />

        </Routes>
        </div>
        </div>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
