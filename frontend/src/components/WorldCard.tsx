import { useContext } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { WorldInterface as World } from '../../types/world.interface'
import { QueriesContext } from '../hooks/useQueries';
import styled from 'styled-components'
import styles from '../styles/Home.module.css'
import Tag from './Tag'

const SupportQuestChipStyle = styled.span`
  cursor: pointer;
  color: ${() => '#00de56'};
  &:hover {
    color: ${() => '#5dffb7'};
  }
`

const SupportQuestChip = () => {
  const { queries, setQueries } = useContext(QueriesContext)

  return (
    <SupportQuestChipStyle
      onClick={() => setQueries({ ...queries, supportQuest: true })}
    >
      Quest Supported
    </SupportQuestChipStyle >
  )
}

const WorldCard = (props: { world: World, author: JSX.Element }) => (
  <Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto' }}>
    <CardActionArea className={styles.card}>
      <CardMedia
        component="img"
        image={props.world.thumbnailImageUrl}
        alt={props.world.worldName}
      />
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item>
            <Typography variant="h5" display="inline-block">
              {props.world.worldName}
            </Typography>
          </Grid>
          <Grid item>
            {props.author}
          </Grid>
        </Grid>
        <Typography variant="body2">
          {props.world.description}
        </Typography>
        {props.world.supportQuest ?
          (<Typography variant="body2">
            <SupportQuestChip />
          </Typography>)
          : ''}
        <div>
          {props.world.tags.map((tag: string, index: number) =>
            <Tag key={`${index}${props.world.id}`} label={tag} />
          )}
        </div>
        <Button
          variant="contained"
          color="info"
          startIcon={<OpenInNewIcon />}
          disableElevation={true}
          href={`https://vrchat.com/home/world/${props.world.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#6ae3f9', textTransform: 'none' }}
        >
          VRChat.com
        </Button>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default WorldCard
