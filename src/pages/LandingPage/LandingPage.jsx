import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css'

const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.LandingPage}>
            <h1>Doc Share</h1>
            <button onClick={() => navigate('/signin')}>
                Get Started
            </button>
        </div>
    )
}

export default LandingPage;