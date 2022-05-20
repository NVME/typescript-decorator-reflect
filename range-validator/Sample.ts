import { RangeParameter } from "./RangeParameter.ts";
import { ValidateRange } from "./ValidateRange.ts";

export class Sample {
    // Validate the input ranges
    @ValidateRange
    public updatePercentage(
        // Define a min,max of 0,100
        @RangeParameter(0, 100)
        newValue: number,
        // Does nothing
        negative: boolean = false,
    ) {
        console.log(newValue);
    }
}