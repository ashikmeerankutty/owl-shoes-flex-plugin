import React, { useEffect, useState, useRef } from 'react';

type IWindowProps = {
  url: string;
  title: string;
  width: number;
  height: number;
};

type IPopupProps = IWindowProps & {
  onClose: () => void;
  onCode: (code: string, params: URLSearchParams) => void;
};

const createPopup = ({
  url, title, height, width,
}: IWindowProps) => {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2.5;
  return window.open(
    url,
    title,
    `width=${width},height=${height},left=${left},top=${top}`,
  );
};

const OauthPopup: React.FC<IPopupProps> = ({
  title = '',
  width = 500,
  height = 500,
  url,
  onCode,
  onClose,
}: IPopupProps) => {
  const [externalWindow, setExternalWindow] = useState<Window | null>();
  const intervalRef = useRef<number>();

  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  useEffect(() => {
    setExternalWindow(createPopup({
      url, title, width, height,
    }));
  });

  useEffect(() => {
    if (externalWindow) {
      intervalRef.current = window.setInterval(() => {
        try {
          const currentUrl = externalWindow.location.href;
          const params = new URL(currentUrl).searchParams;
          const code = params.get('code');
          if (!code) {
            return;
          }
          onCode(code, params);
          clearTimer();
          externalWindow.close();
        } catch (error) {
          // eslint-ignore-line
        } finally {
          if (!externalWindow || externalWindow.closed) {
            onClose();
            clearTimer();
          }
        }
      }, 700);
    }
    return () => {
      if (externalWindow) externalWindow.close();
      if (onClose) onClose();
    };
  }, [externalWindow]);

  return (
    // eslint-disable-next-line
    <div>
    </div>
  );
};

export default OauthPopup;