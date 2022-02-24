import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/PostCard.module.css';

export default function PostCard({ post }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Publish post
    const publishPost = async (postId) => {
        // change publishing state
        setPublishing(true);

        try {
            // Update post
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            });

            // reset the publishing state
            setPublishing(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop publishing state
            return setPublishing(false);
        }
    };
    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };

    return (
        <>
            <li className={styles.post__box}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                <div className={styles.btn__container}>
                    {!post.published ? (
                        <button className={styles.pub__btn} type="button" onClick={() => publishPost(post._id)}>
                            {publishing ? 'Publishing' : 'Publish'}
                        </button>
                    ) : null}
                    <button className={styles.del__btn}  type="button" onClick={() => deletePost(post['_id'])}>
                        {deleting ? 'Deleting' : 'Delete'}
                    </button>

                </div>
            </li>
        </>
    );
}