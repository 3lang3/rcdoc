import React from 'react';
import { Cell } from 'react-vant';
import { CSSTransition } from 'react-transition-group';
import './transition.less';

export default () => {
  const nodeRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [transition, setTransition] = React.useState('');

  const animate = (transitionName: string) => {
    setShow(true);
    setTransition(transitionName);

    setTimeout(() => {
      setShow(false);
    }, 500);
  };

  return (
    <div className="demo-styles">
      <Cell isLink title="Fade" onClick={() => animate('rv-fade')} />
      <Cell isLink title="Slide Up" onClick={() => animate('rv-slide-up')} />
      <Cell isLink title="Slide Down" onClick={() => animate('rv-slide-down')} />
      <Cell isLink title="Slide Left" onClick={() => animate('rv-slide-left')} />
      <Cell isLink title="Slide Right" onClick={() => animate('rv-slide-right')} />

      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        timeout={300}
        classNames={transition}
        unmountOnExit
      >
        <div className="demo-animate-block" />
      </CSSTransition>
    </div>
  );
};
