import './ReservationCard.css'

export default function ReservationCard(props) {
    const {city, country, superHost, title, rating, maxGuests, type, beds, photo, ...other} = props;

    return (
        <div className="reservation_card"> 
            <a href="">
                <img className="reservation_card_image" src={photo} alt={title} />
            </a>
            <div className="reservation_card_details_row">
                {superHost && <span className="super_host_tag">SUPER HOST</span>}
                <p className="reservation_type">{type}{beds && `. ${beds} beds`}</p>
                <span className="reservation_score"><i className="fa-solid fa-star"></i>{rating}</span>
            </div>
            
            <a href="" className="reservation_card_description">{title}</a>
        </div>
    )
}