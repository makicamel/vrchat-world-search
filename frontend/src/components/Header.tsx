import { useContext } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import HighlightOff from '@mui/icons-material/HighlightOff';
import styled from 'styled-components'
import { QueriesContext } from '../hooks/useQueries'

const HeaderElement = styled.header`
  background-color: #07242b;
  border-bottom: 2px solid #053c48;
  font-family: Dosis, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  font-size: 3rem;
  margin: 0;
  padding: 0 2rem;
`
const TagsElement = styled.header`
  background-color: #07242b;
  border-bottom: 3px solid #053c48;
  margin: 0;
  padding: 0 2rem;
`

const TitleElement = styled.span`
&:hover {
  cursor: pointer;
}
`

const Header: React.FC = (): JSX.Element => {
  const { queries, setQueries } = useContext(QueriesContext)
  const clearAuthor = () => {
    setQueries({ ...queries, authorId: undefined, authorName: undefined })
  }
  const clearTag = (tag: string) => () => {
    setQueries({ ...queries, tags: queries.tags?.filter((value) => value !== tag) })
  }
  const clearQueries = () => {
    setQueries({ ...queries, authorId: undefined, authorName: undefined, tags: undefined })
  }

  return (
    <header>
      <HeaderElement>
        <TitleElement onClick={clearQueries}>
          VRChat World Search
        </TitleElement>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color="secondary"
                checked={queries.supportQuest}
                onChange={() => setQueries({ ...queries, supportQuest: !queries.supportQuest })}
              />
            }
            label="Quest supported only"
          />
        </FormGroup>
      </HeaderElement>
      <TagsElement>
        {(queries.authorId) ?
          (<Chip
            key="author"
            label={`author: ${queries.authorName}`}
            size="small"
            color="info"
            clickable={true}
            icon={<HighlightOff />}
            onClick={clearAuthor}
          />) : null
        }
        {queries.tags?.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            color="info"
            clickable={true}
            icon={<HighlightOff />}
            onClick={clearTag(tag)}
          />
        ))}
      </TagsElement>
    </header>
  )
}

export default Header
