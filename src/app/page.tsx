import styles from './page.module.css'
import SearchTrackingNumberCustomer from '../components/SearchTrackingNumberCustomer';



export default async function Home() {
  return (
    <main className={styles.main}>
      <SearchTrackingNumberCustomer />
    </main>
  )
}