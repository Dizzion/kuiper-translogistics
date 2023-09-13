import { TNGetAll } from '@/utils/pocketbase';
import styles from './page.module.css'
import SearchTrackingNumberCustomer from '../_components/TrackingNumberDashboard';



export default async function Home() {
  return (
    <main className={styles.main}>
      <SearchTrackingNumberCustomer />
    </main>
  )
}
