import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ContactList from './ContactList/ContactList'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<ContactList/>}/>
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
