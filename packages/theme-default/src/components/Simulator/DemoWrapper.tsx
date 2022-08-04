import React from 'react';
import { inIframe } from '../../common';
import { useNavigate } from 'react-router-dom';
import '@vant/touch-emulator';

const DemoWrapper = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const onMessage = (event) => {
      if (event.data?.type !== 'replacePath') {
        return;
      }
      const path = event.data?.value || '';
      navigate(path, { replace: true });
    };
    if (inIframe) {
      // If in iframe, emit parent history change
      // Avoid iframe rerender to request hole site resource everytime
      window.addEventListener('message', onMessage);
      document.body.setAttribute('ontouchstart', '');
      document.body.classList.add('mdoc-simulator--body');
    }

    return () => {
      if (inIframe) {
        window.removeEventListener('message', onMessage);
        document.body.removeAttribute('ontouchstart');
      }
    };
  }, []);

  return children;
};

export default DemoWrapper;
