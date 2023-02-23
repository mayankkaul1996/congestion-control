export const normalizePort = (val: number | string): number | string | boolean => {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  }

  return false;
};
