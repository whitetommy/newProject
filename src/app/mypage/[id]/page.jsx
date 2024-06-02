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
          const response = await axios.get(`/api/patch/?file_id=${id}`);
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
      <h1 className={styles.reportMainTitle}>Report</h1>
      {analysisResult && (
        <div className={styles.analysisResult}>
          <h2 className={styles.sectionTitle}>분석 결과</h2>
          <ReactMarkdown
            className={styles.markdown}
            components={{
              h1: ({node, ...props}) => <h1 className={styles.reportTitle} {...props} />,
              h2: ({node, ...props}) => <h2 className={styles.sectionTitle} {...props} />,
              h3: ({node, ...props}) => <h3 className={styles.subSectionTitle} {...props} />,
              p: ({node, ...props}) => <p className={styles.paragraph} {...props} />,
              code: ({node, ...props}) => <code className={styles.codeBlock} {...props} />,
              pre: ({node, ...props}) => <pre className={styles.preformatted} {...props} />,
              ul: ({node, ...props}) => <ul className={styles.list} {...props} />,
              li: ({node, ...props}) => <li className={styles.listItem} {...props} />,
            }}
          >
            {typeof analysisResult === 'string' ? analysisResult : JSON.stringify(analysisResult, null, 2)}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
