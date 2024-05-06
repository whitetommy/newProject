import styles from "./postCard.module.css";

const PostCard = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span className={styles.date}>
          {post.createdAt?.toString().slice(4, 16)}
        </span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        {/* <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link> */}
      </div>
    </div>
  );
};

export default PostCard;
