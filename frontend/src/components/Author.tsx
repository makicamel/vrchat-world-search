import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import theme from '../theme';

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

function Author(props: { author: Author, setAuthorId: any }) {
  return (<Grid item>
    <Typography variant="body2" display="inline-block">
      by <AuthorChip
        className="author"
        onClick={() => props.setAuthorId(props.author.authorId)}
      >
        {props.author.authorName}
      </AuthorChip>
    </Typography>
  </Grid >)
}

export default Author
