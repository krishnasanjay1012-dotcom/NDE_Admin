
const { expect } = require("@playwright/test")

async function login(page) {
  await page.goto("https://superadmin.nowdigitaleasy.com/login")
await page.locator('[name="userName"]').fill("iaaxin")
await page.locator('[name="password"]').fill("King_Guna")
await page.getByRole("button",{name:"Login"}).click()
await page.waitForTimeout(3000)
await expect(page).toHaveURL("https://superadmin.nowdigitaleasy.com/home")
console.log("login passed")
}

module.exports = { login }