"use client";

export let eventRegistry: [string, Function][] = [];

// Registers each event with a unique name
// Throws an error if there is a duplicate name
// Once in the registry, test_playActionSequence can call them
export function registerEvent(name: string, callback: () => void) {
  // if (eventRegistry.map(([name]) => name).includes(name)) {
  //   throw `Duplicate name ${name}`;
  // }
  eventRegistry.push([name, callback]);
}

export type AnalyticsHandlerFunction = (name: string, data: any) => void;

export let analyticsHandler: AnalyticsHandlerFunction; 

export function registerAnalyticsHandler(callback: AnalyticsHandlerFunction) {
  console.log('registered analytics handler');
  analyticsHandler = callback;
}