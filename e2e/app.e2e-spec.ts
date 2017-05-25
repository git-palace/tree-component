import { BlazeAppPage } from './app.po';

describe('blaze-app App', () => {
  let page: BlazeAppPage;

  beforeEach(() => {
    page = new BlazeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
