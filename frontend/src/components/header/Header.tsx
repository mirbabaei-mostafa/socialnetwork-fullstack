import MenuPages from "./MenuPages";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-5 place-items-center">
      {/* Logo and search box */}
      <SearchBox />
      {/* Pages box */}
      <div className="flex-grow-[3]">
        <MenuPages />
      </div>
      {/* Setting box */}
      <div className="flex-grow">Setting</div>
    </div>
  );
};

export default Header;
