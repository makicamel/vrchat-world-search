import { useState, useContext } from 'react'
import {
  Chip,
  Grid,
  FormGroup,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Switch,
} from '@mui/material'
import { HighlightOff, LocalOffer, Search } from '@mui/icons-material'
import styled from 'styled-components'
import { QueriesContext } from '../hooks/useQueries'

const HeaderElement = styled.header`
  background-color: #07242b;
  border-bottom: 2px solid #053c48;
  font-family: Dosis, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, sans-serif;
  font-size: 3rem;
  margin: 0;
  padding: 0 2rem 0.5rem;
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
  const [text, setText] = useState('')
  const clearAuthor = () => {
    setQueries({ ...queries, authorId: undefined, authorName: undefined })
  }
  const clearTag = (tag: string) => () => {
    setQueries({
      ...queries,
      tags: queries.tags?.filter((value) => value !== tag),
    })
  }
  const clearText = (text: string) => () => {
    setQueries({
      ...queries,
      texts: queries.texts?.filter((value) => value !== text),
    })
  }
  const clearQueries = () => {
    setQueries({
      ...queries,
      authorId: undefined,
      authorName: undefined,
      tags: undefined,
      texts: undefined,
    })
  }
  const updateText = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }
  const searchWithText = () => {
    const texts = queries.texts
      ? Array.from(new Set(queries.texts.concat([text])))
      : [text]
    setQueries({ ...queries, texts })
    setText('')
  }
  const searchWithTextWhenEnterKeyIsPressed = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      searchWithText()
    }
  }

  return (
    <header>
      <HeaderElement>
        <TitleElement onClick={clearQueries}>VRChat World Search</TitleElement>
        <Grid container>
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={queries.supportQuest}
                    onChange={() =>
                      setQueries({
                        ...queries,
                        supportQuest: !queries.supportQuest,
                      })
                    }
                  />
                }
                label="Quest supported only"
              />
            </FormGroup>
          </Grid>
          <Grid container md={6} direction="column" alignItems="end">
            <OutlinedInput
              type="search"
              size="small"
              value={text}
              onChange={updateText()}
              onKeyDown={searchWithTextWhenEnterKeyIsPressed}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={searchWithText}
                    onMouseDown={searchWithText}
                  >
                    {<Search />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </HeaderElement>
      <TagsElement>
        {queries.authorId ? (
          <Chip
            key="author"
            label={`author: ${queries.authorName}`}
            size="small"
            color="info"
            clickable={true}
            deleteIcon={<HighlightOff />}
            onClick={clearAuthor}
            onDelete={clearAuthor}
          />
        ) : null}
        {queries.tags?.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            color="info"
            clickable={true}
            icon={<LocalOffer />}
            deleteIcon={<HighlightOff />}
            onClick={clearTag(tag)}
            onDelete={clearTag(tag)}
          />
        ))}
        {queries.texts?.map((text) => (
          <Chip
            key={text}
            label={text}
            size="small"
            color="info"
            clickable={true}
            icon={<Search />}
            deleteIcon={<HighlightOff />}
            onClick={clearText(text)}
            onDelete={clearText(text)}
          />
        ))}
      </TagsElement>
    </header>
  )
}

export default Header
