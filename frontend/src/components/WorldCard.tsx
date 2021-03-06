import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { WorldInterface as World } from '../../types/world.interface'
import styled from 'styled-components'
import styles from '../styles/Home.module.css'

const SupportQuestChipStyle = styled.span`
  cursor: pointer;
  color: ${() => '#00de56'};
  &:hover {
    color: ${() => '#5dffb7'};
  }
`

const SupportQuestChip = (props: { setSupportQuest: Dispatch<SetStateAction<boolean>> }) => (
  <SupportQuestChipStyle
    onClick={() => props.setSupportQuest(true)}
  >
    Quest Supported
  </SupportQuestChipStyle>
)

const WorldCard = (props: { world: World, author: JSX.Element, setSupportQuest: Dispatch<SetStateAction<boolean>> }) => (
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
            <SupportQuestChip setSupportQuest={props.setSupportQuest} />
          </Typography>)
          : ''}
        <div>
          {props.world.tags.map((tag: string, index: number) => (
            <Chip key={`${index}${props.world.id}`} label={tag} size="small" clickable={true} color="info" className={styles.chip} />
          ))}
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
