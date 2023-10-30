
// Adds the event to the log and optionally logs it to the console in DEBUG mode

import { analyticsHandler } from "./setup";

let eventLog: [string, any][] = []

// Also sends it to any linked analytics
export function recordEvent(name: string, data: any) {
  // push the event to the log
  eventLog.push([name, data]);
  // handle the event
  if (analyticsHandler) {
    analyticsHandler(name, data);
  }
  // TEST:
  console.log(eventLog);
}