import React from 'react';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, Heart, ArrowRight, Gift, Percent } from "lucide-react"
import CustomerLayout from '../components/CustomerLayout';
const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Đắc Nhân Tâm",
            author: "Dale Carnegie",
            price: 120000,
            originalPrice: 150000,
            quantity: 2,
            image: "/placeholder.svg",
            inStock: true
        },
        {
            id: 2,
            title: "Atomic Habits",
            author: "James Clear",
            price: 180000,
            originalPrice: 200000,
            quantity: 1,
            image: "/placeholder.svg",
            inStock: true
        },
        {
            id: 3,
            title: "Sapiens: Lược sử loài người",
            author: "Yuval Noah Harari",
            price: 220000,
            originalPrice: 250000,
            quantity: 1,
            image: "/placeholder.svg",
            inStock: false
        }
    ])

    const [promoCode, setPromoCode] = useState("")

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            setCartItems(cartItems.filter(item => item.id !== id))
        } else {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ))
        }
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 300000 ? 0 : 30000
    const discount = 25000 // Giảm giá từ mã khuyến mãi
    const total = subtotal + shipping - discount
    return (
        <CustomerLayout>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Giỏ hàng của bạn
                        </h1>
                        <p className="text-gray-600">
                            Bạn có {cartItems.length} sản phẩm trong giỏ hàng
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingCart className="w-16 h-16 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Giỏ hàng trống</h2>
                            <p className="text-gray-600 mb-8">Hãy khám phá những cuốn sách tuyệt vời của chúng tôi!</p>
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-8">
                                Tiếp tục mua sắm
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-6">
                                {cartItems.map((item) => (
                                    <Card key={item.id} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                                                <div className="w-full md:w-32 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                                                    <span className="text-4xl">📚</span>
                                                </div>

                                                <div className="flex-1 space-y-4">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
                                                        <p className="text-gray-600">Tác giả: {item.author}</p>
                                                        {!item.inStock && (
                                                            <Badge className="bg-red-100 text-red-700 mt-2">Hết hàng</Badge>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-2xl font-bold text-purple-600">
                                                                    {item.price.toLocaleString()}đ
                                                                </span>
                                                                <span className="text-lg text-gray-400 line-through">
                                                                    {item.originalPrice.toLocaleString()}đ
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    className="h-10 w-10 hover:bg-purple-50"
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </Button>
                                                                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="h-10 w-10 hover:bg-purple-50"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </Button>
                                                            </div>

                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                            >
                                                                <Heart className="w-5 h-5" />
                                                            </Button>

                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Promo Code */}
                                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <Percent className="w-5 h-5 text-purple-600" />
                                            <h3 className="text-lg font-semibold text-gray-900">Mã khuyến mãi</h3>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Input
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                placeholder="Nhập mã khuyến mãi..."
                                                className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                                            />
                                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6">
                                                Áp dụng
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Order Summary */}
                            <div className="space-y-6">
                                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm sticky top-24">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                                            <Gift className="w-6 h-6 text-purple-600" />
                                            <span>Tóm tắt đơn hàng</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Tạm tính:</span>
                                                <span>{subtotal.toLocaleString()}đ</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Phí vận chuyển:</span>
                                                <span>{shipping === 0 ? "Miễn phí" : shipping.toLocaleString() + "đ"}</span>
                                            </div>
                                            <div className="flex justify-between text-green-600">
                                                <span>Giảm giá:</span>
                                                <span>-{discount.toLocaleString()}đ</span>
                                            </div>

                                            <Separator />

                                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                                <span>Tổng cộng:</span>
                                                <span className="text-purple-600">{total.toLocaleString()}đ</span>
                                            </div>
                                        </div>

                                        {shipping > 0 && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                <p className="text-sm text-blue-700">
                                                    💡 Mua thêm {(300000 - subtotal).toLocaleString()}đ để được miễn phí vận chuyển!
                                                </p>
                                            </div>
                                        )}

                                        <div className="space-y-3 pt-4">
                                            <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                                                <span className="mr-2">Thanh toán</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                variant="outline"
                                                className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
                                            >
                                                Tiếp tục mua sắm
                                            </Button>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                                                <span>🔒 Thanh toán bảo mật</span>
                                                <span>📦 Giao hàng nhanh</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Actions */}
                                <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                                    <CardContent className="p-6 text-center">
                                        <h3 className="text-lg font-semibold mb-2">Gợi ý cho bạn</h3>
                                        <p className="text-purple-100 text-sm mb-4">
                                            Khám phá thêm những cuốn sách hay trong cùng thể loại
                                        </p>
                                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                                            Xem gợi ý
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CustomerLayout>
    );
};

export default Cart;