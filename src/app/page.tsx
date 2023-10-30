"use client";

import { useRecordedState, useRecordedEvent } from "../newt-pkg";
import styles from "./page.module.css";

export default function Home() {
  // Write state handlers like normal
  const [selectionTrackingName, selection, setSelection] = useRecordedState<
    null | string
  >("CheckoutPage-selection", null);

  // Wrap each function in useNewt to link analytics and testing
  const [handleClickName, handleClick] = useRecordedEvent(
    "CheckoutPage-submit",
    async () => {
      console.log('FETCH', selection);
    }
  );

  return (
    <main className={styles.main}>
      {/* Use the returned handlers and names */}
      <button
        data-testid={selectionTrackingName}
        onClick={() => setSelection("option1")}
      >
        Option 1
      </button>
      <button
        data-testid={selectionTrackingName}
        onClick={() => setSelection("option2")}
      >
        Option 2
      </button>
      <button data-testid={handleClickName} onClick={handleClick}>
        Submit
      </button>
    </main>
  );
}
