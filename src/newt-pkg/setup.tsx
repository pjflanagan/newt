"use client";

export let eventRegistry: [string, Function][] = [];

// Registers each event with a unique name
// Throws an error if there is a duplicate name
// Once in the registry, test_playActionSequence can call them
export function registerEvent(name: string, callback: Function) {
  eventRegistry.push([name, callback]);
}

// Public Newt function
export let analyticsHandler: Function; 

export function registerAnalyticsHandler(callback: Function) {
  analyticsHandler = callback;
}