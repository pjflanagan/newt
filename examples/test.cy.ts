
// Use Newt to quickly run recorded actions
Newt.playActions([
  ['login', { username: 'test', password: 'testPassword' }],
  ['MainMenu-open'],
  ['MainMenu-selectPage', { page: 'contactPage' }]
]);

// Then use cypress to do the actual page navigation
cy.get(getDataTestId('Input-name')).text('Test Name');
cy.get(getDataTestId('Input-submit')).click();

