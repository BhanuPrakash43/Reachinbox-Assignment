import ThemeSwithcher from "./ThemeSwitcher";

function Navbar() {
  return (
    <div className="h-16 w-screen bg-white dark:bg-[#1F1F1F] fixed px-14 text-[#5B5F66] dark:text-white top-0 flex justify-between items-center border-b-2 dark:border-[#343A40] border-[#E0E0E0]">
      <div className="text-xl">Onebox</div>

      <div className="flex items-center">
        <ThemeSwithcher />
      </div>
    </div>
  );
}

export default Navbar;
