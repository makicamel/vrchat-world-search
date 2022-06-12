import Chip from '@mui/material/Chip'
import styled from 'styled-components'

const UnstyledTag: React.FC<{
  key: string,
  label: string,
  className?: string,
  _children?: null,
}> = ({ key, label, className, _children }) => (
  <Chip
    key={key}
    label={label}
    size="small"
    clickable={true}
    color="info"
    className={className}
  />
)

export const Tag = styled(UnstyledTag)`
  border-radius: 6px;
  margin: 0.3rem 0.3rem 0.3rem 0px;
  padding: 0.2rem;
`

export default Tag
