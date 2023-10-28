"use client" // TODO: homepage cannot be use client

import { useRecordedState, useRecordedEvent } from "../newt-pkg";
import styles from "./page.module.css";


export default function Home() {

  console.log('useRecordedEvent', useRecordedEvent);

  // Write state handlers like normal
  const [selection, setSelection, selectionTrackingName] = useRecordedState<null | string>(
    "CheckoutPage-selection",
    null
  );

  function changeSelection(newSelection: string) {
    setSelection(newSelection);
  }

  async function onSubmit() {
    // backend call
    console.log(selection);
  }

  // Wrap each function in useNewt to link analytics and testing
  const [handleClick, handleClickName] = useRecordedEvent(
    onSubmit,
    "CheckoutPage-submit"
  );

  return (
    <main className={styles.main}>
      {/* Use the returned handlers and names */}
      <button
        data-testid={selectionTrackingName}
        onClick={() => changeSelection('option1')}
      />
      <button
        data-testid={selectionTrackingName}
        onClick={() => changeSelection('option2')}
      />
      <button data-testid={handleClickName} onClick={handleClick} />
    </main>
  );
}
