import * as Schema from "@effect/schema/Schema";

export const BooleanFromNumber: Schema.Schema<boolean, number> =
  Schema.transform(Schema.Number, Schema.Boolean, {
    decode: (n) => n !== 0,
    encode: Number,
  });
