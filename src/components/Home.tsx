// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Home: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch('/');
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
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Website</title>
        <style>
        </style>
      </head>
      <body>
        <Header />
        <div className="app-container">
          {/* <Sidebar /> */}
          <main className="main-content">
            {/* Your page content goes here */}
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            {/* <div>Hello</div> */}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default Home;
