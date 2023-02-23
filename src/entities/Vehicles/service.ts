import { EVehicles } from "./constants";
import { Vehicle } from "./types";

//would make sense to split different vehicles having different props in the future
export const getVehicle = (vehicleName: string): Vehicle => {
    return {
        getVehicleType: () => EVehicles[vehicleName as keyof typeof EVehicles]
    }
}