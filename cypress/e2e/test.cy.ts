import { playRecordedActions } from "@/newt-pkg/testing";

// Use Newt to quickly run recorded actions that might not need to be tested
// In this example we are inserting state
playRecordedActions([
  ['CheckoutPage-selectionOptions', ['pizza', 'hotdog']],
  ['CheckoutPage-selection', 'pizza'],
]);

// Then use Cypress when you want to test UI
// Use the names defined in your Newt records
cy.get(getDataTestId('CheckoutPage-selection')).contains('pizza');
cy.get(getDataTestId('CheckoutPage-submit')).click();

// Then use Newt to check that an action has been recorded
// TODO: expect CheckoutPage-submitStatus to be true;
