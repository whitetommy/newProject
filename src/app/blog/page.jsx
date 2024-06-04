'use client';

import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/blog`,{
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('포스트 fetching 에러:', error);
      }
    };
    fetchPosts();
  }, [router]);

  const handleViewAnalysis = async (id) => {
    try {
      router.push(`/mypage/${id}`);
    } catch (error) {
      console.error('페이지 이동 실패:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
            <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={() => handleViewAnalysis(Number(post.path))}>
              분석 결과 보기
              </button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
