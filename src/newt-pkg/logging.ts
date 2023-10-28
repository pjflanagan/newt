
// Adds the event to the log and optionally logs it to the console in DEBUG mode

import { analyticsHandler } from "./setup";

// Also sends it to any linked analytics
export function recordEvent(name: string, data: any) {
  console.log(name, data);
  analyticsHandler(name, data);
}