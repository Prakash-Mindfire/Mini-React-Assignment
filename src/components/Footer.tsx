import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="app-footer">
      <span><FaRegCopyright/> {new Date().getFullYear()} Flight Tracker</span>
    </footer>
  );
}
