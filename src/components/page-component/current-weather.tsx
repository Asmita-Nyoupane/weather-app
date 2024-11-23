import { TGeocodingResponse, TWeatherData } from "@/api/type"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react"

type TProps = {
    locationName?: TGeocodingResponse
    weatherData: TWeatherData
}

const CurrentWeather = ({ locationName, weatherData }: TProps) => {
    const {
        weather: [currentWeather],
        main: {
            temp, feels_like, temp_max, temp_min, humidity
        },
        wind: { speed }
    } = weatherData;
    const formatTemp = (temp: number) => `${Math.round(temp)}°`
    return (

        <Card className="p-4 ">
            <CardContent className="space-y-4 ">


                {locationName &&
                    <section className="flex gap-4 items-center">
                        <h2 className="subtitle">{locationName.name}</h2> <span className="text-muted-foreground">
                            {locationName.state ? locationName.state : null}
                        </span>
                        <p className="subtitle">{locationName.country}</p>

                    </section>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <section className="space-y-6">
                        <h2 className="header">{formatTemp(temp)}</h2>
                        <div className="flex items-center gap-6 flex-wrap">
                            <p className=" text-muted-foreground"> Feels like {formatTemp(feels_like)}</p>
                            <p className=" text-muted-foreground flex gap-2 items-center">
                                <ArrowUp className="size-4 text-green-500" />
                                {formatTemp(temp_max)}
                            </p>
                            <p className=" text-muted-foreground flex gap-2 items-center">
                                <ArrowDown className="size-4 text-red-500" />
                                {formatTemp(temp_min)}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:gap-6  md:grid-cols-2">

                            <div className="flex gap-4 items-center  ">
                                <Droplets className="size-5 text-blue-500" />
                                <div className="flex  gap-1 flex-col items-start">
                                    <p className="subtitle">
                                        Humidity
                                    </p>
                                    <p className="text-muted-foreground">
                                        {humidity} %
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2  items-center">
                                <Wind className="size-5 text-blue-500" />
                                <div className="flex gap-1  flex-col items-start">
                                    <p className="subtitle">
                                        Wind Speed
                                    </p>
                                    <p className="text-muted-foreground">
                                        {speed} m/s
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="flex relative flex-col gap-1 items-center justify-center">
                        <div className=" flex aspect-square w-full max-w-[200px] items-center justify-center">
                            <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`} alt=" weather icon" />
                        </div>
                        <div className="absolute bottom-0 text-center">

                            <p className="text-muted-foreground capitalize">
                                {
                                    currentWeather.description
                                }
                            </p>
                        </div>
                    </div>
                </div>


            </CardContent>
        </Card>


    )
}

export default CurrentWeather
