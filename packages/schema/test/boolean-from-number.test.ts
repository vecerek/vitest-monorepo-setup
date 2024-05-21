import * as Schema from "@effect/schema/Schema";
import { BooleanFromNumber } from "@org/repo-schema";
import { Effect, pipe } from "effect";
import { assert, describe, it } from "vitest"

const schema = BooleanFromNumber;
const decode = Schema.decodeUnknown(schema);
const encode = Schema.encode(schema);

describe("BooleanFromNumber", () => {
  it("passes the decode-encode round-trip test", () => {
    const expected = 0;
    const actual = pipe(
      expected,
      decode,
      Effect.flatMap(encode),
      Effect.runSync,
    );

    assert.equal(actual, expected);
  });

  it("passes the encode-decode round-trip test", () => {
    const expected = false;
    const actual = pipe(
      expected,
      encode,
      Effect.flatMap(decode),
      Effect.runSync,
    );

    assert.equal(actual, expected);
  });

  it("returns a failure for a string", () => {
    const actual = pipe(
      "0",
      decode,
      Effect.flatMap(encode),
      Effect.isFailure,
      Effect.runSync,
    );

    assert.equal(actual, true);
  });
});
