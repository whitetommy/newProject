'use client';
import React, { useState, useEffect } from 'react';
import styles from './mypage.module.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const MyPage = () => {
  const [projects, setProjects] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState('private');
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseId, setResponseId] = useState();
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/project');
        setProjects(response.data);
      } catch (error) {
        console.error('프로젝트 fetching 에러:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSizeInBytes = 100 * 1024 * 1024; // 100MB
    if (selectedFile.size > maxSizeInBytes) {
      setError('최대 파일 크기 100MB');
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const handleCreateProject = async () => {
    if (!file) {
      alert('파일을 먼저 선택해 주세요.');
      return;
    }

    const newProject = {
      id: projects.length + 1,
      title: newTitle,
      date: new Date().toISOString().split('T')[0],
      visibility: selectedVisibility
    };
    console.log(session);
    console.log(session.user.id);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', newTitle);
    formData.append('visibility', selectedVisibility);

    try {
      const response = await axios.post(`api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('업로드 성공:', response.data);
      newProject.id = response.data.id; // 서버에서 반환된 파일 경로

      const projectResponse = await axios.post('/api/project', {
        title: newProject.title,
        path: String(newProject.id),
        framework: "javascript",
        isPublic: newProject.visibility === 'public',
        authorId: session.user.id,
      });

      console.log("resdata : ", response.data);

      setProjects([...projects, { ...newProject, id: projectResponse.data.id }]);
      setNewTitle('');
      setSelectedVisibility('private');
      setFile(null);
      setResponseId(response.data.id);
      setLoading(true);

      console.log("responseId", responseId);
      console.log("response.data.id", response.data.id);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analyze/?file_id=${response.data.id}`);
      console.log(res.data);
    } catch (error) {
      console.error('업로드 실패:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    for (let id of selectedProjectIds) {
      try {
        await axios.delete(`/api/project/${id}`);
      } catch (error) {
        console.error('프로젝트 삭제 에러:', error);
      }
    }
    setProjects(projects.filter(project => !selectedProjectIds.includes(project.id)));
    setSelectedProjectIds([]);
  };

  const handleModifyProject = async () => {
    for (let id of selectedProjectIds) {
      try {
        await axios.put(`/api/project/${id}`, {
          title: newTitle || projects.find(project => project.id === id).title,
          isPublic: selectedVisibility === 'public',
        });
      } catch (error) {
        console.error('프로젝트 수정 에러:', error);
      }
    }
    const updatedProjects = projects.map(project => {
      if (selectedProjectIds.includes(project.id)) {
        return { ...project, title: newTitle || project.title, visibility: selectedVisibility };
      }
      return project;
    });
    setProjects(updatedProjects);
    setNewTitle('');
    setSelectedVisibility('private');
    setSelectedProjectIds([]);
  };

  const toggleProjectSelection = (id) => {
    setSelectedProjectIds(prevSelectedProjectIds =>
      prevSelectedProjectIds.includes(id)
        ? prevSelectedProjectIds.filter(prevId => prevId !== id)
        : [...prevSelectedProjectIds, id]
    );
  };

  const handleViewAnalysis = async (id) => {
    try {
      router.push(`/mypage/${id}`);
    } catch (error) {
      console.error('페이지 이동 실패:', error.message);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>My Projects</h1>
        <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <select
          value={selectedVisibility}
          onChange={(e) => setSelectedVisibility(e.target.value)}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <input type="file" name="file" accept='.zip' onChange={handleFileChange} />
        {file && <p className={styles.selectedFile}>선택된 파일: {file.name}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleCreateProject}>새 프로젝트</button>
        <button className={styles.button} onClick={handleModifyProject} disabled={selectedProjectIds.length === 0}>수정</button>
        <button className={styles.button} onClick={handleDeleteProject} disabled={selectedProjectIds.length === 0}>삭제</button>
        </div>
      </div>
      <div className={styles.container}>
        {projects.map(project => (
          <div 
            key={project.id} 
            className={`${styles.post} ${selectedProjectIds.includes(project.id) ? styles.selectedProject : ''}`}
            onClick={() => toggleProjectSelection(project.id)}
          >
            <h2>제목: {project.title}</h2>
            <p>생성 날짜: {project.updatedAT}</p>
            <p>공개 여부: {project.visibility === 'private' ? 'Private' : 'Public'}</p>
            <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={() => handleViewAnalysis(Number(project.path))}>
                {loading ? <ClipLoader size={24} color="red" /> : '분석 결과 보기'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;