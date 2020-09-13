import Head from 'next/head'
import HomeScreen from "../screens/HomeScreen"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeScreen />
    </div>
  )
}
