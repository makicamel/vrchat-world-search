import { useContext } from 'react'
import Chip from '@mui/material/Chip'
import styled from 'styled-components'
import { QueriesContext } from '../hooks/useQueries'

const UnstyledTag: React.FC<{
  key: string,
  label: string,
  className?: string,
  _children?: null,
}> = ({ key, label, className, _children }) => {
  const { queries, setQueries } = useContext(QueriesContext)
  const tags = queries.tags ? Array.from(new Set(queries.tags.concat([label]))) : [label]

  return (<Chip
    key={key}
    label={label}
    size="small"
    clickable={true}
    color="info"
    className={className}
    onClick={() => { setQueries({ ...queries, tags }) }}
  />
  )
}

export const Tag = styled(UnstyledTag)`
  border-radius: 6px;
  margin: 0.3rem 0.3rem 0.3rem 0px;
  padding: 0.2rem;
`

export default Tag
