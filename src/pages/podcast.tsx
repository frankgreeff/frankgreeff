import Head from 'next/head'
import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { gql } from '@apollo/client'

import { Inter } from 'next/font/google'

import DefaultLayout from '@/layout/DefaultLayout'

import client from '@/utils/apollo-client'

const inter = Inter({ subsets: ['latin'] })

import VideoTile from '@/components/VideoTile'

export type Video = {
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
    videoCollection(where: { category: { title: "Podcast" } }) {
      items {
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

type PodcastsPageProps = {
  videos: Video[],
}

function PodcastsPage(props: PodcastsPageProps) {
  const { videos } = props

  return (
    <>
      <Head>
        <title>Frank Greeff | Chew the Fat Podcast</title>
        <meta name="description" content="Chew the Fat Podcast - Real Business Insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <DefaultLayout>
      <Flex
          borderBottom="1px solid"
          borderColor="gray.100"
          direction="column"
          paddingBottom="12"
        >
          <Heading as="h1" letterSpacing="-3px" size="4xl">Chew the Fat</Heading>
          <Heading marginTop="2" size="lg">Podcast</Heading>

          <Text marginTop="8" width={['100%', "70%"]}>
            Where real business insights meet real-world success stories.
          </Text>
        </Flex>

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

export default PodcastsPage
