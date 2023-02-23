import * as Joi from 'joi';
import { EVehicles } from '../Vehicles';

export const GetCongestionTaxSchema = Joi.object({
    vehicle: Joi.string().required().valid(...Object.values(EVehicles)),
    tollDates: Joi.array().required().items(Joi.date().iso().required())
});
