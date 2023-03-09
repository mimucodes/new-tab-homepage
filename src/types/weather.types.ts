export interface WeatherInfo {
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
};