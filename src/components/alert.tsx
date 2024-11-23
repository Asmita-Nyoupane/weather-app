import { AlertCircle, AlertTriangle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
type Props = {
    errorMessage: string | null,
    title: string;
    icon: ReactNode;
    enableLocation: () => void,
    btnMessage: string

}

export function WeatherAlert({ title, errorMessage, icon, enableLocation, btnMessage }: Props) {
    return (
        <Alert variant="destructive" className=" px-2 py-4  flex flex-col gap-2 justify-center">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="space-y-3">
                <p>{errorMessage}</p>
                <Button onClick={enableLocation} variant="outline" size='icon' className="w-fit px-2">
                    {btnMessage}
                    {icon}
                </Button>
            </AlertDescription>
        </Alert >
    )
}
0