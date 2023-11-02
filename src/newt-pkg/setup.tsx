"use client";

export let eventNameRegistry: Set<string> = new Set();
export let eventRegistry: [string, Function][] = [];

// Registers each event with a unique name
// Throws an error if there is a duplicate name
// Once in the registry, playRecordedActions can call them
export function registerEvent(name: string, callback: () => void) {
  if (eventNameRegistry.has(name)) {
    console.warn(`Duplicate name ${name}`);
  } else {
    eventNameRegistry.add(name);
    eventRegistry.push([name, callback]);
  }
}

export type AnalyticsHandlerFunction = (name: string, data: any) => void;

export let analyticsHandler: AnalyticsHandlerFunction;

export function registerAnalyticsHandler(callback: AnalyticsHandlerFunction) {
  console.log("registered analytics handler");
  analyticsHandler = callback;
}
