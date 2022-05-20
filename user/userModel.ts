import { Attribute, AttributeType } from "./attributs.ts";
import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";

//  deno run -c tsconfig.json .\user\userModel.ts
class UserModel {
    @Attribute({
        icon: 'fa-user',
        type: AttributeType.Text
    })
    username: string;

    @Attribute({
        icon: 'fa-key',
        type: AttributeType.Password
    })
    password: string;

    @Attribute({
        icon: 'fa-at',
        type: AttributeType.Text,
        isVisible: false
    })
    email: string;  

    /**
     *
     */
     constructor(userName:string, password:string, email:string) {
        this.password=password;
        this.username= userName;
        this.email=email;
        
    }
}


const user = new UserModel("tset","tst","fdsf");
const meta = Reflect.getMetadata('attribute:icon', user, 'password')
console.log({meta})