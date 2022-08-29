import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { World } from './world.entity'

@Injectable()
export class WorldsService {
  index = 'worlds'
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search({
    page,
    authorId,
    tags,
    texts,
    supportQuest,
  }: {
    page: number
    authorId?: string
    tags?: string[]
    texts?: string[]
    supportQuest?: boolean
  }): Promise<Array<World>> {
    const response = await this.elasticsearchService.search<World>({
      index: this.index,
      body: {
        query: this.#query({
          authorId,
          tags,
          texts,
          supportQuest,
        }),
        sort: ['_score', { updatedAt: { order: 'desc' } }],
      },
      from: page * 10,
    })
    const hits = response.body['hits'].hits
    return hits.map((world) => world._source)
  }

  #query({
    authorId,
    tags,
    texts,
    supportQuest,
  }: {
    authorId?: string
    tags?: string[]
    texts?: string[]
    supportQuest?: boolean
  }) {
    let query = []
    if (texts) {
      texts.forEach((text) => {
        query.push({
          multi_match: {
            query: text,
            fields: ['worldName^2', 'authorName^2', 'tags^1.5', 'description'],
          },
        })
      })
    }
    if (supportQuest) {
      query.push({ term: { supportQuest } })
    }
    if (authorId) {
      query.push({ term: { authorId } })
    }
    if (tags) {
      tags.forEach((tag) => query.push({ term: { tags: tag } }))
    }

    if (query.length === 0) {
      return { match_all: {} }
    } else {
      return { bool: { must: query } }
    }
  }
}
