import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import PreviousRulings from '../components/PreviousRulings'

const Home = () => {
  return (
    <Layout>
        <PreviousRulings />
    </Layout>
  )
}

export default Home
