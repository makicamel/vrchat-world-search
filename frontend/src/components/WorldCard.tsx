import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { WorldInterface as World } from '../../types/world.interface'

const WorldCard = (props: { world: World }) => (
  <Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        image={props.world.thumbnailImageUrl}
        alt={props.world.worldName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.world.worldName}
        </Typography>
        <Typography variant="body2">
          {props.world.authorName}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default WorldCard
