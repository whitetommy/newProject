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
        <h1 className={styles.title}>제목 : {post.title}</h1>
        <p className={styles.desc}>
          최종 수정 날짜 : updatedAt통해서 값 불러오긔..
        </p>
        {/* <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link> */}
      </div>
    </div>
  );
};

export default PostCard;
