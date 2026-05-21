import styles from "./StarBackground.module.scss";

export default function StarBackground() {
  return (
    <>
      <div className={styles.starsMicro} />
      <div className={styles.starsSmall} />
      <div className={styles.starsMedium} />
      <div className={styles.starsLarge} />
      <div className={styles.starsGiant} />
    </>
  );
}
