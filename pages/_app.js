import '../styles/globals.scss'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { BaseContextProvider } from "../store/base-context"
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <BaseContextProvider>
    <Layout>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  </BaseContextProvider>
  )
}




export default MyApp
