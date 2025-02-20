const Logo = () => {
  const text = "Voya";
  return (
    <h1 className="header__logo-container">
      {text.split("").map((letter, i) => (
        <span
          key={i}
          className="header__letter"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};
export default Logo;
