import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ path, numberOfItems }) => {
	const currentPath = path;

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.shopName}>AwesomeShop </h1>

				<nav className={styles.headerLinks}>
					<Link
						to="/"
						className={
							currentPath === '/'
								? styles.activeLink
								: styles.inactiveLink
						}
					>
						Home
					</Link>{' '}
					<Link
						to="/shop"
						className={
							currentPath === '/shop'
								? styles.activeLink
								: styles.inactiveLink
						}
					>
						Shop
					</Link>
					<div className={styles.shoppingCartContainer}>
						<Link
							to="/cart"
							className={
								currentPath === '/cart'
									? styles.activeCartLink
									: styles.inactiveCartLink
							}
						>
							<span
								className={`material-symbols-outlined ${styles.cartIcon}`}
							>
								shopping_cart
							</span>
						</Link>
						<div className={styles.cartItemCount}>
							<span>{numberOfItems}</span>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Header;
