import { useState, useEffect, useLayoutEffect  } from 'react'
import './App.css'
import '/logo.svg'
import ReservationCard from './components/ReservationCard/ReservationCard'
import DrawerMenu from './components/DrawerMenu/DrawerMenu'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageOverlayShown, setpageOverlayShown] = useState(false)
  const[stays, setStays] = useState([])
  const [filterParams, setFilterParamas] = useState({city: '', country: '', guests: 0 })
  const [locationInput, setLocationInput] = useState(null);
  const [guestsInput, setGuestsInput] = useState(null);
  
  async function getStaysData() {
    const data = await fetch('./data/stays.json').then(res => res.json())
    return data
  }

  async function setStaysDataFromAPI() {
    setStays(await getStaysData())
  } 

  function guestsFilter(stay) {
    if (stay.maxGuests >= filterParams.guests) {return true}
    console.log('guest filter fired')
    return false;
  }
  
  function cityFilter(stay) {
    if (stay.city === filterParams.city) {return true}
    return false;
  }

// Show|hide drawer menu 
  function toggleDrawerMenu() {
    setMenuOpen(menuOpen => !menuOpen)
  }

  // Show|hide overlay
  useEffect(() => {
    setpageOverlayShown(pageOverlayShown => !pageOverlayShown)
  }, [menuOpen])

// Get stays data on first render
  useEffect( () => {
    setStaysDataFromAPI()
  }, [])


  // Filter stays when  filters change but not on first render
  useLayoutEffect(() => {
     
    async function updateFilters() {
      // get stays from json and set state anew (dont forget await)
      await setStaysDataFromAPI();
      if (filterParams.city) {
        setStays(oldStays => oldStays.filter(cityFilter))
      }
      if (filterParams.guests) {
        setStays(oldStays => oldStays.filter(guestsFilter))
      }       
    }
    updateFilters()
  }, [filterParams.city, filterParams.guests])

// change guest filter when guests number change
  useEffect(() => {
    setFilterParamas(oldFilterParams => ({...oldFilterParams, guests: guestsInput}))

  }, [guestsInput])

  function handleLocationInput(e) {
    const value = e.target.value
    setLocationInput(value)
    const separatedLocationInput = value.split(',')
    const city = separatedLocationInput[0]
    setFilterParamas(oldFilterParams => ({...oldFilterParams, city: city}))
  }
  
  function handleGuestsInput(e) {
    const value = Number(e.target.value)
    setGuestsInput(value)
  }

  function guestsIncrease() {setGuestsInput(oldGuests => oldGuests+1)}
  function guestsDecrease() {setGuestsInput(oldGuests => oldGuests-1)}

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
          <DrawerMenu 
            open={menuOpen}  
            handleLocationInput={handleLocationInput}
            handleGuestsInput = {handleGuestsInput}
            city={filterParams.city}
            locationInput={locationInput}
            guestsInput={guestsInput}
            guestsIncrease={guestsIncrease}
            guestsDecrease={guestsDecrease}
          />
          <header className='header'>
            <img src="logo.svg" alt="" className="logo" />
            <div className="btn-group">
              <button onClick={toggleDrawerMenu}>{locationInput ? locationInput : "Finland"}</button>
              <button className='btn_add_guests' onClick={toggleDrawerMenu}>{guestsInput ? `${guestsInput} guests` : 'Add guests'}</button>
              <button className='btn btn_search' onClick={toggleDrawerMenu}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </header>

          <main className='main_content'>
            <div className="main_section_topbar">
              <h2 className="main_title">Stays in Finland</h2>
              <span>{stays.length} stays</span>
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
