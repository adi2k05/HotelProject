import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function HotelDetail() {

    const { id } = useParams()

    let [hotel, setHotel] = useState(null)
    let [loading, setLoading] = useState(true)
    let [activePhoto, setActivePhoto] = useState(0)
    let [booked, setBooked] = useState(false)

    async function fetchHotel() {
        let url = `https://demohotelsapi.pythonanywhere.com/hotels/${id}`
        let res = await fetch(url)
        let data = await res.json()
        setHotel(data.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchHotel()
    }, [])

    function renderStars(rating) {
        return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))
    }

    function ratingColor(rating) {
        if (rating >= 4.5) return '#16a34a'
        if (rating >= 3.5) return '#ca8a04'
        return '#dc2626'
    }

    if (loading) {
        return (
            <div className='loading-wrap' style={{ marginTop: '80px' }}>
                <div className='spinner'></div>
                <p>Loading hotel details...</p>
            </div>
        )
    }

    if (!hotel) {
        return (
            <div className='empty-state'>
                <p>Hotel not found.</p>
                <Link to='/' className='view-btn'>← Back to Listings</Link>
            </div>
        )
    }

    return (
        <div className='detail-page'>

            <Link to='/' className='back-link'>← Back to all hotels</Link>

            <div className='detail-header'>
                <div>
                    <h1 className='detail-name'>{hotel.name}</h1>
                    <p className='hotel-location' style={{ fontSize: '1rem' }}>📍 {hotel.location}</p>
                </div>
                <div className='detail-rating-block'>
                    <span className='stars' style={{ color: ratingColor(hotel.rating), fontSize: '1.4rem' }}>
                        {renderStars(hotel.rating)}
                    </span>
                    <span className='rating-num' style={{ fontSize: '1.2rem', color: ratingColor(hotel.rating) }}>
                        {hotel.rating} / 5
                    </span>
                </div>
            </div>

            <div className='gallery'>
                <div className='gallery-main'>
                    <img src={hotel.photos[activePhoto]} alt='hotel' className='gallery-main-img' />
                </div>
                <div className='gallery-thumbs'>
                    {hotel.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`photo-${index}`}
                            className={`gallery-thumb ${activePhoto === index ? 'active-thumb' : ''}`}
                            onClick={() => setActivePhoto(index)}
                        />
                    ))}
                </div>
            </div>

            <div className='detail-info-row'>
                <div className='info-card'>
                    <span className='info-icon'>💰</span>
                    <div>
                        <p className='info-label'>Price per night</p>
                        <p className='info-value'>₹{Number(hotel.price).toLocaleString('en-IN')}</p>
                    </div>
                </div>
                <div className='info-card'>
                    <span className='info-icon'>📍</span>
                    <div>
                        <p className='info-label'>Location</p>
                        <p className='info-value'>{hotel.location}</p>
                    </div>
                </div>
                <div className='info-card'>
                    <span className='info-icon'>⭐</span>
                    <div>
                        <p className='info-label'>Rating</p>
                        <p className='info-value' style={{ color: ratingColor(hotel.rating) }}>{hotel.rating} / 5</p>
                    </div>
                </div>
            </div>

            <div className='detail-section'>
                <h2>About This Hotel</h2>
                <p className='detail-desc'>{hotel.description}</p>
            </div>

            <div className='book-section'>
                {booked ? (
                    <div className='booked-msg'>
                        ✅ Booking confirmed for <strong>{hotel.name}</strong>! A confirmation will be sent to your email.
                    </div>
                ) : (
                    <button className='book-btn' onClick={() => setBooked(true)}>
                        Book Now — ₹{Number(hotel.price).toLocaleString('en-IN')}/night
                    </button>
                )}
            </div>

        </div>
    )
}
