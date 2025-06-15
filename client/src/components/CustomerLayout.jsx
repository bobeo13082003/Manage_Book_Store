import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search, Menu, Heart, Bell, MapPin, LogOut, Settings } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const CustomerLayout = ({ children }) => {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userName = localStorage.getItem('userName') || 'Nguyễn Văn An'

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userName')
        navigate('/shop')
        window.location.reload()
    }

    const handleSearch = (e) => {
        e.preventDefault()
        console.log('Search triggered')
        // Add search functionality here
    }

    const handleCartClick = () => {
        navigate('/cart')
    }

    const handleProfileClick = () => {
        navigate('/profile')
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
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
                            <form onSubmit={handleSearch} className="relative w-full group">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sách, tác giả, thể loại..."
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500 text-gray-700"
                                />
                                <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6">
                                    Tìm
                                </Button>
                            </form>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <Link to="/shop" className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group">
                                Trang chủ
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <button onClick={() => console.log('Books clicked')} className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group">
                                Sách
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <button onClick={() => console.log('About clicked')} className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group">
                                Giới thiệu
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </button>
                        </nav>

                        {/* Right side buttons */}
                        <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-xl" onClick={() => console.log('Wishlist clicked')}>
                                <Heart className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                            </Button>

                            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-xl" onClick={() => console.log('Notifications clicked')}>
                                <Bell className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </Button>

                            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-xl" onClick={handleCartClick}>
                                <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                            </Button>

                            {/* Login/Profile Section */}
                            {isLoggedIn ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-all">
                                            <User className="w-4 h-4 mr-2" />
                                            {userName}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{userName}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    nguyenvanan@gmail.com
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Xem profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Trang chủ cá nhân</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Đăng xuất</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link to="/login">
                                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-all">
                                        <User className="w-4 h-4 mr-2" />
                                        Đăng nhập
                                    </Button>
                                </Link>
                            )}

                            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-purple-50 rounded-xl" onClick={() => console.log('Mobile menu clicked')}>
                                <Menu className="w-5 h-5 text-gray-600" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile search */}
                <div className="md:hidden px-4 pb-4">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </form>
                </div>
            </header>

            {/* Main content */}
            <main>{children}</main>

            {/* Footer */}
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
        </div>
    );
};

export default CustomerLayout;