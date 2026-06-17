import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  to?: string | Element;
};

const Portal = ({ children, to = document.body }: PortalProps) => {
  const target =
    typeof to === 'string' ? document.querySelector(to) || document.body : to;

  return createPortal(children, target);
};

export default Portal;
