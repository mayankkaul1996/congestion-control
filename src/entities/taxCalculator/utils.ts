import { ETollFreeVehicles } from "./types"


export const getTollFreeVehicles = () => {
    return Object.values(ETollFreeVehicles);
}