import { getTaxRulesByCity } from "./db";
import { TTaxRules } from "./types";



export const getTaxRules = async (city: string): Promise<TTaxRules[]> => {
  const taxRules = await getTaxRulesByCity(city);
  return taxRules?.tax_rules || [];
}