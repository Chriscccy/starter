export class Router {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  async handle(req, res) {
    const { method, path } = req;
    const route = this.routes.find(
      (r) => r.method === method && this._matchPath(r.path, path)
    );

    if (!route) {
      return res.json({ error: 'Route not found' }, 404);
    }

    req.params = this._extractParams(route.path, path);
    return route.handler(req, res);
  }

  _matchPath(routePath, reqPath) {
    const routeParts = routePath.split('/');
    const reqParts = reqPath.split('/');
    if (routeParts.length !== reqParts.length) return false;
    return routeParts.every(
      (part, i) => part.startsWith(':') || part === reqParts[i]
    );
  }

  _extractParams(routePath, reqPath) {
    const params = {};
    routePath.split('/').forEach((part, i) => {
      if (part.startsWith(':')) {
        params[part.slice(1)] = reqPath.split('/')[i];
      }
    });
    return params;
  }
}
