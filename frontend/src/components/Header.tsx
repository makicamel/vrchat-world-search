import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

const HeaderElement = styled.header`
  background-color: #07242b;
  border-bottom: 3px solid #053c48;
  font-family: Dosis, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  font-size: 3rem;
  margin: 0;
  padding: 0 2rem;
`

const TitleElement = styled.span`
&:hover {
  cursor: pointer;
}
`

const Header: React.FC<{
  setAuthorId: Dispatch<SetStateAction<string | undefined>>
}>
  = ({ setAuthorId }): JSX.Element => (
    <HeaderElement>
      <TitleElement onClick={() => setAuthorId(undefined)}>
        VRChat World Search
      </TitleElement>
    </HeaderElement>
  )

export default Header
