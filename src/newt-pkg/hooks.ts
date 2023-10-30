"use client";

import {
  useMemo,
  useState,
  useEffect
} from "react";
import { registerEvent } from "./setup";
import { recordEvent } from "./logging";

// Turns events into tracked events
// Name comes first to encourage its usage
export function useRecordedEvent<T>(name: string, eventHandler: () => void): [string, (data: T) => void] {
  // const parentName = arguments.callee.caller.name;
  // const eventHandlerName = eventHandler.name;
  // const eventName = !!name ? name : `${parentName}-${eventHandlerName}`;

  useMemo(() => {
    registerEvent(name, eventHandler);
  }, [name, eventHandler]);

  const recordedEventHandler = useMemo(() => {
    return async (data: T) => {
      await eventHandler();
      recordEvent(name, data);
    };
  }, [name, eventHandler]);

  return [name, recordedEventHandler];
}

// Tracks every time state changes

type UseRecordedState<T> = [string, T, (newValue: T) => void];

export function useRecordedState<T>(name: string, defaultValue: T): UseRecordedState<T> {
  const [value, setValue] = useState(defaultValue);

  function setValueAndTrack(newValue: T) {
    recordEvent(name, newValue);
    setValue(newValue);
  }

  return [name, value, setValueAndTrack];
}

// Tracks every time an effect happens
// This would probably be bad because useEffect get called often
export function useRecordedEffect(name: string, callback: () => void, triggers: any[]) {
  useEffect(() => {
    recordEvent(name, {});
    callback();
  }, triggers);
}

// Runs and records when every condition is true
export function useConditionalEffect(
  name: string,
  callback: () => void,
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
