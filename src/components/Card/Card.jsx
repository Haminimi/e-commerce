import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ product, addItem }) => {
	const [numberOfItems, setNumberOfItems] = useState(0);

	function handleClick() {
		addItem(Number(numberOfItems), product);
		setNumberOfItems(0);
	}

	return (
		<div key={product.id} className={styles.product}>
			<div className={styles.imageAndPrice}>
				<div className={styles.imageContainer}>
					<img src={product.image} alt="" className={styles.image} />
				</div>

				<div className={styles.priceContainer}>
					<h1 className={styles.price}>
						<b>{product.price} $</b>
					</h1>
				</div>
			</div>

			<div className={styles.descriptionAndButton}>
				<div className={styles.detailsContainer}>
					<p className={styles.productTitle}>
						<h2 className={styles.productTitle}>
							<b>{product.title}</b>
						</h2>
					</p>
					<br />
					<p className={styles.description}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</p>
				</div>

				<div className={styles.inputAndButton}>
					<input
						value={numberOfItems}
						className={styles.input}
						onChange={(e) => setNumberOfItems(e.target.value)}
						type="number"
					/>
					<button className={styles.buyButton} onClick={handleClick}>
						Add{' '}
						<span
							className={`material-symbols-outlined ${styles.addIcon}`}
						>
							add
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	product: PropTypes.object.isRequired,
	addItem: PropTypes.func.isRequired,
};

export default Card;
