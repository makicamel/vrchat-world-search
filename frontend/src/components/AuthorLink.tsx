import Typography from '@mui/material/Typography'
import { useContext } from 'react';
import styled from 'styled-components'
import theme from '../theme';
import { QueriesContext } from '../hooks/useQueries'

type Author = {
  authorId: string,
  authorName: string,
}

const AuthorChip = styled.span`
  cursor: pointer;
  color: ${() => theme.palette.text.secondary};
  &:hover {
    color: ${() => '#6ae3f9'};
  }
`

const AuthorLink = (props: { author: Author }) => {
  const { queries, setQueries } = useContext(QueriesContext)
  const setAuthor = () => {
    setQueries({ ...queries, authorId: props.author.authorId, authorName: props.author.authorName })
  }

  return (
    <Typography variant="body2" display="inline-block">
      by <AuthorChip
        className="author"
        onClick={setAuthor}
      >
        {props.author.authorName}
      </AuthorChip>
    </Typography >
  )
}

export default AuthorLink
