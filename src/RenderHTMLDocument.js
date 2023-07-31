
import "./RenderHTMLDocument.css";
import React from 'react';

const RenderHTMLInIframe = ({ htmlString }) => {
  const iframeRef = React.useRef(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.open();
      iframeDocument.write(htmlString);
      iframeDocument.close();
    }
  }, [htmlString]);

  return <iframe className="htmlrender" title="Rendered HTML" ref={iframeRef} />;
};

export default RenderHTMLInIframe;
