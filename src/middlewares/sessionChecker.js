const checkSession = (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  next();
};

const checkPath = (pathOption, req) => {
  if (!pathOption.method) {
    return req.path.match(pathOption);
  }
  if (pathOption.path) {
    return req.method === pathOption.method && req.path.match(pathOption.path);
  }
  return false;
}
const unlessPathInclude = (paths, middleware) => (req, res, next) => {
  const isAllowed = !req.path.startsWith("/api") || paths.some(path => checkPath(path, req));
  if (isAllowed) {
    return next();
  }
  return middleware(req, res, next);
};

module.exports = whiteList =>
  unlessPathInclude(whiteList, checkSession);
