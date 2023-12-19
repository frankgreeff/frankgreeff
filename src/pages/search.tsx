import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Grid, Heading, Link } from '@chakra-ui/react'
import { gql } from '@apollo/client'

import client from '@/utils/apollo-client'

import type { GetServerSidePropsContext } from 'next'
import type { Video } from '@/pages/index'

import DefaultLayout from '@/layout/DefaultLayout'

import VideoTile from '@/components/VideoTile'

const SEARCH_VIDEOS_QUERY = gql`
  query SearchVideos($string: String!) {
    videoCollection(where: {
      OR: [
        { title_contains: $string },
        { content_contains: $string }
      ]
    }) {
      items {
        content
        mainImage {
          url
        }
        summary
        sys {
          id
        }
        title
      }
    }
  }
`

type SearchPageProps = {
  videos: Video[],
}

const SearchPage = (props: SearchPageProps) => {
  const { videos } = props

  const { query: { string }} = useRouter()

  return (
    <DefaultLayout>
      <Heading as="h1">
        Results for {string}
      </Heading>

      {!videos.length && (
        <>
          <Heading marginTop="4" size="md">
            Sorry, no results found. Please try searching for something else.
          </Heading>

          <Link as={NextLink} href="/" marginTop="4">
            Go Back to Home Page
          </Link>
        </>
      )}

      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(296px, 1fr))"
        gap={6}
        marginTop="8"
        width="100%"
      >

        {videos.map((video) => (
          <VideoTile key={video.sys.id} video={video} />
        ))}
      </Grid>
    </DefaultLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
  const { query: { string } } = context
  
  const { data } = await client.query({
    query: SEARCH_VIDEOS_QUERY,
    variables: {
      string,
    },
  })

  return {
    props: {
      videos: data?.videoCollection?.items || [],
    },
  }
}

export default SearchPage
