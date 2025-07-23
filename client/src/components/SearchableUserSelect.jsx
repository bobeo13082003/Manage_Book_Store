import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';

const SearchableUserSelect = ({
    users,
    value,
    onChange,
    placeholder = "Chọn khách hàng..."
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const containerRef = useRef(null);

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Find selected user when value changes
    useEffect(() => {
        if (value === 'all') {
            setSelectedUser(null);
            setSearchTerm('');
        } else {
            const user = users.find(u => u.id === value);
            setSelectedUser(user || null);
            setSearchTerm(user?.name || '');
        }
    }, [value, users]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                // Reset search term to selected user name or empty
                setSearchTerm(selectedUser?.name || '');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectedUser]);

    const handleUserSelect = (user) => {
        if (user) {
            setSelectedUser(user);
            setSearchTerm(user.name);
            onChange(user.id);
        } else {
            setSelectedUser(null);
            setSearchTerm('');
            onChange('all');
        }
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    return (
        <div ref={containerRef} className="relative w-48">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="pl-10 pr-8"
                />
                <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {/* All users option */}
                    <div
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b"
                        onClick={() => handleUserSelect(null)}
                    >
                        <div className="font-medium">Tất cả khách hàng</div>
                    </div>

                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleUserSelect(user)}
                            >
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-500">
                            Không tìm thấy khách hàng nào
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchableUserSelect;