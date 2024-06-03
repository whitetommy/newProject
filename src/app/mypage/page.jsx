'use client';
import React, { useState, useEffect } from 'react';
import styles from './mypage.module.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import JSZip from 'jszip';

const MyPage = () => {
  const [projects, setProjects] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState(false);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseId, setResponseId] = useState();
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!session) return;
      try {
        const response = await axios.get(`/api/project`, {
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('프로젝트 fetching 에러:', error);
      }
    };
    fetchProjects();
  }, [session]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (responseId) {
        try {
          await axios.get(`/api/analyze/?file_id=${responseId}`);
        } catch (error) {
          console.error('분석 요청 실패:', error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchAnalysis();
  }, [responseId]);
  

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const maxSizeInBytes = 100 * 1024 * 1024;
    if (selectedFile.size > maxSizeInBytes) {
      setError('최대 파일 크기 100MB');
      setFile(null);
      return;
    }

    try {
      const zip = await JSZip.loadAsync(selectedFile);
      const containsJsFile = Object.keys(zip.files).some(filename => filename.endsWith('.js'));

      if (!containsJsFile) {
        setError('js파일이 포함된 zip파일을 업로드 해주세요.');
        setFile(null);
        return;
      }

      setError('');
      setFile(selectedFile);
    } catch (error) {
      setError('파일을 처리하는 중 오류가 발생했습니다.');
      setFile(null);
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
      updatedAt: new Date().toISOString(),
      visibility: selectedVisibility
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', newTitle);
    formData.append('visibility', selectedVisibility);

    try {
      setLoading(true);
      const response = await axios.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',   
          Authorization: `Bearer ${session.accessToken}`, 
        },
      });
      console.log('업로드 성공:', response.data);
      newProject.id = response.data.id;

      const projectResponse = await axios.post(`/api/project`, {
        title: newProject.title,
        path: String(response.data.id),
        framework: "javascript",
        isPublic: selectedVisibility,
        authorId: session.user.id,
      }, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const updatedProject = {
        id: projectResponse.data.id,
        title: newTitle,
        updatedAt: new Date().toISOString(),
        isPublic: selectedVisibility,
        path: response.data.id,
      };
      
      setProjects((prevProjects) => [...prevProjects, updatedProject]);
      setNewTitle('');
      setSelectedVisibility(false);
      setFile(null);
      setResponseId(response.data.id);
    } catch (error) {
      console.error('업로드 실패:', error.response ? error.response.data : error.message);
      setLoading(false);
    } 
  };

  const handleDeleteProject = async () => {
    for (let id of selectedProjectIds) {
      try {
        await axios.delete(`/api/project/${id}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
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
          isPublic: selectedVisibility,
        }, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
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
    setSelectedVisibility(false);
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
          onChange={(e) => setSelectedVisibility(e.target.value === 'true')}
        >
          <option value="false">Private</option>
          <option value="true">Public</option>
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
            <p>생성 날짜: {format(parseISO(project.updatedAt), 'yyyy/MM/dd HH:mm', { locale: ko })}</p>
            <p>공개 여부: {project.isPublic ? 'Public' : 'Private'}</p>
            <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={() => handleViewAnalysis(Number(project.path))}>
              {loading && String(responseId) === String(project.path) ? <ClipLoader size={24} color="red" /> : '분석 결과 보기'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
