import styles from './Loading.module.css';

const Loading = () => {
	return (
		<div className={styles.loadingScreen}>
			<div data-testid="loading-animation" className={styles.spinner}>
				<div className={styles.firstBall}></div>
				<div className={styles.secondBall}></div>
				<div className={styles.thirdBall}></div>
			</div>
		</div>
	);
};

export default Loading;
