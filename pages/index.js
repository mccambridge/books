import SiteHead from '../components/SiteHead';

import { useState } from 'react'

import Loader from '../components/Loader'
import { firestore, activityToJSON, fromMillis } from '../lib/firebase'
import ActivityFeed from '../components/ActivityFeed';
import { REVALIDATE_TIME } from '../lib/globals';

const LIMIT = 20;
let isEndOfActivityFeed = false;

export async function getServerSideProps(context) {
  const activityQuery = firestore
    .collectionGroup('activity')
    .orderBy('eventTime', 'desc')
    .limit(LIMIT);

  const activity = (await activityQuery.get()).docs.map(activityToJSON);

  if (activity.length < LIMIT) {
    isEndOfActivityFeed = true;
  }

  return {
    props: { activity, isEndOfActivityFeed },
    // revalidate: REVALIDATE_TIME,
  }
}

// export async function getStaticPaths() {
//   // Improve my using Admin SDK to select empty docs
//   const snapshot = await firestore.collectionGroup('designs').get();

//   const paths = snapshot.docs.map((doc) => {
//     const { slug } = doc.data();
//     return {
//       params: { design: slug },
//     };
//   });

//   return {
//     // must be in this format:
//     // paths: [
//     //   { params: { username, slug }}
//     // ],
//     paths,
//     fallback: false,
//   };
// }

export default function Home(props) {
  const [activity, setActivity] = useState(props.activity);
  const [loading, setLoading] = useState(false);
  const [isEndOfActivityFeed, setIsEndOfActivityFeed] = useState(props.isEndOfActivityFeed);

  const getMoreActivity = async () => {
    setLoading(true);
    const last = activity[activity.length - 1];

    const cursor = typeof last.checkOutTime === 'number' ? fromMillis(last.checkOutTime) : last.checkOutTime;

    const query = firestore
      .collectionGroup('activity')
      .orderBy('eventTime', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newActivity = (await query.get()).docs.map(doc => doc.data());

    setActivity(activity.concat(newActivity));
    setLoading(false);

    if (newActivity.length < LIMIT) {
      setIsEndOfActivityFeed(true);
    }
  }

  return (
    <div>
      <SiteHead title="Home" description="Books!" image="" />
      <h1>Activity</h1>
      <main className="list">
        <ActivityFeed activity={activity} />
      </main>

      {!loading && !isEndOfActivityFeed && <button onClick={getMoreActivity}>Load More</button>}
      {isEndOfActivityFeed && <div />}

      <Loader show={loading} />
    </div>
  )
}
