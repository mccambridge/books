// /books/[bookSlug]
// e.g. /books/the-old-man-and-the-sea
import SiteHead from '../../components/SiteHead';

import BookContent from '../../components/BookContent';
import { firestore, postToJSON } from '../../lib/firebase';
import { REVALIDATE_TIME } from '../../lib/globals';

export async function getStaticProps({ params }) {
    const { bookSlug } = params;

    let post;
    let path;
  
    const bookRef = firestore.doc(`books/${bookSlug}`);
    const result = await bookRef.get();
    if (result) {
        post = postToJSON(result);
        path = bookRef.path;
    } else {
        return {
            notFound: true, // i'm not sure this needs to be here. revisit this.
        };
    }

    return {
        props: { post },
        revalidate: REVALIDATE_TIME,
    };
}

export async function getStaticPaths() {
    const posts = (await firestore.collection('books').get());

    const bookURIs = posts.docs.map(item => {
        return {bookSlug: item.id};
    });
  
    const paths = bookURIs.map((uri) => {
      return {
        params: { bookSlug: uri.bookSlug },
      };
    });

    return {
      // must be in this format:
      // paths: [
      //   { params: { username, slug }}
      // ],
      paths,
      fallback: false,
    };
}

export default function BookPage({ post }) {
    return (
        <main>
            <SiteHead title={post.title} description={post.description} />
            <BookContent book={post} />
        </main>
    );
}