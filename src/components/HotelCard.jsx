import { Link } from 'react-router-dom'

export default function HotelCard({ id, name, location, thumbnail, price, rating, description }) {

    function renderStars(rating) {
        let stars = ''
        let rounded = Math.round(rating)
        for (let i = 1; i <= 5; i++) {
            stars += i <= rounded ? '★' : '☆'
        }
        return stars
    }

    function ratingColor(rating) {
        if (rating >= 4.5) return '#16a34a'
        if (rating >= 3.5) return '#ca8a04'
        return '#dc2626'
    }

    return (
        <div className='hotel-card'>
            <div className='hotel-card-img-wrap'>
                <img src={thumbnail} alt={name} className='hotel-card-img' />
                <span className='hotel-badge'>
                    {rating >= 4.5 ? '⭐ Top Rated' : rating >= 4 ? '👍 Popular' : '🏨 Available'}
                </span>
            </div>

            <div className='hotel-card-body'>
                <h2 className='hotel-name'>{name}</h2>
                <p className='hotel-location'>📍 {location}</p>
                <p className='hotel-desc'>{description.slice(0, 120)}...</p>

                <div className='hotel-footer'>
                    <div className='hotel-rating' style={{ color: ratingColor(rating) }}>
                        <span className='stars'>{renderStars(rating)}</span>
                        <span className='rating-num'>{rating}</span>
                    </div>
                    <div className='hotel-price-block'>
                        <span className='hotel-price'>₹{Number(price).toLocaleString('en-IN')}</span>
                        <span className='per-night'>/night</span>
                    </div>
                </div>

                <Link to={`/hotel/${id}`} className='view-btn'>
                    View Details →
                </Link>
            </div>
        </div>
    )
}
