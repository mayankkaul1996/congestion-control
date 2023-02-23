import { Router, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { catchErrors } from "../../utils/catchErrors";
import { validateRoute } from "../../utils/middleware";
import { getVehicle } from "../Vehicles";
import { GetCongestionTaxSchema } from "./schema";
import CongestionTaxCalculator from "./service";
import { getTaxRules } from "./taxRules";

/**
 * @swagger
 * tags:
 *  name: Tax Calculator
 *  description: APIs for Congestion Tax Calculation
 *
 * components:
 *  schemas:
 *    # This Schema is used for POST APIs
 *    TaxCalculatorPOSTRequest:
 *      type: object
 *      description: For tax calculation post requests
 *      properties:
 *        vehicle:
 *          type: string
 *          description: Name of the vehicle type
 *          enum: [Car,Motorbike, Tractor, Emergency, Diplomat, Foreign, Military]
 *        tollDates:
 *          type: array
 *          description: Toll Dates to consider for congestion tax calculator
 *      example:
 *        vehicle: Car
 *        tollDates: ["2013-01-14 07:21:00", "2013-01-14 15:32:00", "2013-01-14 16:21:00", "2013-01-14 17:21:00"]
 *    TaxCalculatorPOSTResponse:
 *      type: object
 *      description: Response for tax calculation API
 *      properties:
 *        message:
 *          type: string
 *          description: Message
 *        congestionTax:
 *          type: number
 *          description: Calculated congestion tax
 *      example:
 *        message: OK
 *        congestionTax: 60
 */
export const calculatorRouter = Router({ mergeParams: true });

/**
 * @swagger
 * /v1/calculator/{cityName}:
 *  post:
 *    summary: Get Congestion Tax for a City
 *    tags: [Tax Calculator]
 *    parameters:
 *      - in: path
 *        name: cityName
 *        description: City Name for which the tax needs to be calculated
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaxCalculatorPOSTRequest'
 *    responses:
 *      200:
 *        description: Calculated Tax
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaxCalculatorPOSTResponse'
 */
calculatorRouter.post(
  "/:cityName",
  validateRoute(GetCongestionTaxSchema, "body", { abortEarly: false }),
  catchErrors(async (req: Request, res: Response) => {
    const { vehicle, tollDates } = req.body;
    const vehicleInstance = getVehicle(vehicle);
    const taxRules = await getTaxRules(req.params.cityName);
    const congestionTax = new CongestionTaxCalculator(
      taxRules
    ).getCongestionTax(
      vehicleInstance,
      tollDates.map((date: string) => new Date(date))
    );
    return res.sendJson(StatusCodes.OK, {
      congestionTax: congestionTax,
      message: ReasonPhrases.OK,
    });
  })
);
