import styles from './mypage.module.css';

// 나중에 DB에서 가져올 아이템들(샘플)
const projects = [
  { id: 1, title: 'Sample1', date: '2022-04-13', visibility: 'private' },
  { id: 2, title: 'Sample2', date: '2022-04-14', visibility: 'public' },
  { id: 3, title: 'Sample3', date: '2022-04-15', visibility: 'private' },
];

const MyPage = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1>My projects</h1>
        <div className={styles.buttonGroup}>
          <button className={styles.button}>새 프로젝트</button>
          <button className={styles.button}>삭제</button>
          <button className={styles.button}>수정</button>
        </div>
      </div>
      <div className={styles.container}>
        {projects.map(project => (
          <div key={project.id} className={styles.post}>
            <h2>제목: {project.title}</h2>
            <p>생성 날짜: {project.date}</p>
            <p>공개 여부: {project.visibility === 'private' ? '비공개' : '공개'}</p>
            <button className={styles.button}>코드 보기</button>
            <button className={styles.button}>결과 보기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;


