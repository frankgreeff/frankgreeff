import { gql } from '@apollo/client'

import { Box, Grid, Heading } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import client from '@/utils/apollo-client'

import DefaultLayout from '@/layout/DefaultLayout'

import OutboundLinkTile from '@/components/OutboundLinkTile'

type OutboundLink = {
  externalUrl: string,
  mainImage: {
    url: string,
  },
  summary: string,
  sys: {
    id: string,
  },
  title: string,
}

type Page = {
  content: string,
}

const GET_PAGE_QUERY = gql`
  query GetPage {
    pageCollection(where: {title: "About"}) {
      items {
        content
      }
    }

    outboundLinkCollection {
      items {
        externalUrl
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

type AboutPageProps = {
  outboundLinks: OutboundLink[],
  page: Page,
}

const AboutPage = (props: AboutPageProps) => {
  const { outboundLinks, page } = props

  return (
    <DefaultLayout>
      <NextSeo
        title={`Frank Greeff | About Me`}
        description={`A brief run through of my history and what I am currently working on.`}
      />

      <Heading as="h1">About Me</Heading>

      <Box marginTop="8" whiteSpace="pre-wrap" width={['100%', '70%']}>
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
          {page?.content}
        </ReactMarkdown>
      </Box>

      <Heading as="h2" marginTop="16" size="lg">Media</Heading>

      <Grid
          gridTemplateColumns="repeat(auto-fill, minmax(296px, 1fr))"
          gap={6}
          marginTop="8"
          width="100%"
        >
          {outboundLinks.map((outboundLink) => (
            <OutboundLinkTile key={outboundLink.sys.id} outboundLink={outboundLink} />
          ))}
        </Grid>
    </DefaultLayout>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_PAGE_QUERY,
  })

  return {
    props: {
      outboundLinks: data?.outboundLinkCollection?.items || [],
      page: data?.pageCollection?.items?.[0] || {},
    },
  }
}

export default AboutPage
