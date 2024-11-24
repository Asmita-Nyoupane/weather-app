import { TCordinate } from "@/api/type";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";
export const WEATHER_QUERY =
    {
        WEATHER: (coords: TCordinate) => ['weather', coords] as const,
        FOERECAST: (coords: TCordinate) => ['forecast', coords] as const,
        REVERSEGEO: (coords: TCordinate) => ['location', coords] as const,
        SEARCH: (query: string) => ['location-search', query] as const,
    } as const


export function useWeather(coordinates: TCordinate | null) {
    return useQuery({
        queryKey: WEATHER_QUERY.WEATHER(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,

    })
}

export function useForecast(coordinates: TCordinate | null) {
    return useQuery({
        queryKey: WEATHER_QUERY.FOERECAST(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates,

    })
}

export function useReverseGeoCoding(coordinates: TCordinate | null) {
    return useQuery({
        queryKey: WEATHER_QUERY.REVERSEGEO(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.reverseGeoCod(coordinates) : null,
        enabled: !!coordinates,

    })
}
// searchLocation
export function useSearchLocationQuery(query: string) {
    return useQuery({
        queryKey: WEATHER_QUERY.SEARCH(query),
        queryFn: () => weatherAPI.searchLocation(query),
        enabled: query.length > 3,

    })
}