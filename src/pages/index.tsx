import Head from 'next/head'
import NextImage from 'next/image'

import { Flex, Heading, Image, Text } from '@chakra-ui/react'

import { Inter } from 'next/font/google'

import DefaultLayout from '@/layout/DefaultLayout'

import HeadShot from '@/assets/headshot.jpg'

const inter = Inter({ subsets: ['latin'] })

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Frank Greeff</title>
        <meta name="description" content="CEO & Entrepreneur with a passion for building high performing businesses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <DefaultLayout>
        <Flex
          aspectRatio={16/9}
          borderRadius="5px"
          marginBottom="8"
          overflow="clip"
          position="relative"
          width="100%"
        >
          <NextImage
            alt="Frank Greeff Sitting on Chair"
            src={HeadShot.src}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
        </Flex>

        <Flex
          borderColor="gray.100"
          direction="column"
          paddingBottom="12"
        >
          <Heading letterSpacing="-3px" size="4xl">Frank Greeff</Heading>
          <Heading marginTop="2" size="lg">CEO & Entrepreneur</Heading>

          <Text marginTop="8" width={['100%', "70%"]}>
            Currently on a journey to raise $1 million for charity writing a cookbook &quot;Eat with Purpose&quot; for high performers who are 
            health conscious and time poor. Host of the &quot;Chew The Fat&quot; Podcast, where real business insights meet real-world success stories.
          </Text>
        </Flex>
      </DefaultLayout>
    </>
  )
}
