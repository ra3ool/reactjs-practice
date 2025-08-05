import { RouteConfig } from '@/types';

class RouteBuilder {
  private config: Partial<RouteConfig>;

  constructor(options: Partial<RouteConfig> = {}) {
    this.config = options;
  }

  withComponent(component: RouteConfig['component']): RouteBuilder {
    this.config.component = component;
    return this;
  }

  withChildren(children: RouteConfig[]): RouteBuilder {
    this.config.children = children;
    return this;
  }

  withRedirect(redirect: string): RouteBuilder {
    this.config.redirect = redirect;
    return this;
  }

  asIndex(): RouteBuilder {
    this.config.index = true;
    // delete this.config.path;
    return this;
  }

  build(): RouteConfig {
    return this.config as RouteConfig;
  }
}

const createRoute = (options: Partial<RouteConfig> = {}): RouteBuilder => {
  return new RouteBuilder(options);
};

export default createRoute;
