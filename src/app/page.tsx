"use client";

import { Suspense, useState } from "react";
import {
  useRecordedState,
  useRecordedEvent,
  useRecordedEffectOnce,
} from "../newt-pkg";
import styles from "./page.module.css";

export default function Home() {
  // Write state like normal, just with tracking names
  const [, selectionOptions, setSelectionOptions] = useRecordedState<string[]>(
    "CheckoutPage-selectionOptions",
    []
  );
  const [selectionTrackingName, selection, setSelection] = useRecordedState<
    null | string
  >("CheckoutPage-selection", null);
  const [submitStatusName, submitStatus, setSubmitStatus] = useRecordedState<
    [boolean, string]
  >("CheckoutPage-submitStatus", [false, ""]);

  // Create a tracked useEffect
  useRecordedEffectOnce("CheckoutPage-loadOptions", () => {
    setTimeout(() => {
      setSelectionOptions(["pizza", "hotdog", "salad"]);
    }, 200);
  });

  // Wrap event handlers in useRecordedEvent to link analytics and testing
  const [handleClickName, handleClick] = useRecordedEvent(
    "CheckoutPage-submit",
    async () => {
      console.log("POST /", selection);
      if (Math.random() > 0.5) {
        setSubmitStatus([true, "Success"]);
      } else {
        setSubmitStatus([true, "Failure"]);
      }
    }
  );

  return (
    <main className={styles.main}>
      {/* Use the returned handlers and names */}
      <span data-testid={selectionTrackingName}> {selection}</span>
      <br />
      {selectionOptions.map((option) => (
        <button
          key={option}
          data-testid={`${selectionTrackingName}-${option}`}
          onClick={() => setSelection(option)}
        >
          {option}
        </button>
      ))}
      <br />
      {selectionOptions.length === 0 ? (
        "Loading..."
      ) : (
        <button data-testid={handleClickName} onClick={() => handleClick()}>
          Submit
        </button>
      )}

      <br />
      <span data-testid={submitStatusName}>
        {submitStatus[0] && submitStatus[1]}
      </span>
    </main>
  );
}
