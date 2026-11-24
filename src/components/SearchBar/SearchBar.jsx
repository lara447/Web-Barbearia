import Icon from '../Icon/Icon';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder, ...rest }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        <Icon name="search" size={18} />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        {...rest}
      />
    </div>
  );
}
