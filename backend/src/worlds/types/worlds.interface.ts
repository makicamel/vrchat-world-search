import { WorldInterface } from './world.interface'

export interface WorldsInterface {
  hits: {
    total: number
    hits: Array<{
      _source: WorldInterface
    }>
  }
}
