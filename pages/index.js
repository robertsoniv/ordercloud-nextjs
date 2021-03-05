import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { useOrderCloud } from '../lib/ordercloud-provider'
import LoginForm from '../components/login-form'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  const oc = useOrderCloud();
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <label htmlFor="authStatus">Authentication Status</label>
      <pre id="authStatus">{JSON.stringify(oc, null, 2)}</pre>
      <LoginForm/>
    </Layout>
  )
}