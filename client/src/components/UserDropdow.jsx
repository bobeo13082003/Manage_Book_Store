import React from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Heart, ShoppingCart, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const UserDropdow = ({ user, onLogout }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                    <Avatar className="h-10 w-10 ring-2 ring-purple-100 hover:ring-purple-300 transition-all duration-300">
                        <AvatarImage src={user.avatar?.url} alt={user.fullName} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-lg">
                            {user.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-0 bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden" align="end" forceMount>
                {/* User Info Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-white/20">
                            <AvatarImage src={user.avatar?.url} alt={user.fullName} />
                            <AvatarFallback className="bg-white/20 text-white font-bold">
                                {user.fullName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-lg truncate">{user.fullName}</p>
                            <p className="text-sm text-white/80 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                    <DropdownMenuItem asChild className="mb-1">
                        <Link to="/profile" className="flex items-center px-4 py-3 cursor-pointer rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mr-3 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-200">
                                <User className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-800">Thông tin cá nhân</span>
                                <p className="text-xs text-gray-500">Quản lý hồ sơ của bạn</p>
                            </div>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-3 bg-gradient-to-r from-purple-200 to-pink-200 h-px" />

                    <DropdownMenuItem
                        className="flex items-center px-4 py-3 cursor-pointer rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-200 group mb-2"
                        onClick={onLogout}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center mr-3 group-hover:from-red-200 group-hover:to-orange-200 transition-all duration-200">
                            <LogOut className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <span className="font-medium text-red-600">Đăng xuất</span>
                            <p className="text-xs text-red-400">Thoát khỏi tài khoản</p>
                        </div>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdow;