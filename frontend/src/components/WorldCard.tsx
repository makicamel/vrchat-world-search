import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { WorldInterface as World } from '../../types/world.interface'
import styles from '../styles/Home.module.css'

const WorldCard = (props: { world: World }) => (
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
            <Typography variant="body2" display="inline-block">
              by {props.world.authorName}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2">
          {props.world.description}
        </Typography>
        <Typography variant="body2" color="#00de56">
          {props.world.supportQuest ? 'Quest Supported' : ''}
        </Typography>
        <div>
          {props.world.tags.map((tag: string) => (
            <Chip label={tag} size="small" clickable={true} color="info" className={styles.chip} />
          ))}
        </div>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default WorldCard
