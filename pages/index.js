import Head from 'next/head'
import Home from '../components/Home'

function AppPage(props) {
  return (
    <>
      <Head>
        <title>Outline Stroke</title>
      </Head>
      <Home {...props} />
    </>
  )
}

export default AppPage
