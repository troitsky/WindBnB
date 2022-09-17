import "./DrawerMenu.css";

export default function DrawerMenu(props) {
  const { open, handleLocationInput, handleGuestsInput, locationInput, guestsInput, guestsIncrease, guestsDecrease} = props;
  return (
    <nav className="drawer_menu" style={open ? { transform: "none" } : null}>
      <div className="search_options_bar">
        <div
          className="drawer_input_background"
          style={{ borderColor: "#333333" }}
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
            placeholder="Helsinki, Finland"
          />
        </div>
        <div className="drawer_input_background">
          <label htmlFor="locationInput" className="drawer_text_input_label">
            Guests
          </label>
          <input
            id="guestsInput"
            className="drawer_text_input"
            type="number"
            placeholder="Add guests"
            onChange={handleGuestsInput}
            value = {guestsInput}
          />
        </div>
        <div className="drawer_input_background">
          <button className="btn btn_search_red">
            <i className="fa-solid fa-magnifying-glass"></i>Search
          </button>
        </div>
      </div>
      <div className="search_options_setting_containers">
        <div className="location_search_results_container">
          <ul className="location_search_results_list">
            <li className="location_search_result_item">
              <i className="fa-solid fa-location-dot"></i>Helskinki, Finland
            </li>
            <li className="location_search_result_item">
              <i className="fa-solid fa-location-dot"></i>Helskinki, Finland
            </li>
            <li className="location_search_result_item">
              <i className="fa-solid fa-location-dot"></i>Helskinki, Finland
            </li>
            <li className="location_search_result_item">
              <i className="fa-solid fa-location-dot"></i>Helskinki, Finland
            </li>
          </ul>
        </div>

        <div className="guest_search_settings_container">
          <div className="guest_settings_block">
            <p className="guest_settings_title">Adults</p>
            <p className="guest_settings_subtitle">Ages 13 or above</p>
            <div className="quantity-part">
              <div className="btn btn-plus-minus" onClick={guestsDecrease}>
                <i className="fa-solid fa-minus"></i>
              </div>
              <input
                type="number"
                className="guest-qty"
                value="0"
                min="0"
                id=""
              />
              <div className="btn btn-plus-minus" onClick={guestsIncrease}>
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>
          <div className="guest_settings_block">
            <p className="guest_settings_title">Children</p>
            <p className="guest_settings_subtitle">Ages 2-12</p>
            <div className="quantity-part">
              <div className="btn btn-plus-minus" onClick={guestsDecrease}>
                <i className="fa-solid fa-minus"></i>
              </div>
              <input
                type="number"
                className="guest-qty"
                min="0"
                placeholder="0"
                id=""
                
              />
              <div className="btn btn-plus-minus" onClick={guestsIncrease}>
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
