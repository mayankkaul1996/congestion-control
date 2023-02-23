import dotenv from 'dotenv';
import { join } from 'path';
import { ipaddress, url } from 'convict-format-with-validator';
import schema from './schema';
import convict from 'convict';

dotenv.config({ path: join(__dirname, '.env') });

convict.addFormat(ipaddress);
convict.addFormat(url);

export const config = convict(schema);
config.validate({ allowed: 'strict' });
