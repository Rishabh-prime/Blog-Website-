import logo from '../assets/luff.png' // adjust path accordingly

function Logo({ width = '50%' }) {
  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        style={{ width, borderRadius: "50%" }} // fully rounded
      />
    </div>
  );
}

export default Logo;