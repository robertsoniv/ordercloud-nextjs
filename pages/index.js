import Head from 'next/head'
import { siteTitle } from '../components/layout'
import { useOrderCloud } from '../lib/ordercloud-provider'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'

export default function Home({ allPostsData }) {
  const oc = useOrderCloud();
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <label htmlFor="orderCloudContext" className="block font-extrabold text-xl pt-6">Current Context</label>
        <pre id="orderCloudContext" className='language-json shadow-lg rounded-xl overflow-hidden text-xs max-w-md'>
          <code
              className='language-json'
              dangerouslySetInnerHTML={{ __html: Prism.highlight(
                JSON.stringify(oc, null, 2),
                Prism.languages.json,
                'json'
              ) }}
          />
        </pre>
    </div>
  )
}