import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between bg-black p-3">
        <div>Logo</div>
        <div>
          <HeaderCartButton />
        </div>

      </div>
    </>
  );
};

export default Header;
