import Head from 'next/head'
import { useMemo } from 'react'
import { siteTitle } from '../components/layout'
import useOcAuth from '../lib/useOcAuth'
import useOcProductDetail from '../lib/useOcProductDetail';

export default function Home({ allPostsData }) {
  const oc = useOcAuth();
  
  const test = useOcProductDetail('jacket')

  const jsonContent = useMemo(() => {
    let content = JSON.stringify(test, null, 2);
    console.log(content);
    return content
  }, [test])

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <label htmlFor="orderCloudContext" className="block font-extrabold text-xl pt-6">Current Context</label>
        <pre id="orderCloudContext" className='p-3 bg-gray-700 text-white shadow-lg rounded-xl overflow-hidden text-xs max-w-md'>
          <code>{jsonContent}</code>
        </pre>
    </div>
  )
}