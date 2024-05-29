import { getPosts } from "@/lib/data";
import styles from "./adminPosts.module.css";
import { deletePost } from "@/lib/action";

const AdminPosts = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <h1>Projects</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.detail}>
            <span className={styles.postTitle}>{post.title}</span>
          </div>
          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <button className={styles.postButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
