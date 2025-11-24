export default defineNuxtPlugin(() => {
  const GA_ID = 'G-RVBP7PH3G7';

  // gtag.js の読み込み
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // dataLayer と gtag 初期化
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }

  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false }); 
  // send_page_view: false にして、後でルーター遷移で手動送信するのがポイント
});