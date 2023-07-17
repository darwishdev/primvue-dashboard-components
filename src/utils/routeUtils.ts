export function getRouteVariation(currentRoute: string, variation: string): string {
    const routeParts = currentRoute.split('_');
    // remvove last char "s" if the function is list by  routeParts[0].slice(0, -1) 
    let featureName = routeParts[1] == 'list' ? routeParts[0].slice(0, -1) : routeParts[0];

    featureName = variation == 'list' ? `${featureName}s` : featureName
    return `${featureName}_${variation}`;
}
