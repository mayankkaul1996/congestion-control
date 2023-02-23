import db from "../../../utils/db";
import { Collections } from "../../../utils/db/constants";
import { TTaxRules } from "./types";

type TCongestionTaxRulesByCity = {
  city: string;
  tax_rules: TTaxRules[];
};

//It would be better if we had a model for all collections in the DB.
const congestionTaxRuleCollection = db.collection<TCongestionTaxRulesByCity>(
  Collections.congestionTaxRules
);

export const getTaxRulesByCity = async (city: string): Promise<TCongestionTaxRulesByCity | null> => {
  const taxRules = await congestionTaxRuleCollection.findOne({ city });
  return taxRules;
};
