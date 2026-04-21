// Minimal type stub for @xenova/transformers (browser WASM build).
// The package ships its own types in newer versions; this stub prevents
// tsc from erroring while the package is used via dynamic import.
declare module "@xenova/transformers" {
  export function pipeline(
    task: string,
    model: string,
    options?: Record<string, unknown>
  ): Promise<unknown>;
}
