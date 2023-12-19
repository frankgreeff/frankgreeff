import NextLink from 'next/link'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'

type MobileNavigationProps = {
  isOpen: boolean,
  onClose: VoidFunction,
}

const MobileNavigation = (props: MobileNavigationProps) => {
  const { isOpen, onClose } = props

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigation</DrawerHeader>

        <DrawerBody>
          <UnorderedList
            fontSize="x-large"
            lineHeight={2}
            listStyleType="none"
            margin="0"
            width="100%"
          >
            <ListItem borderBottom="1px solid" borderColor="gray.100">
              <NextLink href="/">
                Home
              </NextLink>
            </ListItem>

            <ListItem borderBottom="1px solid" borderColor="gray.100">
              <NextLink href="/podcast">
                Chew the Fat
              </NextLink>
            </ListItem>
            
            <ListItem borderBottom="1px solid" borderColor="gray.100">
              <NextLink href="/cookBook">
                Eat with Purpose
              </NextLink>
            </ListItem>

            <ListItem borderBottom="1px solid" borderColor="gray.100">
              <NextLink href="/about">
                About
              </NextLink>
            </ListItem>
            
            <ListItem>
              <NextLink href="/contact">
                Contact
              </NextLink>
            </ListItem>
          </UnorderedList>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileNavigation
