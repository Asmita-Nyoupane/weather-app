import { API_CONFIG } from "./config"
import { TCordinate, TForecastData, TGeocodingResponse, TWeatherData } from "./type"

class WeatherAPI {
    private createUrl(endpoint: string, params: Record<string, string | number>) {

        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params
        })
        return `${endpoint}?${searchParams.toString()}`;
    }
    private async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Weather API Error:${response.statusText}`)
        }
        return response.json()

    }
    async getCurrentWeather({ lat, lon }: TCordinate): Promise<TWeatherData> {

        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        })
        return this.fetchData<TWeatherData>(url)
    }
    async getForecast({ lat, lon }: TCordinate): Promise<TForecastData> {

        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),

            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        })

        return this.fetchData<TForecastData>(url)
    }

    async reverseGeoCod({ lat, lon }: TCordinate): Promise<TGeocodingResponse[]> {

        const url = this.createUrl(`${API_CONFIG.GEO_CODING}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1
        })
        return this.fetchData<TGeocodingResponse[]>(url)
    }
    async searchLocation(query: string): Promise<TGeocodingResponse[]> {

        const url = this.createUrl(`${API_CONFIG.GEO_CODING}/direct`, {
            q: query,
            limit: 5
        })
        return this.fetchData<TGeocodingResponse[]>(url)
    }
}
export const weatherAPI = new WeatherAPI()