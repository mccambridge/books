import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';

import { firestore, auth, serverTimestamp, arrayUnion } from '../lib/firebase';

import SiteHead from "../components/SiteHead";
import Link from "next/link";

import { UserContext } from '../lib/context';

import toast from 'react-hot-toast';
import router from 'next/router';

export default function Add() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isSlugDupe, setIsSlugDupe] = useState(false);
    const [book, setBook] = useState({
        title: '',
        authorFirstName: '',
        authorLastName: '',
        description: '',
        slug: '',
        available: true,
    });

    const { username } = useContext(UserContext);

    const onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setBook({
            ...book,
            slug: name === 'title' ? encodeURI(kebabCase(value)) : book.slug,
            [name]: value,
        });
    }

    const newEntryIsValid = () =>
        (
            !isLoading && !isAdded && !isSlugDupe &&
            book.title.length > 0 && book.title.length < 100 &&
            book.authorFirstName.length > 0 && book.authorFirstName.length < 50 &&
            book.authorLastName.length > 0 && book.authorLastName.length < 100 &&
            book.description.length > 0 && book.description.length < 5000
        ) ? true : false;

    const submitBook = async (e) => {
        e.preventDefault();
        // first check to see if the book already exists in the database,
        // this only checks to see if the exact title is in there
        let ref = firestore.doc(`books/${book.slug}`);
        const { exists } = await ref.get();
        
        if (exists) {
            toast.error('Oh, my! We already seem to have this book! Please consider donating to a nice book fair!')
            return;
        }

        const {
            authorFirstName,
            authorLastName,
            slug,
            title,
            description,
        } = book;

        await firestore.collection('activity').add({
            authorLastName,
            slug,
            title,
            event: 'NEW_BOOK',
            eventTime: serverTimestamp(),
        });

        const bookData = {
            authorFirstName,
            authorLastName,
            slug,
            title,
            description,
            available: true,
        }

        ref = firestore.collection('books').doc(slug);
        await ref.set(bookData);

        toast.success('Congrats! Your book was added to the library!');
        setIsAdded(true);
    }

    return (
        <main>
            <SiteHead title="Add New" />
            <h1>Add a new book to the library</h1>
            <p className="readable">We love books like the Cookie Monster loves cookies! Mmmmmm! Books!!</p>
            <div className="content split-columns">
                <section>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input placeholder="" name="title" value={book.title} onChange={onChange} />
                    </p>
                    <p>
                        <label htmlFor="authorFirstName">Author First Name</label>
                        <input placeholder="" name="authorFirstName" value={book.authorFirstName} onChange={onChange} />
                    </p>
                    <p>
                        <label htmlFor="authorLastName">Author Last Name</label>
                        <input placeholder="" name="authorLastName" value={book.authorLastName} onChange={onChange} />
                    </p>
                    <p>
                        <label htmlFor="description">Description*</label>
                        <textarea name="description" className="content-textarea" onChange={onChange} value={book.description} />
                    </p>
                    <p>
                        {isAdded ?
                            <>
                                <Link href={`/books/${book.slug}`} passHref>
                                    <button className="btn-blue btn-large">Open Book Page</button>
                                </Link>
                                <Link href="/add" passHref>
                                    <button className="btn-large">Add Another Book</button>
                                </Link>
                            </>
                            :
                            <button disabled={!newEntryIsValid()} className="btn-blue btn-large" onClick={submitBook}>Add Book To Library</button>
                        }
                    </p>
                </section>
            </div>
        </main>
    )
}
