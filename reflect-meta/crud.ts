import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";
//https://techsparx.com/nodejs/typescript/decorators/reflection.html
// https://medium.com/jspoint/introduction-to-reflect-metadata-package-and-its-ecmascript-proposal-8798405d7d88
// deno run -c tsconfig.json .\reflect-meta\crud.ts
class MetadataExample {
    prop1: string = 'prop1';
    prop2: number = 42;
}

const example2 = new MetadataExample();

console.log({
    ownMetadataKeys: Reflect.getOwnMetadataKeys(example2),
    metadataKeys: Reflect.getMetadataKeys(example2)
});

//create a meta data
Reflect.defineMetadata('metaProp1', 'prop1', example2);

console.log({
    ownMetadataKeys: Reflect.getOwnMetadataKeys(example2),
    metadataKeys: Reflect.getMetadataKeys(example2)
});

//create a meta data on prop1
Reflect.defineMetadata('metaKey1ForProp1', 'data stored in prop1',
        example2, 'prop1');

console.log({
    prop1OwnMetadataKeys: Reflect.getOwnMetadataKeys(example2, 'prop1'),
    prop1MetadataKeys: Reflect.getMetadataKeys(example2, 'prop1')
});

//check existing
console.log({
    hasMetadata: Reflect.hasMetadata('metaProp1', example2),
    hasOwnMetadata: Reflect.hasOwnMetadata('metaProp1', example2),
    prop1NotHasMetadata: Reflect.hasMetadata('metaProp1', example2, 'prop1'),
    prop1NotHasOwnMetadata: Reflect.hasOwnMetadata('metaProp1', example2, 'prop1'),
    prop1HasMetadata: Reflect.hasMetadata('metaKey1ForProp1', example2, 'prop1'),
    prop1HasOwnMetadata: Reflect.hasOwnMetadata('metaKey1ForProp1', example2, 'prop1'),
});

// Read 
console.log({
    metadata: Reflect.getMetadata('metaProp1', example2),
    ownMetadata: Reflect.getOwnMetadata('metaProp1', example2),
    prop1NotMetadata: Reflect.getMetadata('metaProp1', example2, 'prop1'),
    prop1NotOwnMetadata: Reflect.getOwnMetadata('metaProp1', example2, 'prop1'),
    prop1Metadata: Reflect.getMetadata('metaKey1ForProp1', example2, 'prop1'),
    prop1OwnMetadata: Reflect.getOwnMetadata('metaKey1ForProp1', example2, 'prop1'),
});

// To update a metadata value, we call defineMetadata again:

Reflect.defineMetadata('metaProp1', 'NEW IMPROVED prop1', example2);
Reflect.defineMetadata('metaKey1ForProp1', 'NEW IMPROVED prop1 on prop1', example2, 'prop1');

// Delete
Reflect.deleteMetadata('metaProp1', example2);
Reflect.deleteMetadata('metaKey1ForProp1', example2, 'prop1');
