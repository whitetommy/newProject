'use client';
import React, { useState } from 'react';
import styles from './mypage.module.css';
import axios from 'axios';

const MyPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Sample1', date: '2022-04-13', visibility: 'private' },
    { id: 2, title: 'Sample2', date: '2022-04-14', visibility: 'public' },
    { id: 3, title: 'Sample3', date: '2022-04-15', visibility: 'private' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState('private');
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', newTitle);
    formData.append('visibility', selectedVisibility);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('업로드 성공:', response.data);
      setProjects([...projects, newProject]);
      setNewTitle('');
      setSelectedVisibility('private');
      setFile(null);
    } catch (error) {
      console.error('업로드 실패:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteProject = () => {
    setProjects(projects.filter(project => !selectedProjectIds.includes(project.id)));
    setSelectedProjectIds([]);
  };

  const handleModifyProject = () => {
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

  return (
    <div>
      <div className={styles.header}>
        <h1>My Projects</h1>
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
        <input type="file" name="file" onChange={handleFileChange} />
        {file && <p className={styles.selectedFile}>선택된 파일: {file.name}</p>}
        <button className={styles.button} onClick={handleCreateProject}>새 프로젝트</button>
        <button className={styles.button} onClick={handleModifyProject} disabled={selectedProjectIds.length === 0}>수정</button>
        <button className={styles.button} onClick={handleDeleteProject} disabled={selectedProjectIds.length === 0}>삭제</button>
      </div>
      <div className={styles.container}>
  {projects.map(project => (
    <div 
      key={project.id} 
      className={`${styles.post} ${selectedProjectIds.includes(project.id) ? styles.selectedProject : ''}`}
      onClick={() => toggleProjectSelection(project.id)}
    >
      <h2>제목: {project.title}</h2>
      <p>생성 날짜: {project.date}</p>
      <p>공개 여부: {project.visibility === 'private' ? 'Private' : 'Public'}</p>
      <div className={styles.buttonGroup}>
        <button className={styles.button}>코드 보기</button>
        <button className={styles.button}>분석 결과 보기</button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default MyPage;





