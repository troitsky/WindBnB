import {useState} from 'react'
import "./DrawerMenu.css";

export default function DrawerMenu(props) {
  const { open, handleLocationInput, handleGuestsInput, locationInput, guestsInput, guestsIncrease, guestsDecrease, adultsInput, chidlrenInput, getStaysData, updateFilters, toggleDrawerMenu} = props;

  let [showGuestInputmenu, setShowGuestInputmenu] = useState(false)
  let [showLocationInputmenu, setShowLocationInputmenu] = useState(false)
  let [cities, setCities] = useState(null)

  // function to get list of avaible city-country pairs with additional api call because stays in current parent state may be already filtered and we here want all avaible pairs
  async function getCitiesFromAPI() {
    // new Set is used to get unique values from array
    const avaibleCitites = await getStaysData().then((data) => [...new Set(data.map(stay => stay.city + ", " + stay.country))]);
    //after getting cities we also geneate list elements from data
    setCities(avaibleCitites.map(city => 
      <li  className="location_search_result_item">
        <i className="fa-solid fa-location-dot"></i><span onClick={handleLocationInput}>{city}</span>
      </li>
      )
    )

  }

  function handleLocationInputClick() {
    setShowGuestInputmenu(false);
    setShowLocationInputmenu(prev => !prev);
    getCitiesFromAPI()
  }
  
  function handleGuestsInputClick() {
    setShowGuestInputmenu(prev => !prev);
    setShowLocationInputmenu(false);
  }

  return (
    <nav className="drawer_menu" style={open ? { transform: "none" } : null}>
      <div className="mobile_topbar">
        <p className="mobile_menu_title">Edit your search</p>
        <i onClick={toggleDrawerMenu} class="fa-solid fa-xmark btn btn_mobile_close"></i>
      </div>

      <div className="search_options_bar">
        <div
          className="drawer_input_background"
          style={showLocationInputmenu ? { borderColor: "#333333" } : null}
          onClick={handleLocationInputClick}
        >
          <label htmlFor="locationInput" className="drawer_text_input_label">
            Location
          </label>
          <input
            id="locationInput"
            className="drawer_text_input"
            onChange={handleLocationInput}
            type="text"
            value={locationInput}
            placeholder="ex. Helsinki, Finland"
          />
        </div>
        <div className="drawer_input_background"
         onClick={handleGuestsInputClick}
         style={showGuestInputmenu ? { borderColor: "#333333" } : null}
         >
          <label htmlFor="guestsInput" className="drawer_text_input_label">
            Guests
          </label>
          <input
            id="guestsInput"
            className="drawer_text_input"
            type="number"
            placeholder="Add guests"
            onChange={handleGuestsInput}
            value = {guestsInput}
            disabled
          />
        </div>
        <div className="drawer_input_background">
          <button onClick={updateFilters} className="btn btn_search_red">
            <i className="fa-solid fa-magnifying-glass"></i>Search
          </button>
        </div>
      </div>

      <div className="search_options_setting_containers">

        {showLocationInputmenu && <div className="location_search_results_container">
          <ul className="location_search_results_list">
            {cities}
          </ul>
        </div>}

        { showGuestInputmenu && 
            <div className="guest_search_settings_container">
              <div className="guest_settings_block">
                <p className="guest_settings_title">Adults</p>
                <p className="guest_settings_subtitle">Ages 13 or above</p>
                <div className="quantity-part">
                  <div className="btn btn-plus-minus" onClick={() => guestsDecrease('Adults')}>
                    <i className="fa-solid fa-minus"></i>
                  </div>
                  <input
                    type="number"
                    className="guest-qty"
                    min="0"
                    id=""
                    value={adultsInput}
                  />
                  <div className="btn btn-plus-minus" onClick={() => guestsIncrease('Adults')}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </div>
              </div>
              <div className="guest_settings_block">
                <p className="guest_settings_title">Children</p>
                <p className="guest_settings_subtitle">Ages 2-12</p>
                <div className="quantity-part">
                  <div className="btn btn-plus-minus" onClick={() => guestsDecrease('Children')}>
                    <i className="fa-solid fa-minus"></i>
                  </div>
                  <input
                    type="number"
                    className="guest-qty"
                    min="0"
                    placeholder="0"
                    id=""
                    value={chidlrenInput}
                    
                  />
                  <div className="btn btn-plus-minus" onClick={() => guestsIncrease('Children')}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
        }
        
      </div>

      <button onClick={updateFilters} className="btn btn_mobile_search btn_search_red">
            <i className="fa-solid fa-magnifying-glass"></i>Search
          </button>
    </nav>
  );
}
