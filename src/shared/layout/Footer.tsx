import {FaRegCopyright} from "../deps";

export default function Footer() {
  return (
    <footer className="app-footer">
      <span><FaRegCopyright/> {new Date().getFullYear()} Flight Tracker</span>
    </footer>
  );
}
