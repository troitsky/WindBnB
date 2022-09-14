import { useState } from 'react'
import './App.css'
import '/logo.svg'
import ReservationCard from './components/ReservationCard/ReservationCard'
import DrawerMenu from './components/DrawerMenu/DrawerMenu'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="App">
      <div className="app_container">
        <DrawerMenu open={menuOpen} />

        <header className='header'>
          <img src="logo.svg" alt="" className="logo" />
          <div className="btn-group">
            <button>Helsinki, Finland</button>
            <button className='btn_add_guests'>Add guests</button>
            <button className='btn btn_search'><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </header>

        <main className='main_content'>
          <div className="main_section_topbar">
            <h2 className="main_title">Stays in Finland</h2>
            <span>12+ stays</span>
          </div>
          <div className="cards_container">
            <ReservationCard />
            <ReservationCard />
            <ReservationCard />
            <ReservationCard />
            <ReservationCard />
          </div>
        </main>

        <footer>
          <p>created by <span className='footer_site_author'>Troitsky Dmitry</span></p>
        </footer>
      </div>
    </div>
  )
}

export default App
