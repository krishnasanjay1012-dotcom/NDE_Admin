const {test,expect}=require("@playwright/test")
test.setTimeout(5 * 30 * 1000)

test("NDE Admin Login",async ({ page })=>{
  await page.goto("https://superadmin.nowdigitaleasy.com/login")
await page.locator('[name="userName"]').fill("iaaxin")
await page.locator('[name="password"]').fill("King_Guna")
await page.getByRole("button",{name:"Login"}).click()
await page.waitForTimeout(3000)
await expect(page).toHaveURL("https://superadmin.nowdigitaleasy.com/home")
console.log("login passed")
})