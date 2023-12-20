import { Container, Flex } from "@mantine/core"

const Header = () =>{

    return (
        <header style={{width:"100%",background:"#3b3b3b",padding:"8px"}}>
            <Container size={'lg'}>
                <Flex justify={"space-between"}>
                    <div>CryptoBro</div>
                </Flex>
            </Container>
      </header>
    )
}

export default Header