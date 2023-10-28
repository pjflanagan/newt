import { useRecordedState, useRecordedEvent, TEST } from "@/newt-pkg";
import styles from "./page.module.css";


export default function Home() {

  console.log('useRecordedEvent', useRecordedEvent);
  console.log('TEST:', TEST);

  // Write state handlers like normal
  // const [selection, setSelection, selectionTrackingName] = useRecordedState<null | string>(
  //   "CheckoutPage-selection",
  //   null
  // );

  function changeSelection(e: React.MouseEvent<HTMLButtonElement>) {
    // setSelection(e.target.value);
  }

  async function onSubmit() {
    // backend call
    // console.log(selection);
  }

  // Wrap each function in useNewt to link analytics and testing
  // const [handleClick, handleClickName] = useRecordedEvent(
  //   onSubmit,
  //   "CheckoutPage-submit"
  // );

  return (
    <main className={styles.main}>
      {/* Use the returned handlers and names */}
      {/* <button
        value="option1"
        data-testid={selectionTrackingName}
        onClick={changeSelection}
      />
      <button
        value="option2"
        data-testid={selectionTrackingName}
        onClick={changeSelection}
      /> */}
      {/* <button data-testid={handleClickName} onClick={handleClick} /> */}
    </main>
  );
}
