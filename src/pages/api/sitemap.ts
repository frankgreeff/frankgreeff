import { gql } from '@apollo/client'

import client from '@/utils/apollo-client'

import { type NextApiRequest, type NextApiResponse } from 'next'

const sitemapString = `https://www.frankgreeff.com/about
https://www.frankgreeff.com/contact
`

const GET_VIDEOS_QUERY = gql`
  query GetVideos {
    videoCollection {
      items {
        sys {
          id
        }
      }
    }
  }
`

const sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await client.query({
      query: GET_VIDEOS_QUERY,
  })

  const videosString = data?.videoCollection?.items.reduce((acc, video) => {
    const videoUrl = `https://www.frankgreeff.com/videos/${video.sys.id}\n`
    return acc + videoUrl
  }, '')

  res.send(sitemapString + videosString)
}

export default sitemap
