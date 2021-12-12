import { Options, optionsDefaults, queryTypes, Serializers } from "./defs";
import { useQueryStates } from "./useQueryStates";

export type UseQueryStateReturn<T> = [T | null, (updatedValue: T) => Promise<boolean>];

export function useQueryState<T = string>(
  key: string,
  // @ts-ignore: more specific string is correctly a subset of this type
  serializer: Serializers<T> = queryTypes.string,
  options: Options = optionsDefaults
): UseQueryStateReturn<T> {
  const [values, setValues] = useQueryStates<{ [key: string]: T }>({ [key]: serializer }, options);
  return [values[key], (value: any) => setValues({ [key]: value })];
}
