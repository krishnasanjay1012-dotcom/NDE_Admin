const {test,expect}=require("@playwright/test")
const {login } = require("./login.spec.js")

test("practice",async ({ page })=>{
  await page.goto("https://adminv2.nowdigitaleasy.com/login")
  await page.locator('[name="userName"]').fill("iaaxin")
  await page.locator('[name="password"]').fill("King_Guna")
  await page.getByRole("button",{name:"Login"}).click()
  await expect(page).toHaveURL(/home/)
})