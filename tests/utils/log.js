export class LoginPage{
    constructor(page){
    this.page=page
    this.username=page.locator('[name="userName"]')
    this.password=page.locator('[name="password"]')
    this.loginbtn=page.getByRole("button",{name:"Login"})
    }

    async login(username,password){

        await this.username.fill(username)

        await this.password.fill(password)

        await this.loginbtn.click()
    }
}