import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='empty-state' style={{ marginTop: '80px' }}>
            <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
            <p>Page not found.</p>
            <Link to='/' className='view-btn'>← Go Home</Link>
        </div>
    )
}
