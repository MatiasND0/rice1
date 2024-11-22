import React, { useState } from 'react';

const DropdownList = ({ options, placeholder, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [filter, setFilter] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setFilter(''); // Resetea el filtro
        setIsOpen(false);
        if (onSelect) {
            onSelect(option);
        }
    };

    // Filtra las opciones según el texto ingresado
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <div className="border rounded-md">
                <div
                    className="cursor-pointer p-2"
                    onClick={toggleDropdown}
                >
                    {selectedOption || placeholder}
                </div>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-lg">
                    <input
                        type="text"
                        className="w-full p-2 border-b"
                        placeholder="Filtrar..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <ul className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">Sin opciones</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownList;
