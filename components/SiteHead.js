import Head from 'next/head';

export default function SiteHead({title, description, image}) {
    return (
        <Head>
            <title>{title} | Boats I Like</title>
            <meta charSet="utf-8" />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
            <meta name="og:image" content={image} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="boatsilike" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image" content={image} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Cabin+Sketch:wght@400;700&family=Gochi+Hand&family=Oswald:wght@600&display=swap" rel="stylesheet" />
        </Head>
    );
}