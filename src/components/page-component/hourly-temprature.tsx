import { TForecastData } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

const HourlyTemprature = ({ forecastData }: { forecastData: TForecastData }) => {
    const data = forecastData?.list?.slice(0, 8)?.map((item) => ({
        time: item.dt ? format(new Date(item.dt * 1000), "ha") : "Invalid Time",
        temp: Math.round(item.main.temp || 0),
        feels_like: Math.round(item.main.feels_like || 0),
    })) || [];

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="title">
                    Today's Temperature
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={730}
                            height={250}
                            data={data}
                        >
                            <XAxis
                                dataKey="time"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}°`}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <Card className="border  bg-foreground-muted shadow p-4">

                                                <div className="flex gap-2 subtitile">
                                                    <p className="">Temprature</p>
                                                    <p>
                                                        {payload[0].value}°
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 subtitile">
                                                    <p>Feels Like</p>
                                                    <p>
                                                        {payload[1].value}°
                                                    </p>
                                                </div>

                                            </Card>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Line type="monotone" dataKey="temp" stroke="#1f18a2" dot={false}
                                strokeWidth={2} />
                            <Line type="monotone" dataKey="feels_like" stroke="#82ca9d" dot={false}
                                strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default HourlyTemprature;
