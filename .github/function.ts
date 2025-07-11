import {Locator} from "@playwright/test";

//add all the items in the shopping cart
export async function clickFirstXButtonsFromLocator(locator: Locator, x: number): Promise<void> {
    const count = await locator.count();
    const limit = Math.min(x, count);
    for (let i = 0; i < limit; i++)
    {
        await locator.nth(i).click();
    }
}

//remove the items from the shopping cart
export async function clickRemoveXButtonsFromLocator(locatorRemove: Locator, x: number): Promise<void> {
    const count = await locatorRemove.count();
    const limit = Math.min(x, count);
    for (let i = 0; i < limit; i++)
    {
        await locatorRemove.nth(i).click();
    }
}