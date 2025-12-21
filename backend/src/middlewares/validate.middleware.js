export const validate =
  (schema) =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        issues: result.error.format(),
      });
    }

    // Replace body with validated & transformed data
    req.body = result.data;
    next();
  };
