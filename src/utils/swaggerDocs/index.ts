import swaggerUi from "swagger-ui-express";
import docs from "./docGenerator";
export { isSwaggerAllowedToServe } from "./utils";

export const swaggerServer = swaggerUi.serve;
export const swaggerDocs = swaggerUi.setup(docs);
