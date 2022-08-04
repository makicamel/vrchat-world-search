import { Dispatch, SetStateAction, useContext } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import styled from 'styled-components'
import { QueriesContext } from '../hooks/useQueries'

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
  setAuthorId: Dispatch<SetStateAction<string | undefined>>,
  supportQuest: boolean,
  setSupportQuest: Dispatch<SetStateAction<boolean>>,
}>
  = ({ setAuthorId, supportQuest, setSupportQuest }): JSX.Element => {
    const { queries, setQueries } = useContext(QueriesContext)

    return (
      <HeaderElement>
        <TitleElement onClick={() => setQueries({ authorId: undefined })}>
          {queries.supportQuest}
          VRChat World Search
        </TitleElement>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color="secondary"
                checked={queries.supportQuest}
                onChange={() => setQueries({ supportQuest: !queries.supportQuest })}
              />
            }
            label="Quest supported only"
          />
        </FormGroup>
      </HeaderElement>
    )
  }

export default Header
