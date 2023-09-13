import pb from '@/utils/pocketbase';
import styles from './page.module.css'
import SearchTrackingNumberCustomer from './_components/TrackingNumberDashboard';

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

async function getTrackingNumbers() {

  const data = await pb.collection('TrackingNumbers').getFullList();
  return data;
}

export default async function Home() {
  const trackingNumbers = await getTrackingNumbers();
  return (
    <main className={styles.main}>
      <SearchTrackingNumberCustomer trackingNumbers={trackingNumbers}/>
    </main>
  )
}
