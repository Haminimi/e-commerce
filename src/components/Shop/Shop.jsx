import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage';
import styles from './Shop.module.css';

const Shop = ({ addItem }) => {
	const [url, setUrl] = useState('https://fakestoreapi.com/products');
	const [currentCategory, setCurrentCategory] = useState('all products');
	const [products, setProducts] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (response.status >= 400) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	console.log(products);

	function handleUrlChange(category) {
		if (category === 'all products') {
			setUrl('https://fakestoreapi.com/products');
		} else {
			setUrl(`https://fakestoreapi.com/products/category/${category}`);
		}
		setCurrentCategory(category);
	}

	function toCapitalize(string) {
		if (string === 'jewelery') {
			return 'Jewelry';
		}
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	if (error) return <ErrorPage />;
	if (loading) return <Loading />;

	return (
		<>
			<div data-testid="shop" className={styles.shop}>
				<header className={styles.header}>
					<nav data-testid="category-navbar" className={styles.links}>
						<Link
							className={
								currentCategory === 'all products'
									? styles.activeLink
									: styles.inactiveLink
							}
							onClick={() => handleUrlChange('all products')}
						>
							All Products
						</Link>
						<Link
							data-testid="women's-clothing"
							className={
								currentCategory === "women's clothing"
									? styles.activeLink
									: styles.inactiveLink
							}
							onClick={() => handleUrlChange("women's clothing")}
						>
							Women&apos;s clothing
						</Link>
						<Link
							className={
								currentCategory === "men's clothing"
									? styles.activeLink
									: styles.inactiveLink
							}
							onClick={() => handleUrlChange("men's clothing")}
						>
							Men&apos;s clothing
						</Link>
						<Link
							className={
								currentCategory === 'electronics'
									? styles.activeLink
									: styles.inactiveLink
							}
							onClick={() => handleUrlChange('electronics')}
						>
							Electronics
						</Link>
						<Link
							className={
								currentCategory === 'jewelery'
									? styles.activeLink
									: styles.inactiveLink
							}
							onClick={() => handleUrlChange('jewelery')}
						>
							Jewelry
						</Link>
					</nav>
				</header>
				<h1>{toCapitalize(currentCategory)}</h1>
				<br />
				<div className={styles.productsContainer}>
					{products.map((product) => {
						return (
							<Card
								key={product.id}
								product={product}
								addItem={addItem}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

Shop.propTypes = {
	addItem: PropTypes.func.isRequired,
};

export default Shop;
