import { useRouter } from "next/router";
import { Options, optionsDefaults, Serializers } from "./defs";

export type UseQueryStatesKeysMap<T> = {
  [K in keyof T]: Serializers<T[K]>;
};

export type Values<T> = {
  [K in keyof T]: T[K] | null;
};

export type UpdatedValues<T> = {
  [K in keyof T]: T[K];
};

export type SetValues<T> = (updatedValues: UpdatedValues<T>) => Promise<boolean>;

export type UseQueryStatesReturn<T> = [Values<T>, SetValues<T>];

export function useQueryStates<T extends { [key: string]: any }>(
  queries: UseQueryStatesKeysMap<T>,
  { history }: Options = optionsDefaults
): UseQueryStatesReturn<T> {
  const router = useRouter();
  const getValue = (key: string) => (router.query[key] ? (router.query[key] as string) : null); // todo: not handling lists yet

  const setQueryStates = (updatedParams: UpdatedValues<T>) => {
    Object.keys(updatedParams).forEach((key: keyof Values<T>) => {
      router.query[key as string] = queries[key].serialize(updatedParams[key]);
    });
    return history === "replace" ? router.replace(router) : router.push(router);
  };
  const values = Object.keys(queries).reduce((queryStates, key) => {
    const value = getValue(key);
    return { ...queryStates, [key]: value ? queries[key].parse(value) : null };
  }, {}) as Values<T>;

  return [values, setQueryStates];
}
