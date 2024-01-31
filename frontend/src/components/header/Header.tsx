import MenuPages from './MenuPages';
import SearchBox from './SearchBox';
import SettingMenu from './SettingMenu';

const Header = () => {
  return (
    <div className="fixed w-full h-12 bg-white shadow-md shadow-gray-400 z-40">
      <div className="flex flex-row items-center justify-between gap-5 place-items-center w-full">
        {/* Logo and search box */}
        <SearchBox />
        {/* Pages box */}
        <div className="flex-grow-[4]">
          <MenuPages />
        </div>
        {/* Setting box */}
        <div className="flex-grow">
          <SettingMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
