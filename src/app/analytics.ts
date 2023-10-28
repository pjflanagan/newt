import { registerAnalyticsHandler } from "@/newt-pkg/";


// write your own analytics function (ex: call Google Analytics)
function sendAnalytics() {
  // send to backend
  console.log();
}

// Register the analytics handler
// This should only happen once at the top level component
registerAnalyticsHandler(sendAnalytics);