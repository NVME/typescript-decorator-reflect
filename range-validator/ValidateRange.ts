import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";
import { RANGE_KEY } from "./constants.ts";

export function ValidateRange(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) {
    // Store the original value
    const savedValue = descriptor.value;
    // Attach validation logic
    descriptor.value = (...args: any[]) => {
        // Pull the active ranges (if any)
        const monitoredRanges: { [key: number]: number[] } = (
            Reflect.getOwnMetadata(
                RANGE_KEY,
                target,
                propertyKey,
            )
            ||
            {}
        );
        // Check all monitored ranges
        // tslint:disable-next-line:forin
        for (const key in Reflect.ownKeys(monitoredRanges)) {
            const range = monitoredRanges[key];
            const value = args[key];
            // Throw error if outside range
            if (value < range[0] || value > range[1]) {
                throw new Error("Value outside of range");
            }
        }
        // Actually call the function
        return Reflect.apply(savedValue, target, args);
    };
}