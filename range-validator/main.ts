import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";

import { RANGE_KEY } from "./constants.ts";
import { Sample } from "./Sample.ts";

//  deno run -c tsconfig.json .\range-validator\main.ts

// Initialize
const demoSample = new Sample();
// Working value
demoSample.updatePercentage(10);
// Bad value
try {
    demoSample.updatePercentage(200);
} catch (error) {
    // do nothing
}