import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <Link to='/' className='nav-brand'>🏨 StayFinder</Link>
            <div className='nav-tagline'>500+ Hotels Across India</div>
        </nav>
    )
}
