"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import styles from './analysis.module.css';

const AnalysisPage = () => {
  const { id } = useParams();
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isPatched, setIsPatched] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchAnalysisResult = async () => {
        try {
          console.log(`Fetching 분석 결과: file_id=${id}`);
          await axios.get(`/api/patch/?file_id=${id}`);
          checkPatchStatus(id);
        } catch (error) {
          console.error('분석 결과 가져오기 실패:', error.response ? error.response.data : error.message);
        }
      };
      fetchAnalysisResult();
    }
  }, [id]);

  const checkPatchStatus = async (fileId) => {
    const intervalId = setInterval(async () => {
      try {
        console.log('checkPatchStatus');
        const response = await axios.get(`/api/file/?file_id=${fileId}`);
        console.log('File Status Response:', response);
        if (response.data.is_patched) {
          clearInterval(intervalId);
          setIsPatched(true);
          fetchReport(fileId);
          console.log("ok!!!!");
        }
      } catch (error) {
        console.error('파일 상태 가져오기 실패:', error.response ? error.response.data : error.message);
      }
    }, 30000);
  };

  const fetchReport = async (fileId) => {
    try {
      console.log('fetchReport');
      const response = await axios.get(`/api/download/?file_id=${fileId}`);
      console.log('Download Report Response:', response);
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('리포트 다운로드 실패:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.reportMainTitle}>Report</h1>
      {isPatched ? (
        analysisResult ? (
          <div className={styles.analysisResult}>
            <h2 className={styles.sectionTitle}>분석 결과</h2>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={styles.markdown}
              components={{
                h1: ({node, ...props}) => <h1 className={styles.reportTitle} {...props} />,
                h2: ({node, ...props}) => <h2 className={styles.sectionTitle} {...props} />,
                h3: ({node, ...props}) => <h3 className={styles.subSectionTitle} {...props} />,
                p: ({node, ...props}) => <p className={styles.paragraph} {...props} />,
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      {...props}
                      style={materialDark}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props}>{children}</code>
                  );
                },
                pre: ({node, ...props}) => <pre className={styles.preformatted} {...props} />,
                ul: ({node, ...props}) => <ul className={styles.list} {...props} />,
                li: ({node, ...props}) => <li className={styles.listItem} {...props} />,
              }}
            >
              {typeof analysisResult === 'string' ? analysisResult : JSON.stringify(analysisResult, null, 2)}
            </ReactMarkdown>
          </div>
        ) : (
          <p>리포트를 가져오는 중...</p>
        )
      ) : (
        <p className={styles.noVulnerabilitiesMessage}>패치 진행 중...</p>
      )}
    </div>
  );
};

export default AnalysisPage;