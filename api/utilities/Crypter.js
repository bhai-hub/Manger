import Cryptr from "cryptr";

import dotenv from "dotenv"
dotenv.config()

const crypt = new Cryptr(process.env.CYPTR_PASS)

export const Encrypt=  (pass)=>{
    const encrypt = crypt.encrypt(pass)
    return encrypt
}

export const Decrypt = (pass)=>{
    const decrypt = crypt.decrypt(pass)
    return decrypt
}