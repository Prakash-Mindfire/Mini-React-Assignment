import { useState } from "react";
import { FaArrowsAltH } from "react-icons/fa";

type Props = {
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onDateChange: (v: string) => void;
  onDepAirportChange: (v: string) => void;
  onArrAirportChange: (v: string) => void;
  departureAirports: string[];
  arrivalAirports: string[];
};

const FlightSearchFilter = ({ onSearchChange, onStatusChange, onDateChange, onDepAirportChange, onArrAirportChange, departureAirports, arrivalAirports }: Props) => {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dep, setDep] = useState("");
  const [arr, setArr] = useState("");

  return (
    <div className="search-wrapper" >
      <label htmlFor="flightSearch" className="sr-only">
        Search flights
      </label>
      <input
        id="flightSearch"
        name="flightSearch"
        className="search-from-input"
        type="text"
        placeholder="Search flight / airline / airport"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearchChange(e.target.value);
        }}
      />
      {/* Destination */}
      <select
        id="departureAirport"
        name="departureAirport"
        className="search-from-input"
        value={dep}
        onChange={(e) => {
          setDep(e.target.value)
          onDepAirportChange(e.target.value)
        }}>
        <option value="">From (All)</option>
        {departureAirports.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>
      <span className="From-To">
        {/* <FaLongArrowAltRight /> */}
        <FaArrowsAltH />
      </span>
      <select
        id="arrivalAirport"
        name="arrivalAirport"
        className="search-to-input"
        value={arr}
        onChange={(e) => {
          setArr(e.target.value)
          onArrAirportChange(e.target.value)
        }}>
        <option value="">To (All)</option>
        {arrivalAirports.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>
      <input
        className="flight-date"
        type="date"
        title="Filter by flight date"
        onChange={(e) => {
          onDateChange(e.target.value)
        }}
      />
      <select
        className="select-flight-status"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          onStatusChange(e.target.value);
        }}
      >
        <option value="">All Status</option>
        <option value="scheduled">Scheduled</option>
        <option value="active">Active</option>
        <option value="landed">Landed</option>
        <option value="cancelled">Cancelled</option>
        <option value="delayed">Delayed</option>
      </select>
    </div>
  );

};

export default FlightSearchFilter;
