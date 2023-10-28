"use client";

import {
  useMemo,
  useState,
  useEffect
} from "react";
import { registerEvent } from "./setup";
import { recordEvent } from "./logging";

export const TEST = 'TEST';

// Turns events into tracked events
export function useRecordedEvent<T>(callback: Function, name?: string): [(data: T) => void, string] {
  const parentName = arguments.callee.caller.name;
  const callbackName = callback.name;
  const eventName = !!name ? name : `${parentName}-${callbackName}`;

  useMemo(() => {
    registerEvent(eventName, callback);
  }, [eventName, callback]);

  const recordedEventCallback = useMemo(() => {
    return async (data: T) => {
      await callback();
      recordEvent(eventName, data);
    };
  }, [eventName, callback]);

  return [recordedEventCallback, eventName];
}

// Tracks every time state changes

type UseRecordedState<T> = [T, (newValue: T) => void, string];

export function useRecordedState<T>(name: string, defaultValue: T): UseRecordedState<T> {
  const [value, setValue] = useState(defaultValue);

  function setValueAndTrack(newValue: T) {
    recordEvent(name, newValue);
    setValue(newValue);
  }

  return [value, setValueAndTrack, name];
}

// Tracks every time an effect happens
// This would probably be bad because useEffect get called often
export function useRecordedEffect(name: string, callback: Function, triggers: any[]) {
  useEffect(() => {
    recordEvent(name, {});
    callback();
  }, triggers);
}

// Runs and records when every condition is true
export function useConditionalEffect(
  name: string,
  callback: Function,
  conditions: boolean[],
  triggers: any[]
) {
  useEffect(() => {
    if (conditions.every(c => c)) {
      recordEvent(name, {});
      callback();
    }
  }, triggers);
}

// // Basically logs on init
// export function useEffectOnce(name: string, callback: Function) {
//   useEffect(() => {
//     recordEvent(name, {});
//     callback();
//   }, []);
// }
