"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import styles from './analysis.module.css';

const AnalysisPage = () => {
  const { id } = useParams();
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchAnalysisResult = async () => {
        try {
          console.log(`Fetching analysis result for file_id=${id}`);
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/patch/?file_id=${id}`);
          console.log('Response:', response);
          setAnalysisResult(response.data);
        } catch (error) {
          console.error('분석 결과 가져오기 실패:', error.response ? error.response.data : error.message);
        }
      };
      fetchAnalysisResult();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <h1>Report</h1>
      {analysisResult && (
        <div className={styles.analysisResult}>
          <h2>분석 결과</h2>
          <ReactMarkdown>{typeof analysisResult === 'string' ? analysisResult : JSON.stringify(analysisResult)}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
