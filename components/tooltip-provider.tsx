import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider as Provider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface IToltipProps {
    text: string;
    children: ReactNode
}

export function TooltipProvider({ children, text }: IToltipProps) {
  return (
    <Provider delayDuration={0}>
        <Tooltip>
            <TooltipTrigger asChild>
            {children}
            </TooltipTrigger>
            <TooltipContent side="right" className="p-2 rounded shadow-md">
            {text}
            <TooltipArrow width={10} height={10} className="" />
            </TooltipContent>
        </Tooltip>
    </Provider>
  )
}
