import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";

export const ATTRIBUTE_PREFIX = 'attribute:';

interface IAttributeProperties {
    icon?: string;
    type?: AttributeType;
    isEditable?: boolean;
    isVisible?: boolean;
}

export enum AttributeType {
    Text,
    Date,
    Number,
    Password
}

/**
 * Adds attribute metadata to a property
 * @param {IAttributeProperties} attributes
 * @returns {(target: any, propertyKey: string) => void}
 * @constructor
 */
export function Attribute(attributes: IAttributeProperties) {
  return (target: object, propertyKey: string) => {
    if (attributes !== undefined && attributes !== null) {
      Object.keys(attributes).forEach(key => {
        Reflect.defineMetadata(`${ATTRIBUTE_PREFIX}${key}`, attributes[key as keyof IAttributeProperties], target, propertyKey);
      });
    }
  };
}