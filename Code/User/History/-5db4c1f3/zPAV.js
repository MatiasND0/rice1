import React, { useState, useEffect } from 'react';

const DropdownList = ({ options, placeholder, onSelect, selectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        setFilteredOptions(
            options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, options]);

    const handleOptionClick = (option) => {
        onSelect(option.value); // Almacenar solo el cod_materia
        setSearchTerm(option.label); // Cambiar el texto del input al texto de la opción seleccionada
        setIsOpen(false); // Cerrar el dropdown
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={searchTerm || placeholder} // Si no hay texto seleccionado, mostrar el placeholder
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {isOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredOptions.length === 0 ? (
                        <li className="px-4 py-2 text-gray-500">No hay opciones</li>
                    ) : (
                        filteredOptions.map(option => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                            >
                                {option.label} {/* Mostrar el texto completo */}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};


export default DropdownList;
