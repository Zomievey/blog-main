import '../styles/footer.css';
export default function Footer() {
  return (
    <footer className='footer bg-gray-800 p-4 mt-auto'>
      <div className='container mx-auto text-center text-white'>
        &copy; {new Date().getFullYear()} My Blog. All rights reserved.
      </div>
    </footer>
  );
}
