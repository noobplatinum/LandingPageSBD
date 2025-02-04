import mainLogo from '../assets/mainlogo.png';
import backgroundGif from '../assets/background.gif'; // Import your GIF

const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 w-full text-white p-6"
      style={{
        backgroundImage: `linear-gradient(to right, rgb(157, 71, 255), #88b1ff, #88b1ff)`,
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="flex items-center relative h-18"> {/* Adjust the height as needed */}
        <div className="mr-4 ml-5">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img src={mainLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <div>
          <p className="text-left text-2xl font-light">J David P</p>
          <p className="text-left text-lg italic">Computer Engineer</p>
        </div>
        <div className="absolute right-0 top-0 h-full flex items-center pr-6">
          <img src={backgroundGif} alt="Background GIF" className="h-full object-contain" />
        </div>
      </div>
    </header>
  );
};

export default Header;