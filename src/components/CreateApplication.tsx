// CreateApplication.tsx
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const CreateApplication: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch('http://3.111.163.245/CreateApplication'); // Replace with your actual API endpoint
        const htmlText = await response.text();
        const sanitizedHtml = DOMPurify.sanitize(htmlText);
        setHtmlContent(sanitizedHtml);
      } catch (error) {
        console.error('Error fetching HTML:', error);
      }
    };

    fetchHtmlContent();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export default CreateApplication;
