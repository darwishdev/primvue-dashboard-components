import { getRouteVariation } from '@/utils/routeUtils';
import { useRoute } from 'vue-router';

export function useRouteVariation(variation: string): { routeName: string } {
    const route = useRoute();
    const routeName = getRouteVariation(route.name as string, variation);
    return { routeName };
}
