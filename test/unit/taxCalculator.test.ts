import CongestionTaxCalculator from "../../src/entities/taxCalculator/service";
import { getTaxRules } from "../../src/entities/taxCalculator/taxRules";
import { gothenbergRules } from "../mocks/taxRules.json";
import {
  validCarTaxForEachDate,
  validSingleChargeRule,
  validTollFreeDates,
  validTollFreeVehicles,
} from "../mocks/taxCalculatorUnits.json";
import * as taxRulesDB from "../../src/entities/taxCalculator/taxRules/db";
import { getVehicle } from "../../src/entities/Vehicles";

jest
  .spyOn(taxRulesDB, "getTaxRulesByCity")
  .mockImplementation(() => require("../mocks/taxRules.json").gothenbergRules);

describe("Congestion Tax Calculator", () => {
  let taxCalculator: CongestionTaxCalculator;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const rules = await getTaxRules(gothenbergRules.city);
    taxCalculator = new CongestionTaxCalculator(rules);
  });

  describe(`Get Congestion Tax for Car`, () => {
    validCarTaxForEachDate.map(({ vehicle, dates, tax }) => {
      const vehicleInstance = getVehicle(vehicle);
      dates.map((date) => {
        test(`Congestion Tax - ${date}`, () => {
          const evaluatedTax = taxCalculator.getTollFee(
            new Date(date),
            vehicleInstance
          );
          expect(evaluatedTax).toBe(tax);
        });
      });
    });
  });

  describe(`Single Charge Rule for Car`, () => {
    validSingleChargeRule.map(({ vehicle, dates, tax }) => {
      const vehicleInstance = getVehicle(vehicle);
      test(`Single Charge Rule - ${JSON.stringify(dates)}`, () => {
        const evaluatedTax = taxCalculator.getCongestionTax(
          vehicleInstance,
          dates.map((date) => new Date(date))
        );
        expect(evaluatedTax).toBe(tax);
      });
    });
  });

  describe(`Toll Free Date`, () => {
    validTollFreeDates.map(({ date, isTollFree }) => {
      test(`Toll Free Date - ${date}`, () => {
        const isTollFreeDate = taxCalculator.isTollFreeDate(new Date(date));
        expect(isTollFreeDate).toBe(isTollFree);
      });
    });
  });

  describe(`Toll Free Vehicle`, () => {
    validTollFreeVehicles.map(({ vehicle, isTollFree }) => {
      test(`Toll Free Vehicle - ${vehicle}`, () => {
        const vehicleInstance = getVehicle(vehicle);
        const isTollFreeVehicle = taxCalculator.isTollFreeVehicle(vehicleInstance);
        expect(isTollFreeVehicle).toBe(isTollFree);
      });
    });
  });
});
