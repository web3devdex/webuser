import Head from 'next/head'
import PostScreen from "../screens/PostScreen"
import withReduxHOC  from "../hoc/withRedux"

function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostScreen />
    </div>
  )
}

Home.getInitialProps = async (ctx = {}) => {
  const { pathname, store } = ctx;
  const state = store.getState();
  return { pathname, state };
};

export default withReduxHOC.withRedux(Home)
