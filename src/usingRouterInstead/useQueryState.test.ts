import { renderHook, act } from "@testing-library/react-hooks";
import { useQueryState } from "./useQueryState";
import { queryTypes } from "./defs";

describe("useQueryState", () => {
  it("value should start out as null", () => {
    const { result } = renderHook(() => useQueryState("key"));
    let [state, setState] = result.current;
    expect(state).toBe(null);

    act(() => {
      setState("value");
    });

    [state] = result.current;

    expect(state).toBe("value");
  });

  it("should correctly set the value", () => {
    const { result } = renderHook(() => useQueryState("key"));
    let [, setState] = result.current;

    act(() => {
      setState("value");
    });

    let [state] = result.current;
    expect(state).toBe("value");
  });

  it("should correctly do serialization and parsing", () => {
    const { result } = renderHook(() => useQueryState<number>("key", queryTypes.integer));
    let [, setState] = result.current;

    act(() => {
      setState(100);
    });

    let [state] = result.current;
    expect(state).toBe(100);
  });
});
