import Head from 'next/head'
import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { gql } from '@apollo/client'

import { Inter } from 'next/font/google'

import DefaultLayout from '@/layout/DefaultLayout'

import client from '@/utils/apollo-client'

const inter = Inter({ subsets: ['latin'] })

import VideoTile from '@/components/VideoTile'

export type Video = {
  content: string,
  mainImage: {
    url: string,
  },
  summary: string,
  sys: {
    id: string,
  },
  title: string,
}

const GET_VIDEOS_QUERY = gql`
  query GetVideos {
    videoCollection {
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

type VideosPageProps = {
  videos: Video[],
}

function VideosPage(props: VideosPageProps) {
  const { videos } = props

  return (
    <>
      <Head>
        <title>Frank Greeff | Videos</title>
        <meta name="description" content="Software engineer and entrepreneur with a passion for building great software products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <DefaultLayout>
        <Heading as="h1">
          Videos
        </Heading>

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
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_VIDEOS_QUERY,
  })

  return {
    props: {
      videos: data?.videoCollection?.items || [],
    },
  }
}

export default VideosPage
