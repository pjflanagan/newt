
// Adds the event to the log and optionally logs it to the console in DEBUG mode

import { analyticsHandler } from "./setup";

let eventLog: [string, any][] = []

// Also sends it to any linked analytics
export function recordEvent(name: string, data: any) {
  eventLog.push([name, data]);
  analyticsHandler(name, data);
  console.log(eventLog);
}