export default function UserProfile({ user }) {
    return (
        <div className="box-center">
            <img layout="fill" src={user.photoURL} className="card-img-center" alt="" />
            <p>
                <i>@{user.username}</i>
            </p>
            <h1>{user.displayName}</h1>
        </div>
    )
}