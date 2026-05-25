import { test, expect } from "@playwright/test";
import { LoginPage } from "../utils/log.js"
test.setTimeout(5 * 10 * 1000)
const validename = "iaaxin"
const validpassword = "King_Guna"

test.beforeEach(async({page}) =>{
  await page.goto("https://superadmin.nowdigitaleasy.com/login")
})

async function login1(page) {
  await page.locator('[name="userName"]').fill(validename);

  await page.locator('[name="password"]').fill(validpassword);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(
    "https://superadmin.nowdigitaleasy.com/home"
  );
}

// ==========================================================
// Invalid Password Test
// ==========================================================

test("NDE Invalid Password", async ({page}) => {
  await page.locator('[name="userName"]').fill(validename)
  await page.locator('[name="password"]').fill("invalid")
  await page.getByRole("button",{name:"Login"}).click()
  await expect(page).toHaveURL("https://superadmin.nowdigitaleasy.com/login")
  console.log("invalid password case passed")
});

// // ==========================================================
// // Invalid Password Test
// // ==========================================================

test("NDE Invalid username", async ({page}) => {
  await page.locator('[name="userName"]').fill("invalid")
  await page.locator('[name="password"]').fill(validpassword)
  await page.getByRole("button",{name:"Login"}).click()
  await expect(page).toHaveURL("https://superadmin.nowdigitaleasy.com/login")
  console.log("invalid username case passed")
})

// // ==========================================================
// // valid Username & Password Test
// // ==========================================================



test("NDE valid username & Password", async ({page}) => {

    const loginPage = new LoginPage(page)

    await page.goto(
      "https://superadmin.nowdigitaleasy.com/login"
    )

    await loginPage.login(
        validename,
        validpassword
    )

    await expect(page).toHaveURL(
      "https://superadmin.nowdigitaleasy.com/home"
    )

    console.log("login success")

//   await page.locator('[name="userName"]').fill(validename)
//   await page.locator('[name="password"]').fill(validpassword)
//   await page.getByRole("button",{name:"Login"}).click()
//   await expect(page).toHaveURL("https://superadmin.nowdigitaleasy.com/home")
//   console.log("valid username & password case passed")
})

// // ==========================================================
// // module visibility Test
// // ==========================================================

test("NDE Module Count", async ({page}) => {
  await login1(page)
    console.log("Module Visibility 👇")
     await page.waitForTimeout(5000)
     const modulepage=page.locator('[class="MuiList-root MuiList-padding css-cyvzt1"]')
     const row=modulepage.locator("div span")
     const modulecount=await row.count()
     for(let i = 0;i < modulecount; i++){
      const module=await row.nth(i).first().innerText()
      console.log(module)
     }
     console.log(`Total Module : ${modulecount} ✅`)
})

// // // ==========================================================
// // // Available Products Test
// // // ==========================================================

test("NDE Product Count", async ({page}) => {
  await login1(page)
    console.log("Available Products 👇")
    await page.getByRole("button",{name:"Product",exact:true}).click()
    await page.waitForTimeout(5000)
    const Productsrow=page.locator("tbody tr")
    const Productscount=await Productsrow.count()
    for(let i = 0 ; i < Productscount; i++ ){
      const productName=await Productsrow.nth(i).locator("p").first().textContent()
      console.log(productName)
    }
    console.log(`Total products : ${Productscount} ✅`)
})

// // // ==========================================================
// // // Customer Status Ubdate Test
// // // ==========================================================

test("NDE Status Changing Test", async ({page}) => {
  await login1(page)
    await page.getByRole("button",{name:"Customers",exact:true}).click()
    const customerrow= page.locator("tbody tr").nth(0)
    const customername=await customerrow.locator("p").nth(0).textContent()
    console.log(customername)
    const prestatus=await customerrow.locator("p").nth(1).textContent()
    console.log(`previous 1st status : ${prestatus}`)
    await customerrow.hover()
    await customerrow.getByRole("button").last().click()
    await page.getByRole("menuitem").nth(1).click()
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000)
    const ubdatedrow =page.locator("tbody tr").nth(0)
    const curstatus=await ubdatedrow.locator("p").nth(1).textContent()
    console.log(`current 1st status : ${curstatus}`)
    if(prestatus==curstatus){
      console.log("status changing failed")
    }
    else{
      console.log("status changeing passed ✅")
    }

    await page.waitForTimeout(5000)
})

