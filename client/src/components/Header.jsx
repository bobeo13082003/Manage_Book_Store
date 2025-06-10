import React from 'react';
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search, Menu, Heart, Bell, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
const Header = () => {
    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-purple-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/shop" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                            <span className="text-white font-bold text-xl">📚</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BookStore</span>
                            <p className="text-xs text-gray-500 font-medium">Tri thức vô tận</p>
                        </div>
                    </Link>

                    {/* Search */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm sách, tác giả, thể loại..."
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500 text-gray-700"
                            />
                            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6">
                                Tìm
                            </Button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link to="/shop" className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group">
                            Trang chủ
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/shop/books" className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group">
                            Sách
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/shop/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group">
                            Giới thiệu
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-xl">
                            <Heart className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                        </Button>

                        <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-xl">
                            <Bell className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        </Button>

                        <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-xl">
                            <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                        </Button>

                        <Link to="/login">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-all">
                                <User className="w-4 h-4 mr-2" />
                                Đăng nhập
                            </Button>
                        </Link>

                        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-purple-50 rounded-xl">
                            <Menu className="w-5 h-5 text-gray-600" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile search */}
            <div className="md:hidden px-4 pb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;