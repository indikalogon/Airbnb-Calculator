import '../styles/globals.css';
import Script from 'next/script'; 
import Layout from '../components/Layout'; // 1. අලුත් Layout එක ගෙන්වා ගැනීම

export default function App({ Component, pageProps }) {
  // ඔබගේ සැබෑ Measurement ID එක
  const GA_MEASUREMENT_ID = 'G-KT173RCW5D'; 

  return (
    <>
      {/* Google Analytics Scripts */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* ඔබගේ පරණ සැකසුම් එලෙසම ඇත */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* 2. අලුත් Layout එකෙන් මුළු වෙබ් අඩවියේම පිටු ආවරණය කිරීම */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}