'use client'
import { useState, useEffect, useRef } from "react";
import { useDoctorContext } from '@/context/DoctorProvider'

const Dropdown = ({ options, onSelect, placeholder }) => {
  const {getCurrentDoctor}  = useDoctorContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const dropdownRef = useRef(null);


  // Handle closing the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {

    if(placeholder == "Choose date"){
      setSelectedOption(option.day);
    }
     
    if(placeholder == "Choose time"){
      setSelectedTime(option.start+" - "+option.end);
    }
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full z-50 w-[200px]" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {placeholder == "Choose date" && (
            <>
              {selectedOption ? selectedOption : placeholder}
                <span className="ml-2 ">
                  {isOpen ? (
                    <svg
                      className="w-5 h-5 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
            </>
          )}

          {placeholder == "Choose time" && (
            <>
              {selectedTime ? selectedTime : placeholder}
                <span className="ml-2 ">
                  {isOpen ? (
                    <svg
                      className="w-5 h-5 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
            </>
          )}
           
          
        </button>
      </div>

      {placeholder === "Choose date" && isOpen && (
        <div className="absolute mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {getCurrentDoctor().doctorTiming.map((parent) => (
              <div className="parent" key={parent.id}>
                {/* Add a unique key for the parent */}
                <ul>
                  {parent.timing.map((child) => (
                    <div key={child.id}>
                      {/* Conditional rendering based on placeholder */}
                 
                        <button
                          onClick={() => handleOptionClick(child)}
                          className="block w-full text-left px-4 py-2 text-sm bg-blue-50 hover:bg-blue-200 focus:outline-none"
                        >
                          {child.day}
                        </button>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && placeholder === "Choose time" && (
        <div className="absolute mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.slots.map((slot) => (
              <div className="parent" key={slot}>
                {/* Add a unique key for the parent */}
                <ul>
                  {
                    <button
                    onClick={() => handleOptionClick(slot)}
                    className="block w-full px-4 py-2 text-xs bg-blue-50 hover:bg-blue-200 focus:outline-none"
                  >
                    {slot.start} - {slot.end}
                  </button>
                  }
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;




