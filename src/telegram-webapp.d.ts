interface TelegramWebApp {
  initData: string;
  initDataUnsafe: string;
  ready: () => void;
  close: () => void;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
