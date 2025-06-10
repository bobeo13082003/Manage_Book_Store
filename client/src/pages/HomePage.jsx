import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, BookOpen, Users, Truck, Shield, Sparkles, TrendingUp, Award } from "lucide-react"
import CustomerLayout from '../components/CustomerLayout';
const HomePage = () => {
    const featuredBooks = [
        {
            id: 1,
            title: "Đắc Nhân Tâm",
            author: "Dale Carnegie",
            price: "65.000đ",
            originalPrice: "85.000đ",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
            rating: 4.8,
            discount: "24%",
            badge: "Bestseller"
        },
        {
            id: 2,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            price: "120.000đ",
            originalPrice: "150.000đ",
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
            rating: 4.9,
            discount: "20%",
            badge: "Hot"
        },
        {
            id: 3,
            title: "Atomic Habits",
            author: "James Clear",
            price: "95.000đ",
            originalPrice: "120.000đ",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
            rating: 4.7,
            discount: "21%",
            badge: "New"
        },
        {
            id: 4,
            title: "The 7 Habits",
            author: "Stephen Covey",
            price: "85.000đ",
            originalPrice: "110.000đ",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
            rating: 4.6,
            discount: "23%",
            badge: "Popular"
        }
    ]

    const categories = [
        { name: "Tiểu thuyết", count: "1,245 sách", icon: "📚", gradient: "from-blue-500 to-purple-600" },
        { name: "Kỹ năng sống", count: "892 sách", icon: "🎯", gradient: "from-green-500 to-teal-600" },
        { name: "Kinh doanh", count: "567 sách", icon: "💼", gradient: "from-orange-500 to-red-600" },
        { name: "Thiếu nhi", count: "734 sách", icon: "🌟", gradient: "from-purple-500 to-pink-600" },
        { name: "Học thuật", count: "423 sách", icon: "🎓", gradient: "from-indigo-500 to-blue-600" },
        { name: "Lịch sử", count: "298 sách", icon: "📜", gradient: "from-yellow-500 to-orange-600" }
    ]

    return (
        <CustomerLayout>
            {/* Hero Section với hiệu ứng gradient và animation */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2 text-sm">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Cửa hàng sách hàng đầu Việt Nam
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                                Thế giới
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                                    tri thức
                                </span>
                                <span className="text-4xl md:text-6xl">đang chờ bạn</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Khám phá hàng nghìn cuốn sách hay với giá tốt nhất. Miễn phí giao hàng toàn quốc cho đơn hàng từ 200.000đ
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                Khám phá ngay
                                <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                            <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm">
                                Xem danh mục
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">5000+</div>
                                <div className="text-gray-300">Đầu sách</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">100k+</div>
                                <div className="text-gray-300">Khách hàng tin tưởng</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">24h</div>
                                <div className="text-gray-300">Giao hàng nhanh</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Tại sao chọn chúng tôi?</h2>
                        <p className="text-xl text-gray-600">Những ưu điểm vượt trội mà chúng tôi mang lại</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3">5000+ Đầu sách</h3>
                                <p className="text-gray-600">Đa dạng thể loại từ kinh điển đến hiện đại, đáp ứng mọi nhu cầu đọc sách</p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-green-50 to-emerald-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Truck className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3">Giao hàng siêu tốc</h3>
                                <p className="text-gray-600">Miễn phí ship từ 200k, giao hàng trong 24h với đội ngũ vận chuyển chuyên nghiệp</p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-violet-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3">100k+ Khách hàng</h3>
                                <p className="text-gray-600">Được tin tưởng bởi cộng đồng độc giả khắp Việt Nam với đánh giá 5 sao</p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-orange-50 to-red-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3">Chất lượng đảm bảo</h3>
                                <p className="text-gray-600">Sách chính hãng 100%, đổi trả trong 7 ngày nếu không hài lòng</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Danh mục sách hot</h2>
                        <p className="text-xl text-gray-600">Khám phá các thể loại sách được yêu thích nhất</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category, index) => (
                            <Card key={index} className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className={`bg-gradient-to-br ${category.gradient} p-8 text-center text-white relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                                        <div className="relative z-10">
                                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                                {category.icon}
                                            </div>
                                            <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                                            <p className="text-white/90 text-sm">{category.count}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Books */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-16">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sách bán chạy</h2>
                            <p className="text-xl text-gray-600">Những cuốn sách được độc giả yêu thích nhất</p>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6">
                            Xem tất cả
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredBooks.map((book) => (
                            <Card key={book.id} className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 space-y-2">
                                            <Badge className={`${book.badge === 'Bestseller' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                                book.badge === 'Hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                                    book.badge === 'New' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                                                        'bg-gradient-to-r from-blue-500 to-indigo-500'
                                                } text-white border-0 font-semibold`}>
                                                {book.badge}
                                            </Badge>
                                            <Badge className="bg-red-500 text-white border-0 font-bold">
                                                -{book.discount}
                                            </Badge>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <Button className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                                                    Xem chi tiết
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {book.title}
                                        </h3>
                                        <p className="text-gray-600 mb-3">{book.author}</p>

                                        <div className="flex items-center mb-4">
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm text-gray-600 ml-1 font-medium">{book.rating}</span>
                                            </div>
                                            <div className="flex items-center ml-auto">
                                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                                <span className="text-sm text-green-600 font-medium">Trending</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="text-2xl font-bold text-purple-600">{book.price}</div>
                                                <div className="text-sm text-gray-500 line-through">{book.originalPrice}</div>
                                            </div>
                                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6">
                                                Thêm vào giỏ
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter với thiết kế đặc biệt */}
            <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2">
                                <Award className="w-4 h-4 mr-2" />
                                Ưu đãi độc quyền
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Nhận tin tức & ưu đãi
                                <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                                    đặc biệt
                                </span>
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Đăng ký ngay để nhận thông tin sách mới, khuyến mãi hấp dẫn và các sự kiện đặc biệt dành riêng cho bạn
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="flex-1 px-6 py-4 rounded-full border-0 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold">
                                Đăng ký ngay
                            </Button>
                        </div>

                        <p className="text-sm text-gray-400">
                            💝 Nhận ngay mã giảm giá 15% cho lần mua đầu tiên
                        </p>
                    </div>
                </div>
            </section>
        </CustomerLayout>
    );
};

export default HomePage;