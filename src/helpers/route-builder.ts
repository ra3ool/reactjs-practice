import { RouteConfig, RouteMeta, RouteType, UserRole } from '@/types';

class RouteBuilder {
  private config: Partial<RouteConfig>;

  constructor(options: Partial<RouteConfig> = {}) {
    this.config = options;
  }

  withMeta(meta: RouteMeta): RouteBuilder {
    this.config.meta = { ...this.config.meta, ...meta };
    return this;
  }

  withTitle(title: string): RouteBuilder {
    this.config.meta = { ...this.config.meta, title };
    return this;
  }

  withDescription(description: string): RouteBuilder {
    this.config.meta = { ...this.config.meta, description };
    return this;
  }

  withIcon(icon: string): RouteBuilder {
    this.config.meta = { ...this.config.meta, icon };
    return this;
  }

  withRoles(role: UserRole): RouteBuilder {
    this.config.meta = { ...this.config.meta, role };
    return this;
  }

  requiresAuth(requiresAuth: boolean = true): RouteBuilder {
    this.config.meta = { ...this.config.meta, requiresAuth };
    return this;
  }

  withLayout(layout: string): RouteBuilder {
    this.config.meta = { ...this.config.meta, layout };
    return this;
  }

  withBreadcrumb(breadcrumb: boolean = true): RouteBuilder {
    this.config.meta = { ...this.config.meta, breadcrumb };
    return this;
  }

  withCache(cache: boolean = true): RouteBuilder {
    this.config.meta = { ...this.config.meta, cache };
    return this;
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

  build(): RouteConfig {
    return this.config as RouteType;
  }
}

const createRoute = (options: Partial<RouteConfig> = {}): RouteBuilder => {
  return new RouteBuilder(options);
};

export default createRoute;
