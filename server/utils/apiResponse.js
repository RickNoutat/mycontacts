export const ok = (res, data = null, message = "OK", status = 200) =>
  res.status(status).json({ success: true, message, data });

export const created = (res, data = null, message = "Created") =>
  res.status(201).json({ success: true, message, data });

export const fail = (res, message = "Error", code = 400, details = undefined) =>
  res
    .status(code)
    .json({ success: false, message, code, ...(details ? { details } : {}) });