// // // ==========================================================
// // // Customer Creation Test
// // // ==========================================================

test("NDE Customer Crestion",async({page}) =>{
 await login1(page)
 const fname="Automation"
 const lname="Testing"
 const ename = page.locator("tbody tr").filter({has: page.getByText("sathya")})

 await page.getByRole("button",{name:"Customers",exact:true}).click()
//  await page.waitForTimeout(5000)
//  await ename.hover()
//  await page.waitForTimeout(5000)
//  await ename.getByRole("button").last().click()
//  await page.getByRole("menuitem",{name:"edit"}).click()
 await page.getByRole("button",{name:"New Customer",exact:true}).click()
 await page.getByRole("combobox",{name:"Select"}).nth(0).click()
 await page.getByRole("option",{name:"Mr."}).click()
 await page.locator('[name="first_name"]').fill(fname)
  await page.locator('[name="last_name"]').fill(lname)
  await page.locator('[name="companyName"]').fill("Renew")
  await page.locator('[name="email"]').fill("automation@gmail.com")
  await page.locator('[name="phone_number"]').nth(0).fill("9876543210")
  await page.locator('[name="password"]').fill("Test.1012")

  await page.getByRole("tab",{name:"Address"}).click()
  await page.locator('[name="billingaddress"]').fill("VDR")
 await page.getByRole("combobox",{name:"Select"}).nth(0).fill("india")
 await page.getByRole("option",{name:"India",exact:true}).click()
  await page.getByRole("combobox",{name:"Select"}).nth(1).fill("tamil nadu")
 await page.getByRole("option",{name:"tamil nadu"}).click()
  await page.getByRole("combobox",{name:"Select"}).nth(2).fill("dindigul")
 await page.getByRole("option",{name:"Dindigul",exact:true}).click()
 await page.locator('[name="billingphone"]').fill("7339091608")
 await page.locator('[name="billingfaxNumber"]').fill("10")

  await page.getByRole("tab",{name:"Contact Persons"}).click()
  await page.locator('[placeholder="Select Salutation"]').click()
  await page.getByRole("option",{name:"Mr."}).click()
  await page.locator('[name="contact_persons.0.name_details.first_name"]').fill("Automation")
  await page.locator('[name="contact_persons.0.name_details.last_name"]').fill("Testing")
  await page.locator('[name="contact_persons.0.other_details.designation"]').fill("Testing")
  await page.locator('[name="contact_persons.0.other_details.department"]').fill("Testing")
  await page.locator('[name="contact_persons.0.email"]').fill("automation1@gmail.com")
  await page.locator('[name="phone_number"]').nth(1).fill("9876543210")
  await page.locator('[name="phone_number"]').nth(2).fill("9876543210")

  await page.getByRole("tab",{name:"Remarks"}).click()
  await page.locator('[placeholder="Internal notes about this customer — special requirements, credit history, referral details..."]').fill("Testing")

  await page.getByRole("button",{name:"Create"}).click()
  await page.waitForTimeout(2000)
  await page.screenshot({path:'sanjay.png'})

  const cfullname=`${fname} ${lname}`
  const cfullnamerow=page.locator("tr").filter({has:page.getByText(cfullname,{exact:true})}).first()

  if(await page.getByRole("button",{name:"Leave & Discard Changes"}).isVisible()){
     await page.getByRole("button",{name:"Leave & Discard Changes"}).click()
  if(await cfullname.isVisible()){
    console.log(`${cfullname} created successfully`)
  }
     else{
    console.log(`${cfullname} created failed`)
    }
}
else{
    await page.getByRole("button",{name:"Cancel"}).click()
    console.log("invalid datas")
}

})
