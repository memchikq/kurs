import { Button, Container, Input, Select, Textarea } from "@mantine/core"
import { useState } from "react"
import * as CryptoJS from 'crypto-js';
const types = ["XoR","AES"]

const Main = () => {
  const [typeOperation,setTypeOperation] = useState<string | null>("Шифровать")
  const [typeCrypto,setTypeCrypto] = useState<string | null>("XoR")
  const [key,setKey] = useState("")
  const [text,setText] = useState("")
  const [result,setResult] = useState("")

  const  chaoticEncryptionWithKey = (inputText:string, key:string) => {
    let encryptedText = '';
    
    for (let i = 0; i < inputText.length; i++) {
        const charCode = inputText.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        
        const encryptedCharCode = charCode ^ keyChar; // XOR операция
        encryptedText += String.fromCharCode(encryptedCharCode);
    }

    setResult(encryptedText)
    return encryptedText
}
 const chaoticDecryptionWithKey =(encryptedText:string, key:string)=> {
    const res = chaoticEncryptionWithKey(encryptedText, key); // XOR для дешифрации идентичен шифрованию
    setResult(res)
}

const aesEncrypt = (inputText:string, key:string) =>{
  const encryptedText = CryptoJS.AES.encrypt(inputText,key).toString()
  setResult(encryptedText)
}
const aesDecrypt = (encryptedText: string, key: string) => {

  const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, key)

  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8)
  setResult(decryptedText)
};

  const crypt = ()=>{
    switch(typeCrypto){
      case "XoR":
        chaoticEncryptionWithKey(text,key)
        break
      case "AES":
        aesEncrypt(text,key)
        break
    }
  }
  const decrypt = ()=>{
    switch(typeCrypto){
      case "XoR":
        console.log(typeCrypto)
        chaoticDecryptionWithKey(text,key)
        break
      case "AES":
        aesDecrypt(text,key)
        break
    }
  }
  return (
    <main style={{ height: "90vh", display: "flex", alignItems: "center" }}>
      <Container size={"lg"}>
        <div>
        <Select
            allowDeselect={false}
            onChange={(v)=>setTypeOperation(v)}
            value={typeOperation}
            data={['Шифровать','Расшифровать']}
        />
        <Select
            style={{marginTop:"8px"}}
            allowDeselect={false}
            onChange={(v)=>setTypeCrypto(v)}
            value={typeCrypto}
            data={types}
        />
        </div>
        <div>
          <Input.Wrapper label="Ключ шифрования" required>
            <Input value={key} onChange={(e)=>setKey(e.target.value)} w={300} />
          </Input.Wrapper>
        </div>
        <div>
          <Textarea  value={text} onChange={(e)=>setText(e.target.value)} label="Текст" />
        </div>
        <div>
        <Input.Wrapper label="Результат">
            <Input  value={result} readOnly w={300} />
          </Input.Wrapper>
        </div>
        <div style={{marginTop:"10px"}}>
            <Button fullWidth onClick={()=>{
                typeOperation == "Шифровать" ? crypt():decrypt()
            }}>
                {typeOperation}
            </Button>
        </div>
      </Container>
    </main>
  )
}

export default Main
