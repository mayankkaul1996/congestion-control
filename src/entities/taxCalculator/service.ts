import { Vehicle } from "../Vehicles";
import { DEFAULT_GROUP_WINDOW, DEFAULT_MAX_TAX_PER_HOUR } from "./constants";
import { TTaxRules } from "./taxRules/types";
import { getTollFreeVehicles } from "./utils";

export default class CongestionTaxCalculator {
  /**
   * Should be stores in a configuration store.
   * Can be passed through constructor later on to make it configurable.
   */
  private GROUP_WINDOW = DEFAULT_GROUP_WINDOW;
  private MAX_TAX_PER_HOUR = DEFAULT_MAX_TAX_PER_HOUR;

  private rules: TTaxRules[] = [];

  constructor(rules: TTaxRules[]) {
    this.rules = rules;
  }

  getCongestionTax(vehicle: Vehicle, tollDates: Date[]): number {
    //get date values in ascending order to parse them later
    const dates = tollDates.sort((a, b) => a.getTime() - b.getTime());

    //making groups considering a default GROUP_WINDOW
    const groups = dates.reduce(
      (groups: Date[][], currentDate: Date): Date[][] => {
        const previousGroup = groups[groups.length - 1];
        if (
          !groups.length ||
          (currentDate.getTime() - previousGroup[0].getTime()) / 60000 >
            this.GROUP_WINDOW
        ) {
          groups.push([currentDate]);
          return groups;
        }

        groups[groups.length - 1].push(currentDate);
        return groups;
      },
      []
    );

    //calculating total tax across groups
    const tax = groups.reduce(
      (totalTax: number, currentGroup: Date[]): number => {
        return (totalTax += currentGroup.reduce(
          (groupTax: number, currentDate: Date) =>
            Math.max(groupTax, this.getTollFee(currentDate, vehicle)),
          0
        ));
      },
      0
    );

    return Math.min(this.MAX_TAX_PER_HOUR, tax);
  }

  getTollFee(date: Date, vehicle: Vehicle): number {
    if (this.isTollFreeDate(date) || this.isTollFreeVehicle(vehicle)) return 0;

    const hour: number = date.getHours();
    const minute: number = date.getMinutes();

    //this logic requires the data to be stored in a particular format
    const tax = this.rules.find((rule) => {
      if (
        (rule.startHour < hour ||
          (rule.startHour == hour && minute >= rule.startMinute)) &&
        (rule.endHour > hour ||
          (hour == rule.endHour && minute <= rule.endMinute))
      ) {
        return true;
      }
    })?.tax;

    return tax || 0;
  }

  //would be better if can maintain a list of dates in some external datasource
  isTollFreeDate(date: Date): boolean {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDay() + 1;
    const dayOfMonth: number = date.getDate();

    if (day == 7 || day == 1) return true;

    if (year == 2013) {
      if (
        (month == 1 && dayOfMonth == 1) ||
        (month == 3 && (dayOfMonth == 28 || dayOfMonth == 29)) ||
        (month == 4 && (dayOfMonth == 1 || dayOfMonth == 30)) ||
        (month == 5 &&
          (dayOfMonth == 1 || dayOfMonth == 8 || dayOfMonth == 9)) ||
        (month == 6 &&
          (dayOfMonth == 5 || dayOfMonth == 6 || dayOfMonth == 21)) ||
        month == 7 ||
        (month == 11 && dayOfMonth == 1) ||
        (month == 12 &&
          (dayOfMonth == 24 ||
            dayOfMonth == 25 ||
            dayOfMonth == 26 ||
            dayOfMonth == 31))
      ) {
        return true;
      }
    }
    return false;
  }

  isTollFreeVehicle(vehicle: Vehicle): boolean {
    if (vehicle == null) return false;
    const vehicleType: string = vehicle.getVehicleType();
    return getTollFreeVehicles().some(
      (tollFreeVehicle) => tollFreeVehicle === vehicleType
    );
  }
}
