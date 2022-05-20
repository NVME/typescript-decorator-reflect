import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";

//  deno run -c tsconfig.json .\user\userModelOne.ts
class UserModel {
    @Reflect.metadata('attribute:type', 'text')
    @Reflect.metadata('attribute:icon', 'fa-user')
    username: string;

    @Reflect.metadata('attribute:type', 'password')
    @Reflect.metadata('attribute:icon', 'fa-key')
    password: string;
    /**
     *
     */
    constructor(userName:string, password:string) {
        this.password=password;
        this.username= userName;
        
    }
}

const user = new UserModel("tset","tst");
const meta = Reflect.getMetadata('attribute:icon', user, 'password')
console.log({meta})