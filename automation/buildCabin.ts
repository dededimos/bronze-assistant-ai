import { chromium, Page } from 'playwright';

export interface CabinParams {
  type: 'doubleSlideOneFixed' | 'doubleSlideTwoFixed' | 'singleSlideOneFixed';
  width: number;   // mm
  height: number;  // mm
  depth: number;   // mm
  finish: 'black' | 'chrome';
}

export type AskFn = (choices: string[]) => Promise<string>;

export async function buildCabin(params: CabinParams, askUser: AskFn) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://bronzeapp.eu');

  // 1. Επιλογή εφαρμογής Καμπίνες
  await page.click('text=Εφαρμογή Καμπίνες');

  // 2. Επιλογή συρόμενης κατηγορίας
  await page.click('text=Συρόμενες Πόρτες');
  if (params.type === 'doubleSlideOneFixed') {
    await page.click('text=Διπλό Συρόμενο με Πλαϊνό Σταθερό');
  } else if (params.type === 'doubleSlideTwoFixed') {
    await page.click('text=Διπλό Συρόμενο με Διπλό Πλαϊνό Σταθερό');
  } else {
    await page.click('text=Μονό Συρόμενο με Πλαϊνό Σταθερό');
  }

  // 3. Επιλογή μοντέλου (αν υπάρχουν δύο επιλογές)
  const models = await page.$$('div[role=button]');
  if (models.length > 1) {
    const choice = await askUser(['9S/9F', 'VS/VF']);
    await models[choice === 'VS/VF' ? 1 : 0].click();
  } else {
    await models[0].click();
  }

  // 4. Διαστάσεις
  await page.fill('input[name="slidingLength"]', params.width.toString());
  await page.fill('input[name="sidePanelLength"]', params.depth.toString());
  await page.fill('input[name="height"]', params.height.toString());

  // 5. Φινίρισμα
  await page.click('text=Φινίρισμα');
  await page.click(`text=${params.finish === 'black' ? 'Μαύρο' : 'Χρώμιο'}`);

  // 6. Τελικό αποτέλεσμα
  const screenshotPath = '/tmp/cabin.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await browser.close();
  return screenshotPath;
}
