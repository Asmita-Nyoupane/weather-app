import { useFavoriteCity } from '@/hooks/use-favorite'

import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useWeather } from '@/hooks/use-weather'
import { Button } from '../ui/button'
import { Loader2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
type TProps = {
    id: string, name: string, lat: number, lon: number, onRemove: (id: string) => void
}

const FavoriteCities = () => {
    const { favorites, removeFavorites } = useFavoriteCity()
    if (!favorites.length) return null
    return (
        <>
            <h2 className='header'> Favorites</h2>
            <ScrollArea className='w-full pb-10'>
                <div className='flex gap-4'>
                    {
                        favorites.map((city) => {
                            return <FavoriateCityTablet key={city.id} {...city} onRemove={() => removeFavorites.mutate(city.id)} />
                        })
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

        </>
    )
}
function FavoriateCityTablet({ id, name, lat, lon, onRemove }: TProps) {
    const navigate = useNavigate();
    const { data: weatherData, isLoading } = useWeather({ lat, lon })
    return <div
        onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
        role='button'
        tabIndex={0}
        className=' relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-lg transition-all hover:shadow-md group'>
        <Button
            variant={'ghost'}
            size={'icon'}
            onClick={(e) => {
                e.stopPropagation();
                onRemove(id)
                toast.error(`Remove ${name} from favorites`)
            }}
            className='absolute right-1 top-1 size-6 rounded-full p-0 hover:text-destructive-foreground gove-hover:opacity-100'>
            <X className="size-4" />
        </Button>
        {
            isLoading ?
                <div className='flex h-8  items-center  gap-4'>

                    <Loader2 className='size-4 animate-spin' />
                </div> : weatherData ? <div className='flex items-center justify-between w-full gap-4'>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt={weatherData.weather[0].description}
                        className='size-8'
                    />
                    <div className='flex flex-col gap-2   w-full'>

                        <div className='flex  items-center  justify-start  gap-2 '>
                            <p className='font-semibold'>{name}</p>
                            <p className='text-sm text-muted-foreground'>
                                {weatherData.sys.country}
                            </p>
                        </div>
                        <div className='flex  items-center gap-2 '>
                            <p className=' title '>{Math.round(weatherData.main.temp)}°</p>
                            <p className='text-sm text-muted-foreground capitalize'>
                                {weatherData.weather[0].description}
                            </p>
                        </div>
                    </div>

                </div> : null

        }

    </div>

}
export default FavoriteCities
