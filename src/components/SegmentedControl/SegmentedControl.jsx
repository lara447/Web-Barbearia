import styles from './SegmentedControl.module.css';

export default function SegmentedControl({ options, value, onChange }) {
  return (
    <div className={styles.group} role="tablist">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={[styles.tab, active && styles.isActive].filter(Boolean).join(' ')}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
