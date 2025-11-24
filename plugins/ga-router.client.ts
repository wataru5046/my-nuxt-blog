export default defineNuxtPlugin((nuxtApp) => {
  const GA_ID = 'G-RVBP7PH3G7';

  nuxtApp.$router.afterEach((to) => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: to.fullPath,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GA_ID
      });
    }
  });
});