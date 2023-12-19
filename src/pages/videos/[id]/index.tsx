import { gql } from '@apollo/client'
import { Box, Flex, Heading, Link } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import YouTubeEmbed from 'react-youtube'
import NextLink from 'next/link'
import { NextSeo } from 'next-seo'

import type { GetServerSidePropsContext } from 'next'

import client from '@/utils/apollo-client'

import DefaultLayout from '@/layout/DefaultLayout'

import styles from './styles.module.scss'

type Video = {
  applePodcastsUrl?: string,
  content: string,
  mainImage: {
    url: string,
  },
  summary: string,
  sys: {
    id: string,
  },
  title: string,
  spotifyUrl?: string,
  youTubeVideoId?: string,
}

const GET_VIDEO_BY_ID_QUERY = gql`
  query GetPostById($id: String!) {
    video(id: $id) {
      applePodcastsUrl
      content
      mainImage {
        url
      }
      spotifyUrl
      summary
      sys {
        id
      }
      title
      youTubeVideoId
    }
  }
`

type VideoProps = {
  video: Video,
}

function VideoPage(props: VideoProps) {
  const {
    video: {
      applePodcastsUrl,
      content,
      mainImage,
      spotifyUrl,
      summary,
      sys,
      title,
      youTubeVideoId,
    },
  } = props

  return (
    <DefaultLayout>
      <NextSeo
        title={`Frank Greeff | ${title}`}
        description={summary}
        openGraph={{
          description: summary,
          images: [
            {
              url: mainImage?.url,
              alt: `Main Image for ${title}`,
            },
          ],
          title: title,
          type: 'website',
          url: `https://www.kengreeff.com/videos/${sys?.id}`,
        }}
      />

      <Heading>{title}</Heading>

      {!!youTubeVideoId && (
        <Box aspectRatio={16/9} marginTop="8" position="relative" width={['100%', '50%']}>
          <YouTubeEmbed
            iframeClassName={styles.youtube}
            videoId={youTubeVideoId}
          />
        </Box>
      )}

      <Box marginTop="8" whiteSpace="pre-wrap">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>

      <Flex alignItems="flex-start" direction="column" marginTop="8">
        {!!spotifyUrl && (
          <Link as={NextLink} href={spotifyUrl} fontWeight="bold">
            Listen on Spotify
          </Link>
        )}

        {!!applePodcastsUrl && (
          <Link as={NextLink} href={applePodcastsUrl} fontWeight="bold">
            Listen on Apple Podcasts
          </Link>
        )}
      </Flex>

      <Box marginTop="8">
        <Link as={NextLink} href="/videos" fontWeight="bold">
          View More Videos
        </Link>
      </Box>
    </DefaultLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query: { id } } = context

  const { data } = await client.query({
    query: GET_VIDEO_BY_ID_QUERY,
    variables: {
      id
    }
  })

  return {
    props: {
      video: data?.video || {},
    },
  }
}

export default VideoPage
