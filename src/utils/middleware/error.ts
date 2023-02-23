import { ErrorLibrary } from '../../utils';

export const middlewareErrorLib: ErrorLibrary = {
  FileNotFound: {
    status: 404,
    message: 'File Not Found',
  },
  CompressionError: {
    status: 500,
    message: 'Error in Compression',
  },
};
