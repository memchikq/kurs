import { Button, Container, Input, Select, Textarea } from "@mantine/core"
import { useState } from "react"

const Main = () => {
  const [type,setType] = useState<string | null>("Шифровать")
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
  return (
    <main style={{ height: "90vh", display: "flex", alignItems: "center" }}>
      <Container size={"lg"}>
        <div>
        <Select
            allowDeselect={false}
            onChange={(v)=>setType(v)}
            value={type}
            data={['Шифровать','Расшифровать']}
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
                type == "Шифровать" ? chaoticEncryptionWithKey(text,key):chaoticDecryptionWithKey(text,key)
            }}>
                {type}
            </Button>
        </div>
      </Container>
    </main>
  )
}

export default Main
