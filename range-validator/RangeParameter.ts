import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";
import { RANGE_KEY } from "./constants.ts";

export function RangeParameter(
    min: number = 0,
    max: number = 100,
) {
    return (
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) => {
        // Pull existing metadata (if any)
        const existingRanges: { [key: number]: number[] } = (
            Reflect.getMetadata(RANGE_KEY, target, propertyKey)
            ||
            {}
        );
        // Add new value
        existingRanges[parameterIndex] = [min, max];
        // Store metadata
        Reflect.defineMetadata(RANGE_KEY, existingRanges, target, propertyKey);
    };
}