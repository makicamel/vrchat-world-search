import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction } from 'react';
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

const AuthorLink = (props: { author: Author }) => (
  <Typography variant="body2" display="inline-block">
    by <AuthorChip
      className="author"
    // onClick={() => props.setAuthorId(props.author.authorId)}
    >
      {props.author.authorName}
    </AuthorChip>
  </Typography>
)

export default AuthorLink
