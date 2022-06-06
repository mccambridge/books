import Link from 'next/link';
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li className="push-right">
                        <Link href="/">
                            <a className={styles.logo}>Sean's Library</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/add">
                            <button className="btn btn-blue btn-small">Add book</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}