import { MongoClient } from "mongodb";
import { config } from "../../config";

const client = new MongoClient(config.get('mongodbUri'));

export default client.db('prod');