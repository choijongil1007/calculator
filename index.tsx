
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const init = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Root element not found. Retrying...");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("macOS Calculator rendered successfully.");
  } catch (error) {
    console.error("Error during React mounting:", error);
  }
};

// DOM이 준비되었는지 확인 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
