import { DateTime } from './components/DateTime';
import { Focus } from './components/Focus';
import { Weather } from './components/Weather';

export default function App() {
  return (
    <div className="container d-grid">
      <DateTime />
      <Weather />
      <Focus />
      <svg id="gradient" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence
            baseFrequency="0.6"
            type="fractalNoise"
            numOctaves="3"
            result="noise"
          />
        </filter>
        <rect width="100" height="100" filter="url(#noise)" />
      </svg>
    </div>
  );
}

// TODO check the article https://www.geeksforgeeks.org/how-to-convert-unix-timestamp-to-time-in-javascript/
