import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from "./postCard.module.css";

const PostCard = ({ post }) => {
  const formattedUpdatedAt = format(parseISO(post.updatedAt), 'yyyy/MM/dd HH:mm', { locale: ko });

  return (
    <div className={styles.container}>
      <div className={styles.bottom}>
        <h1 className={styles.title}>제목 : {post.title}</h1>
        <p className={styles.desc}>
          최종 수정 날짜 : {formattedUpdatedAt}
        </p>
        {/* <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link> */}
      </div>
    </div>
  );
};

export default PostCard;
