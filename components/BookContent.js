export default function BookContent({ book }) {
    if (!book) return null;

    return (
        <main>
            <h1>{book.title}</h1>
            <em>by {book.authorFirstName} {book.authorLastName}</em>
            <div>
                <p>{book.description}</p>
            </div>
            {
                book.available ?
                    <button className="btn-blue btn-large">Check Out</button>
                :
                    <button className="btn-blue btn-large">Check In</button>
            }
        </main>
    )
}