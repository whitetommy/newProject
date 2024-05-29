'use client';
import React, { useState } from 'react';
import styles from './mypage.module.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';


const MyPage = () => {

  const router = useRouter();

  const [projects, setProjects] = useState([
    { id: 1, title: 'Sample1', date: '2022-04-13', visibility: 'private' },
    { id: 2, title: 'Sample2', date: '2022-04-14', visibility: 'public' },
    { id: 3, title: 'Sample3', date: '2022-04-15', visibility: 'private' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState('private');
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseId, setResponseId] = useState();


  //file은 zip파일만 허용
  const handleFileChange = (e) => {
    const selectedfile = e.target.files[0];
    const maxSizeInBytes = 100 * 1024 * 1024; // 100MB
    setFile(selectedfile);
    //업로드된 파일이 100mb를 넘는 경우
    if(selectedfile > maxSizeInBytes){
      setError('최대 파일 크기 100MB');
      setFile(null);
    }
    else {
      setError('');
      setFile(selectedfile);
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
      setResponseId(response.data.id);
    } catch (error) {
      console.error('업로드 실패:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
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

  const handleViewAnalysis = async (id) => {
    setLoading(true);
    try {
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analyze/?file_id=${id}`);
      // setAnalysisResult(response.data);
      router.push(`/mypage/${id}`);
    } catch (error) {
      console.error('페이지 이동 실패:', error.message);
      // console.error('분석 결과 가져오기 실패:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleViewMarkdown = (id) => {

  //   router.push(`/mypage/${id}`);

  // };


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
        <input type="file" name="file" accept='.zip' onChange={handleFileChange} />
        {file && <p className={styles.selectedFile}>선택된 파일: {file.name}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className={styles.button} onClick={handleCreateProject} disabled={loading}>새 프로젝트(분석 요청)</button>
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
            <button className={styles.button} onClick={() => handleViewAnalysis(responseId)}>
                {loading ? <ClipLoader size={24} color="red" /> : '결과 보기' }
            </button>
          </div>
          {/* {analysisResult && (
              <div className={styles.analysisResult}>
                <h2>분석 결과</h2>
                <ReactMarkdown>{typeof analysisResult === 'string' ? analysisResult : JSON.stringify(analysisResult)}</ReactMarkdown>
              </div>
            )} */}

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;




