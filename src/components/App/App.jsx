import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Shop from '../Shop/Shop';
import styles from './App.module.css';

const App = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const { name } = useParams();

	return (
		<>
			<main>
				<Header path={currentPath}></Header>

				<div className={styles.appContainer}>
					{name === 'shop' ? <Shop /> : <Home />}
				</div>
			</main>
		</>
	);
};

export default App;
