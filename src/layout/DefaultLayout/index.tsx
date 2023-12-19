import { Flex } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

type DefaultLayoutProps = {
  children: React.ReactNode,
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props

  const { asPath } = useRouter()
  
  return (
    <Flex minHeight="100vh">
      <DefaultSeo
        title="Frank Greeff"
        description="CEO & Entrepreneur with a passion for building high performing businesses."
        canonical={`https://www.frankgreeff.com${asPath}`}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />

      <Sidebar />

      <Flex
        direction="column"
        marginLeft={['0', "240px"]}
        width={['100%', "calc(100% - 240px)"]}
      >
        <Header />

        <Flex direction="column" padding={['6', "12"]}>
          {children}
        </Flex>

        <Footer />
      </Flex>
    </Flex>
  )
}

export default DefaultLayout
