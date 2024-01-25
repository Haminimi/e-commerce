import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Shop from '../Shop/Shop';
import Cart from '../Cart/Cart';
import styles from './App.module.css';

const App = () => {
	const [numberOfItems, setNumberOfItems] = useState(0);
	const [cart, setCart] = useState([]);
	const location = useLocation();
	const currentPath = location.pathname;
	const { name } = useParams();

	function addItem(number, newProduct) {
		setNumberOfItems(numberOfItems + number);
		const alreadyInTheCartIndex = cart.findIndex(
			(cartProduct) => cartProduct.id === newProduct.id
		);

		if (alreadyInTheCartIndex !== -1) {
			setCart((prevCart) => [
				...prevCart.slice(0, alreadyInTheCartIndex),
				{
					...prevCart[alreadyInTheCartIndex],
					number: prevCart[alreadyInTheCartIndex].number + number,
				},
				...prevCart.slice(alreadyInTheCartIndex + 1),
			]);
		} else {
			setCart((prevCart) => [
				...prevCart,
				{ id: newProduct.id, product: newProduct, number: number },
			]);
		}
	}

	return (
		<>
			<main>
				<Header
					path={currentPath}
					numberOfItems={numberOfItems}
				></Header>

				<div className={styles.appContainer}>
					{name === 'shop' ? (
						<Shop addItem={addItem} />
					) : name === 'cart' ? (
						<Cart cart={cart} />
					) : (
						<Home />
					)}
				</div>
			</main>
		</>
	);
};

export default App;
