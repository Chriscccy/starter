export function success(res, data, message = 'Success') {
  return res.json({ status: 0, message, data });
}

export function fail(res, error, status = 400) {
  return res.json({ status: 1, error: error.message || error }, status);
}
