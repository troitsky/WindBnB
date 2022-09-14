import './ReservationCard.css'

export default function ReservationCard(props) {
    
    return (
        <div className="reservation_card"> 
            <a href="">
                <img className="reservation_card_image" src="https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2255&q=80" alt="reservation image" />
            </a>
            <div className="reservation_card_details_row">
                <span className="super_host_tag">SUPER HOST</span>
                <p className="reservation_type">Entire apartment Entire apartment Entire apartment</p>
                <span className="reservation_score"><i class="fa-solid fa-star"></i>4.40</span>
            </div>
            
            <a href="" className="reservation_card_description">Stylist apartment in center of the city Entire apartment Entire apartment Entire apartmentEntire apartmentEntire apartmentEntire apartmentEntire apartmentEntire apartment</a>
        </div>
    )
}