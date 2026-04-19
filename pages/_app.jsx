import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}