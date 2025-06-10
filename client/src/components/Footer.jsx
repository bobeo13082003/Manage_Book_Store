import React from 'react';
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search, Menu, Heart, Bell, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-slate-900 to-purple-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">📚</span>
                            </div>
                            <span className="text-2xl font-bold">BookStore</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Cửa hàng sách trực tuyến hàng đầu Việt Nam. Mang tri thức đến gần hơn với mọi người.
                        </p>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">123 Đường Sách, Quận 1, TP.HCM</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Danh mục sách</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Tiểu thuyết</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Kỹ năng sống</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Kinh doanh</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Thiếu nhi</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Học thuật</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Hỗ trợ khách hàng</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Liên hệ</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Chính sách đổi trả</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Hướng dẫn mua hàng</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">Chính sách bảo mật</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors hover:pl-2 duration-300">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Kết nối với chúng tôi</h4>
                        <div className="flex space-x-4 mb-6">
                            <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl">
                                <span className="text-sm font-bold">FB</span>
                            </Button>
                            <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl">
                                <span className="text-sm font-bold">IG</span>
                            </Button>
                            <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl">
                                <span className="text-sm font-bold">YT</span>
                            </Button>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">Đăng ký nhận tin tức mới:</p>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg px-4">
                                Gửi
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-300 text-sm">
                        © 2024 BookStore. Tất cả quyền được bảo lưu.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-300 hover:text-purple-300 text-sm transition-colors">Điều khoản sử dụng</a>
                        <a href="#" className="text-gray-300 hover:text-purple-300 text-sm transition-colors">Chính sách bảo mật</a>
                        <a href="#" className="text-gray-300 hover:text-purple-300 text-sm transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;