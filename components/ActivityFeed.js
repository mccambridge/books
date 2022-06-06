import Link from 'next/link';
// import { useContext } from 'react';
// import { ActivityContext } from '../lib/context';

export default function ActivityFeed({ activity, admin, baseURI }) {

    if (!activity.length) {
        return <p>Nothing!</p>
    }

    return (
        <>
            { activity.length ?
                activity.map(item => <Activity
                                        item={item}
                                        key={item.slug}
                                        admin={admin}
                                        baseURI={baseURI}
                                    />)
            : null }
        </>
    );
};

function Activity({ item, admin=false, baseURI }) {
    const getCardClasses = (item) => {
        const cardClasses = ['card'];
        switch(item.event) {
            case 'NEW_BOOK':
                cardClasses.push('card--new-book');
        }
        return cardClasses.join(' ');
    }
    const getItemFooter = (item) => {
        switch(item.event) {
            case 'NEW_BOOK':
                return `added by admin on ${date}`;
            case 'CHECK_IN':
                return `borrowed by ${item.username} on ${date}`;
            default:
                return '';
        }
    }
    const getItemButton = (item) => {
        switch(item.event) {
            case 'NEW_BOOK':
                return <button className='btn-new' onClick={yepItsNew}>NEW!!</button>
            case 'CHECK_IN':
                return null;
            default:
                return null;
        }
    }

    const checkIn = async (e, item) => {
        e.preventDefault();
        const {
            authorLastName,
            slug,
            title,
        } = item;

        await firestore.collection('activity').add({
            authorLastName,
            slug,
            title,
            event: 'CHECK_IN',
            eventTime: serverTimestamp(),
        });

        toast.success('Congrats! Your book was added to the library!');
    }

    const yepItsNew = (e) => {
        // e.preventDefault();
        console.log('Yes, we got a new book!! Woohoo!')
    }

    const href = `/books/${item.slug}`;
    const eventTime = new Date(item.eventTime);
    const date = eventTime.toLocaleDateString('en-US');

    return (
        <div className={getCardClasses(item)}>
            <Link href={href} passHref>
                <a>
                    <div className="card-content push-right">
                        <h2>{item.title}</h2>
                        <footer>{getItemFooter(item)}</footer>
                    </div>
                    <div className="card-action">
                        { getItemButton(item) }
                    </div>
                </a>
            </Link>
        </div>
    )
}