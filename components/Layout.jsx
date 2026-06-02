import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner'; // අලුත් Banner එක ගෙන්වා ගැනීම

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner /> {/* හැම පිටුවකම පෙන්වීමට මෙය මෙතනට දාන්න */}
    </>
  );
}