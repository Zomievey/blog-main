import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function CommissionsPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar isLandingPage={false} />
      <div className='flex-grow flex justify-center items-center p-5'>
        <a
          href='https://docs.google.com/forms/d/e/your-form-id/viewform'
          target='_blank'
          rel='noopener noreferrer'
          className='btn-custom text-2xl'
        >
          Fill Out the Commission Form
        </a>
      </div>
      <Footer />
    </div>
  );
}
