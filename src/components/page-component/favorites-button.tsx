import { TWeatherData } from "@/api/type"
import { useFavoriteCity } from "@/hooks/use-favorite"
import { Button } from "../ui/button"
import { Star } from "lucide-react"
import toast from "react-hot-toast"


const FavoritesButton = ({ weatherData }: {
    weatherData: TWeatherData
}) => {
    const { addFavorite, removeFavorites, isFavorite } = useFavoriteCity()
    const isCurrentlyFavorite = isFavorite(weatherData.coord.lat, weatherData.coord.lon)
    const handleToggleFavorite = () => {
        if (isCurrentlyFavorite) {
            removeFavorites.mutate(`${weatherData.coord.lat}-${weatherData.coord.lon}`)
            toast.error(`Removed ${weatherData.name} from Favorites`)
        }
        else {
            addFavorite.mutate({
                name: weatherData.name,
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon,
                country: weatherData.sys.country
            })
            toast.success(`Added ${weatherData.name} from Favorites`)
        }

    }
    return (
        <Button onClick={handleToggleFavorite} variant={isCurrentlyFavorite ? "default" : "outline"}
            size={'icon'}
            className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-700" : ""}>
            <Star className={`size-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
        </Button>
    )
}

export default FavoritesButton
