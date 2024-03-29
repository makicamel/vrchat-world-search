export interface WorldInterface {
  id: string
  worldName: string
  authorId: string
  authorName: string
  imageUrl: string
  thumbnailImageUrl: string
  description: string
  supportQuest: boolean
  tags: Array<string>
}
