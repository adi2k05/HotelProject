import { useState, useEffect } from 'react'
import HotelCard from '../components/HotelCard'

export default function HotelListing() {

    let PAGE_SIZE = 12
    let [hotels, setHotels] = useState([])
    let [total, setTotal] = useState(0)
    let [current, setCurrent] = useState(0)
    let [loading, setLoading] = useState(true)
    let [search, setSearch] = useState('')
    let [searchInput, setSearchInput] = useState('')

    let url = `https://demohotelsapi.pythonanywhere.com/hotels/?limit=${PAGE_SIZE}&skip=${current * PAGE_SIZE}`

    async function dataFetch() {
        setLoading(true)
        let res = await fetch(url)
        let hotelData = await res.json()
        setTotal(hotelData.count)
        setHotels(hotelData.data)
        setLoading(false)
    }

    useEffect(() => {
        dataFetch()
    }, [current])

    let noOfPages = Math.ceil(total / PAGE_SIZE)

    let filteredHotels = hotels.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.location.toLowerCase().includes(search.toLowerCase())
    )

    function handleSearch(e) {
        e.preventDefault()
        setSearch(searchInput)
        setCurrent(0)
    }

    function clearSearch() {
        setSearch('')
        setSearchInput('')
    }

    return (
        <div className='listing-page'>

            <div className='hero-section'>
                <h1 className='hero-title'>Find Your Perfect Stay</h1>
                <p className='hero-sub'>500+ hotels across India — business, leisure, luxury & budget</p>

                <form className='search-bar' onSubmit={handleSearch}>
                    <input
                        type='text'
                        placeholder='Search by hotel name or city...'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='search-input'
                    />
                    <button type='submit' className='search-btn'>Search</button>
                    {search && (
                        <button type='button' onClick={clearSearch} className='clear-btn'>✕ Clear</button>
                    )}
                </form>
            </div>

            <div className='result-info'>
                {search
                    ? `Showing ${filteredHotels.length} result(s) for "${search}"`
                    : `Showing ${hotels.length} of ${total} hotels`
                }
            </div>

            {loading && (
                <div className='loading-wrap'>
                    <div className='spinner'></div>
                    <p>Loading hotels...</p>
                </div>
            )}

            {!loading && (
                <div className='hotel-grid'>
                    {filteredHotels.map((el) => (
                        <HotelCard
                            key={el.id}
                            id={el.id}
                            name={el.name}
                            location={el.location}
                            thumbnail={el.thumbnail}
                            price={el.price}
                            rating={el.rating}
                            description={el.description}
                        />
                    ))}
                </div>
            )}

            {!loading && filteredHotels.length === 0 && (
                <div className='empty-state'>
                    <p>😕 No hotels found for "{search}"</p>
                    <button onClick={clearSearch} className='view-btn'>Show all hotels</button>
                </div>
            )}

            {!search && !loading && (
                <div className='pagination'>
                    <button
                        className='page-btn'
                        onClick={() => setCurrent(current - 1)}
                        disabled={current === 0}
                    >
                        ← Prev
                    </button>

                    {
                        Array.from({ length: noOfPages }, (_, i) => i).map((el) => (
                            <button
                                key={el}
                                className={`page-btn ${current === el ? 'active' : ''}`}
                                onClick={() => { setCurrent(el) }}
                            >
                                {el + 1}
                            </button>
                        ))
                    }

                    <button
                        className='page-btn'
                        onClick={() => setCurrent(current + 1)}
                        disabled={current === noOfPages - 1}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    )
}
