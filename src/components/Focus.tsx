import { useLocalStorage } from '../hooks/use-local-storage';

export function Focus() {
  const [focus, setFocus] = useLocalStorage('focus', '');

  return (
    <div className="focus">
      <p className="serif">what will you focus on today?</p>
      <div className="user-input">
        <input
          type="text"
          placeholder="today i will focus on..."
          value={focus}
          onChange={event => {
            setFocus(event.target.value);
          }}
        />
        <button onClick={() => setFocus('')}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}
