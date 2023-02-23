import { StatusCodes, ReasonPhrases } from "http-status-codes";
import supertest from "supertest";
import { app } from "../../src/app";
import * as taxRulesDB from "../../src/entities/taxCalculator/taxRules/db";
import {
  validTaxCalculator,
  InvalidVehicle,
  InvalidDates,
  invalidCity
} from "../mocks/taxCalculator.json";

const request = supertest(app);

jest
  .spyOn(taxRulesDB, "getTaxRulesByCity")
  .mockImplementation(() => require("../mocks/taxRules.json").gothenbergRules);

describe("Tax Calculator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`POST /calculator/Gothenberg should return status 200`, () => {
    const { city, tax, ...requestBody } = validTaxCalculator;
    return request
      .post(`/v1/calculator/${city}`)
      .send(requestBody)
      .expect(StatusCodes.OK)
      .then(({ body }) => {
        expect(body.congestionTax).toBe(tax);
        expect(body.message).toEqual(ReasonPhrases.OK);
      });
  });

  it(`POST /calculator/Gothenbergs should return status 400 - Invalid vehicle`, () => {
    const { city, ...requestBody } = InvalidVehicle;
    return request
      .post(`/v1/calculator/${city}`)
      .send(requestBody)
      .expect(StatusCodes.BAD_REQUEST)
      .then(({ body }) => {
        expect(body).toHaveProperty("errors");
      });
  });

  it(`POST /calculator/Gothenbergs should return status 400 - Invalid City`, () => {
    const { city, ...requestBody } = invalidCity;
    return request
      .post(`/v1/calculator/${city}`)
      .send(requestBody)
      .expect(StatusCodes.BAD_REQUEST)
      .then(({ body }) => {
        expect(body).toHaveProperty("errors");
      });
  });

  it(`POST /calculator/Gothenbergs should return status 400 - Invalid Dates`, () => {
    const { city, ...requestBody } = InvalidDates;
    return request
      .post(`/v1/calculator/${city}`)
      .send(requestBody)
      .expect(StatusCodes.BAD_REQUEST)
      .then(({ body }) => {
        expect(body).toHaveProperty("errors");
      });
  });

});
