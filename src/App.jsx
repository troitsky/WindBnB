import { useState, useEffect } from 'react'
import './App.css'
import '/logo.svg'
import ReservationCard from './components/ReservationCard/ReservationCard'
import DrawerMenu from './components/DrawerMenu/DrawerMenu'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageOverlayShown, setpageOverlayShown] = useState(false)
  const[stays, setStays] = useState([])
  const [filterParams, setFilterParamas] = useState({city: '', country: '', guests: 0 })
  
  function getStaysData() {
    fetch('./data/stays.json')
      .then(res => res.json())
      .then(data => setStays(data))
  }

  function guestsFilter(stay) {
    if (stay.maxGuests >= filterParams.guests) {return true}
    return false;
  }
  
  useEffect(() => {
    setpageOverlayShown(pageOverlayShown => !pageOverlayShown)
  }, [menuOpen])

  useEffect(() => {
    getStaysData()  
  }, [])

  useEffect(() => {
    setStays(oldStays => oldStays.filter(guestsFilter) )  
  }, [filterParams.guests])

  function toggleDrawerMenu() {
    setMenuOpen(menuOpen => !menuOpen)
  }

  function handleInputChange(e) {
    const filter = e.target.id
    const value = e.target.value
    
    if (filter === "locationInput") {
      setFilterParamas(oldFilterParams => ({...oldFilterParams, city: value}))
      console.log(value)
    }
  }

  let ReservationCards = stays.map(stay => 
     <ReservationCard 
      city={stay.city} 
      country={stay.country}  
      superHost={stay.superHost}  
      title={stay.title}  
      rating={stay.rating}  
      maxGuests={stay.maxGuests}  
      type={stay.type}  
      beds={stay.beds}  
      photo={stay.photo}  
    />
  )



  return (
    <>
      <div className="App">
        <div className="pageOverlay" onClick={toggleDrawerMenu} style={pageOverlayShown ? {display: "block"} : null}></div> 

        <div className="app_container">
          <DrawerMenu open={menuOpen}  handleInputChange={handleInputChange} city={filterParams.city}/>
          <header className='header'>
            <img src="logo.svg" alt="" className="logo" />
            <div className="btn-group">
              <button onClick={toggleDrawerMenu}>Helsinki, Finland</button>
              <button className='btn_add_guests' onClick={toggleDrawerMenu}>Add guests</button>
              <button className='btn btn_search' onClick={toggleDrawerMenu}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </header>

          <main className='main_content'>
            <div className="main_section_topbar">
              <h2 className="main_title">Stays in Finland</h2>
              <span>12+ stays</span>
            </div>
            <div className="cards_container">
              {ReservationCards}
            </div>
          </main>

          <footer>
            <p>created by <span className='footer_site_author'>Troitsky Dmitry</span></p>
          </footer>
        </div>
      </div>
    </>
    
  )
}

export default App
