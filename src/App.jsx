import { useState, useEffect, useRef  } from 'react'
import './App.css'
import '/logo.svg'
import ReservationCard from './components/ReservationCard/ReservationCard'
import DrawerMenu from './components/DrawerMenu/DrawerMenu'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const[stays, setStays] = useState([])
  const [filterParams, setFilterParamas] = useState({city: '', country: '', guests: 0 })
  const [locationInput, setLocationInput] = useState(null);
  const [guestsInput, setGuestsInput] = useState(null);
  const [adultsInput, setAdultInput] = useState(0);
  const [chidlrenInput, setChildrenInput] = useState(0);
  // reference for drawer menu node which we will pass to our child component
  const drawerMenuRef = useRef(null);
  
  async function getStaysData() {
    const data = await fetch('./data/stays.json').then(res => res.json())
    return data
  }

  async function setStaysDataFromAPI() {
    setStays(await getStaysData())
  } 

  function guestsFilter(stay) {
    if (stay.maxGuests >= filterParams.guests) {return true}
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

// Get stays data on first render
  useEffect( () => {
    setStaysDataFromAPI()
  }, [])

//update output cards with provided filters and close menu
async function updateFilters() {
  // get stays from json and set state anew (dont forget await)
  await setStaysDataFromAPI();
  if (filterParams.city) {
    setStays(prev => prev.filter(cityFilter))
  }
  if (filterParams.guests) {
    setStays(prev => prev.filter(guestsFilter))
  }
  toggleDrawerMenu()       
}

// When drawer menu is open this function will check if user clicke outside menu to close it
  useEffect(() => {

    function handleClickOutside(e) {

    // check if menu exists and if user clicked outside of it or it's children then close this drawer menu
      if (drawerMenuRef.current && !drawerMenuRef.current.contains(e.target)) {
          toggleDrawerMenu()
        }
      }
    // add click listener to window if menu is open. Important to use 'mousedown' instead of 'click' event (dont really get why)
    if (menuOpen) {
      window.addEventListener('mousedown', handleClickOutside)
    }

    // clean up after drawer menu is hidden
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

// Count total guests including adults and children
useEffect(() => {
  setGuestsInput(chidlrenInput+adultsInput)
}, [adultsInput, chidlrenInput])

// change guest filter when guests number change
  useEffect(() => {
    setFilterParamas(oldFilterParams => ({...oldFilterParams, guests: guestsInput}))
  }, [guestsInput])

  // allow choosing location from suggested list and and city filter
  function handleLocationInput(e) {
    const value = e.target.textContent
    setLocationInput(value)
    const separatedLocationInput = value.split(',')
    const city = separatedLocationInput[0]
    setFilterParamas(oldFilterParams => ({...oldFilterParams, city: city}))
  }
  

  function guestsIncrease(guestType) { 
    console.log("guest increase tiggeres")
    if (guestType === "Adults") {setAdultInput(oldNum => oldNum+1)}
    if (guestType === "Children") {setChildrenInput(oldNum => oldNum+1)}
  }
  
  function guestsDecrease(guestType) { 
    if (guestType === "Adults") {adultsInput > 0 && setAdultInput(oldNum => oldNum-1)}
    if (guestType === "Children") {chidlrenInput > 0 && setChildrenInput(oldNum => oldNum-1)}
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
        <div className="pageOverlay" style={menuOpen ? {display: "block"} : null}></div> 

        <div className="app_container">
          <DrawerMenu 
            handleLocationInput={handleLocationInput}
            city={filterParams.city}
            locationInput={locationInput}
            guestsInput={guestsInput}
            chidlrenInput={chidlrenInput}
            adultsInput={adultsInput}
            guestsIncrease={guestsIncrease}
            guestsDecrease={guestsDecrease}
            getStaysData={getStaysData}
            updateFilters={updateFilters}
            toggleDrawerMenu={toggleDrawerMenu}
            drawerMenuRef={drawerMenuRef}
            menuOpen={menuOpen}
          />
          <header className='header'>
            <img src="logo.svg" alt="" className="logo" />
            <div className="btn-group">
              <button className='btn_choose_location' onClick={toggleDrawerMenu}>{locationInput ? locationInput : "Finland"}</button>
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
