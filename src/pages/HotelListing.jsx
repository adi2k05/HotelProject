import { useState, useEffect } from 'react'
import HotelCard from '../components/HotelCard'

export default function HotelListing() {

    const PAGE_SIZE = 12

    const [hotels, setHotels] = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(0)
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')

    async function dataFetch() {

        setLoading(true)

        let url = ''

        if (search.trim() === '') {
            url = `https://demohotelsapi.pythonanywhere.com/hotels/?limit=${PAGE_SIZE}&skip=${current * PAGE_SIZE}`
        }
        else {
            url = `https://demohotelsapi.pythonanywhere.com/hotels/?search=${encodeURIComponent(search)}`
        }

        const res = await fetch(url)
        const hotelData = await res.json()

        setHotels(hotelData.data)

        if (search.trim() === '') {
            setTotal(hotelData.count)
        }
        else {
            setTotal(hotelData.returned)
        }

        setLoading(false)
    }

    useEffect(() => {
        dataFetch()
    }, [current, search])

    const noOfPages = Math.ceil(total / PAGE_SIZE)

    function handleSearch(e) {
        e.preventDefault()
        setCurrent(0)
        setSearch(searchInput.trim())
    }

    function clearSearch() {
        setSearch('')
        setSearchInput('')
        setCurrent(0)
    }

    return (
        <div className='listing-page'>

            <div className='hero-section'>
                <h1 className='hero-title'>Find Your Perfect Stay</h1>

                <p className='hero-sub'>
                    500+ hotels across India — business, leisure, luxury & budget
                </p>

                <form className='search-bar' onSubmit={handleSearch}>

                    <input
                        type='text'
                        placeholder='Search by hotel name or city...'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='search-input'
                    />

                    <button
                        type='submit'
                        className='search-btn'
                    >
                        Search
                    </button>

                    {search && (
                        <button
                            type='button'
                            className='clear-btn'
                            onClick={clearSearch}
                        >
                            ✕ Clear
                        </button>
                    )}

                </form>
            </div>

            <div className='result-info'>
                {
                    search
                        ? `Showing ${hotels.length} result(s) for "${search}"`
                        : `Showing ${hotels.length} of ${total} hotels`
                }
            </div>

            {loading && (
                <div className='loading-wrap'>
                    <div className='spinner'></div>
                    <p>Loading hotels...</p>
                </div>
            )}

            {!loading && hotels.length > 0 && (

                <div className='hotel-grid'>

                    {hotels.map((hotel) => (

                        <HotelCard
                            key={hotel.id}
                            id={hotel.id}
                            name={hotel.name}
                            location={hotel.location}
                            thumbnail={hotel.thumbnail}
                            price={hotel.price}
                            rating={hotel.rating}
                            description={hotel.description}
                        />

                    ))}

                </div>

            )}

            {!loading && hotels.length === 0 && (

                <div className='empty-state'>

                    <p>😕 No hotels found for "{search}"</p>

                    <button
                        className='view-btn'
                        onClick={clearSearch}
                    >
                        Show all hotels
                    </button>

                </div>

            )}

            {!loading && !search && (

                <div className='pagination'>

                    <button
                        className='page-btn'
                        disabled={current === 0}
                        onClick={() => setCurrent(current - 1)}
                    >
                        ← Prev
                    </button>

                    {
                        Array.from(
                            { length: noOfPages },
                            (_, i) => i
                        ).map((page) => (

                            <button
                                key={page}
                                className={`page-btn ${current === page ? 'active' : ''}`}
                                onClick={() => setCurrent(page)}
                            >
                                {page + 1}
                            </button>

                        ))
                    }

                    <button
                        className='page-btn'
                        disabled={current === noOfPages - 1}
                        onClick={() => setCurrent(current + 1)}
                    >
                        Next →
                    </button>

                </div>

            )}

        </div>
    )
}