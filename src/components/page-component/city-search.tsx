
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { useState } from "react"
import { Button } from "../ui/button"
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react"
import { useSearchLocationQuery } from "@/hooks/use-weather"
import { useNavigate } from "react-router-dom"
import { useSearchHistory } from "@/hooks/use-search-history"
import { format } from "date-fns"
import { useDebounce } from "@/hooks/use-debounce"
import { useFavoriteCity } from "@/hooks/use-favorite"

const CitySearch = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    // called debounce hook
    const debouncedQuery = useDebounce(query, 500);
    const { data: searchData, isLoading: isSearchLoading } = useSearchLocationQuery(debouncedQuery)
    const { history, clearHistory, addToHistory } = useSearchHistory()
    const { favorites } = useFavoriteCity()
    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|")
        console.log("🚀 ~ handleSelect ~ cityData:", cityData)
        // add to search  history
        addToHistory.mutate({
            query,
            lat: parseFloat(lat), lon: parseFloat(lon), name, country
        })
        setOpen(false)
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
    }
    return (
        <>
            <Button className=" relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-60" variant={'outline'} onClick={() => setOpen(true)}>
                <Search className="size-4 mr-2" />
                Search Cities..
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput value={query}

                    onValueChange={setQuery}
                    placeholder="Search Cities.." />
                <CommandList>
                    {query.length > 2 && !isSearchLoading && <CommandEmpty>No cities found.</CommandEmpty>}
                    {favorites && favorites.length > 0 && (
                        <>
                            <CommandSeparator />
                            <CommandGroup heading="Favorites">
                                {favorites?.map((location) => (
                                    <CommandItem
                                        key={location.id}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`} onSelect={handleSelect}>
                                        <Star className="size-4 mr-2 text-yellow-500" />
                                        <span>{location.name},</span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">{location.state},</span>
                                        )}
                                        {location.country && (
                                            <span className="text-sm text-muted-foreground">{location.country}</span>
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    )}

                    {history.length > 0 &&
                        <>
                            <CommandSeparator />
                            <CommandGroup >
                                <div className="flex items-center justify-between px-2 my-2">
                                    <p className="subtitle text-muted-foreground">Recent Searches</p>
                                    <Button variant={'ghost'} size={'icon'}
                                        onClick={() => clearHistory.mutate()}>
                                        <XCircle className="size-4" />
                                    </Button>
                                </div>

                            </CommandGroup>
                            {history?.map((location) => (
                                <CommandItem
                                    key={`${location.lat}-${location.lon}`}
                                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`} onSelect={handleSelect}>
                                    <Clock className="size-4 mr-2 text-muted-foreground" />
                                    <span>{location.name
                                    },</span>
                                    {location.state && <span className="text-sm text-muted-foreground">{location.state
                                    },</span>}
                                    {
                                        location.country && <span className="text-sm text-muted-foreground">,
                                            {location.country}
                                        </span>
                                    }
                                    <span className="text-sm text-muted-foreground">
                                        {format(location.searchAt, "MMM d, h:mm a")}
                                    </span>
                                </CommandItem>
                            ))
                            }
                        </>}


                    {searchData && searchData.length > 0 && (
                        <>
                            <CommandSeparator />
                            <CommandGroup heading="Suggestions">
                                {isSearchLoading && (
                                    <div className="flex items-center justify-center p-4">
                                        <Loader2 className="size-4 animate-spin" />
                                    </div>
                                )}
                                {searchData?.map((location) => (
                                    <CommandItem
                                        key={`${location.lat}-${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`} onSelect={handleSelect}>
                                        <Search className="size-4 mr-2" />
                                        <span>{location.name},</span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">{location.state},</span>
                                        )}
                                        {location.country && (
                                            <span className="text-sm text-muted-foreground">{location.country}</span>
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    )}

                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CitySearch
