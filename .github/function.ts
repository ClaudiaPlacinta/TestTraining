import {Locator} from "@playwright/test";

export async function clickFirstXButtonsFromLocator(locator: Locator, x: number): Promise<void> {
    const count = await locator.count();
    const limit = Math.min(x, count);
    for (let i = 0; i < limit; i++)
    {
        await locator.nth(i).click();
    }
}