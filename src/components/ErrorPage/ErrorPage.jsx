import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
	return (
		<div className={styles.errorPage}>
			<h1>
				Oh no, this route doesn&apos;t exist or there was a network
				error encountered. Sorry. ❤️{' '}
			</h1>
			<Link className={styles.link} to="/">
				You can go back to the home page by clicking here!
			</Link>
		</div>
	);
};

export default ErrorPage;
