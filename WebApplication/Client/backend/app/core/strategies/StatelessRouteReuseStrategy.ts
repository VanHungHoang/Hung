import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

/**
 * Class is used to prevent component/module reloading while the route is change.
 */
export class StatelessRouteReuseStrategy extends RouteReuseStrategy {
    storedRouteHandles: { [key: string]: DetachedRouteHandle } = {};

    constructor() {
        super();
    }

    /**
     * Determines if this route (and its subtree) should be detached to be reused later
     * @param route 
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    /**
     * Stores the detached route
     * @param route 
     * @param handle 
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedRouteHandles[route.routeConfig.path] = handle;
    }

    /**
     * Determines if this route (and its subtree) should be reattached
     * @param route 
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.storedRouteHandles[route.routeConfig.path];
    }

    /**
     * Retrieves the previously stored route
     * @param route 
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig)
            return null;
        return this.storedRouteHandles[route.routeConfig.path];
    }

    /**
     * Determines if a route should be reused
     * @param future 
     * @param curr 
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return curr.routeConfig == future.routeConfig;
    }
}