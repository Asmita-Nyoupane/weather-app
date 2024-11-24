import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localstorage";
type TFavoriteCity = {
    id: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    addedAt: number
}

export function useFavoriteCity() {
    const [favorites, setFavorites] = useLocalStorage<TFavoriteCity[]>("favorites", [])
    const queryClient = new QueryClient()
    // get the available favorites from local storage
    const favoritesQuery = useQuery({
        queryKey: ['favorites'],
        queryFn: () => favorites,
        initialData: favorites,
        staleTime: Infinity
    })
    const addFavorite = useMutation(
        {
            mutationFn: async (favoritesCity: Omit<TFavoriteCity, "id" | "addedAt">) => {
                const newFavoritesCity: TFavoriteCity = {
                    ...favoritesCity,
                    id: `${favoritesCity.lat}-${favoritesCity.lon}`,
                    addedAt: Date.now()
                }
                // check if city is already added as favoriates
                const exists = favorites.some((fav) => fav.id == newFavoritesCity.id)
                //  if exist simply return it without adding
                if (exists) return favorites
                // only store 10 favorites
                const newfavorites = [newFavoritesCity, ...favorites].slice(0, 10)
                setFavorites(newfavorites)
                return newfavorites
            }, onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['favorites']
                })
            }

        }
    )
    const removeFavorites = useMutation({
        mutationFn: async (cityId: string) => {
            const newFavorites = favorites.filter((city) => city.id !== cityId)
            setFavorites(newFavorites);
            return newFavorites
        }, onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['favorites']
            })
        }
    })
    return {
        favorites: favoritesQuery.data,
        addFavorite,
        removeFavorites,
        isFavorite: (lat: number, lon: number) => {
            return favorites.some((city) => city.lat === lat && city.lon === lon)
        }
    }
}