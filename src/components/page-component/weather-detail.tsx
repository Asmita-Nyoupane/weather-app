import { TWeatherData } from "@/api/type"
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type TProps = {
    weatherData: TWeatherData
}
const WeatherDetails = ({ weatherData }: TProps) => {
    const { wind, main, sys } = weatherData;
    const formatTime = (timeStamp: number) => {
        return format(new Date(timeStamp * 1000), "h:mm a")

    }
    const getWindDirection = (degree: number) => {
        const directions = ['N', 'W', 'NE', 'E', 'SE', 'S', 'SW', 'NW'];
        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8
        return directions[index]

    }
    const weatherDetails = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: " text-orange-500"
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: " text-orange-700"
        },
        {
            title: "Wind",
            value: ` ${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color: " text-blue-500"
        },
        {
            title: "Pressure",
            value: `${main.pressure}`,
            icon: Gauge,
            color: "text-purple-500"
        },

    ]
    return (
        <Card className="lg:w-[40%] h-fit">
            <CardHeader>
                <CardTitle className="title">
                    Weather Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {
                        weatherDetails?.map((detail) => (
                            <Card className=" flex items-center gap-3 p-4" key={detail.title}>
                                <detail.icon className={`size-4 ${detail.color}`} />
                                <div className="flex flex-col gap-1 items-start">
                                    <p className="subtitle">{detail.title}</p>
                                    <p className=" text-muted-foreground">{detail.value}</p>
                                </div>
                            </Card>
                        ))
                    }
                </div>

            </CardContent>

        </Card>
    )
}

export default WeatherDetails
