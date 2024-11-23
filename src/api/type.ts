
export type TCordinate = {
    lat: number,
    lon: number
}
export type TWeatherCondition = {
    id: number,
    main: string,
    description: string,
    icon: string
}
export type TForecastData = {
    cod: string,
    message: string,
    cnt: number,
    list: Array<{
        dt: number,
        main: TWeatherData['main'],
        weather: TWeatherCondition[],
        clouds: {
            all: string
        },
        wind: TWeatherData['wind'],
        dt_txt: string,
    }>,
    city: {
        id: number,
        name: string,
        coord: TCordinate,
        country: string,
        sunrise: string,
        sunset: string
    }
}
export type TWeatherData = {
    coord: TCordinate
    weather: TWeatherCondition[]
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: string,
        sunset: number
    },
    dt: number,
    name: string,
}
export type TGeocodingResponse = {
    name: string,
    local_name?: Record<string, string>,
    lat: number,
    lon: number,
    country: string,
    state?: string
}