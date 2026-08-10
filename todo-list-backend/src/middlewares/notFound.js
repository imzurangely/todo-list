const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `La ruta ${req.method} ${req.originalUrl} no existe`,
  });
};

module.exports = notFound;
