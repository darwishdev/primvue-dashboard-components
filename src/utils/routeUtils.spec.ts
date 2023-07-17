import { getRouteVariation } from './routeUtils';
import { describe, it, expect } from 'vitest';

const testCases = [
    { routeName: 'roles_list', variation: 'update', expectedRoute: 'role_update' },
    { routeName: 'roles_list', variation: 'create', expectedRoute: 'role_create' },
    { routeName: 'role_view', variation: 'update', expectedRoute: 'role_update' },
    { routeName: 'role_view', variation: 'create', expectedRoute: 'role_create' },
    { routeName: 'role_create', variation: 'list', expectedRoute: 'roles_list' },
    { routeName: 'users_list', variation: 'update', expectedRoute: 'user_update' },
    { routeName: 'users_list', variation: 'create', expectedRoute: 'user_create' },
    { routeName: 'user_view', variation: 'update', expectedRoute: 'user_update' },
    { routeName: 'user_view', variation: 'create', expectedRoute: 'user_create' },
    { routeName: 'user_create', variation: 'list', expectedRoute: 'users_list' },
];

describe('getRouteVariation', () => {
    testCases.forEach(({ routeName, variation, expectedRoute }) => {
        it(`returns the correct ${variation} route name for ${routeName}`, () => {
            const result = getRouteVariation(routeName, variation);
            expect(result).toBe(expectedRoute);
        });
    });
});
