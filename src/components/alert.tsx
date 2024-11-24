import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";

type Props = {
    errorMessage: string | null;
    title: string;
    icon: ReactNode;
    enableLocation: () => void;
    btnMessage: string;
};

export function WeatherErrorCard({ title, errorMessage, icon, enableLocation, btnMessage }: Props) {
    return (
        <div className=" flex justify-center items-center h-screen">

            <Card className="border  p-6 rounded-md shadow-md flex flex-col    gap-3 max-w-md mx-auto">

                <div className="flex items-center gap-2">
                    {icon}
                    <h3 className="title">{title}</h3>
                </div>
                <p className="">{errorMessage}</p>
                <Button
                    onClick={enableLocation}
                    variant="outline"
                    className="mt-2 w-fit self-end  bg-green-500 text-white hover:border-green-400 hover:text-primary hover:bg-transparent "
                >
                    {btnMessage}
                </Button>
            </Card>
        </div>
    );
}
