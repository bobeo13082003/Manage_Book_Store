import { useState } from "react"
import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, Camera, Package, Heart, Settings } from "lucide-react"
import CustomerLayout from "../components/CustomerLayout";
const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState({
        name: "Nguyễn Văn An",
        email: "nguyenvanan@gmail.com",
        phone: "0901234567",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        birthday: "1990-01-01",
        bio: "Yêu thích đọc sách và khám phá tri thức mới"
    })

    const handleSave = () => {
        setIsEditing(false)
        // Simulate API call to save profile
    }

    const orders = [
        { id: "#ORD001", date: "2024-01-15", status: "Đã giao", total: "299,000đ", items: 3 },
        { id: "#ORD002", date: "2024-01-10", status: "Đang giao", total: "450,000đ", items: 2 },
        { id: "#ORD003", date: "2024-01-05", status: "Đã giao", total: "180,000đ", items: 1 },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-purple-100">
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                                <User className="w-16 h-16 text-white" />
                            </div>
                            <Button
                                size="icon"
                                className="absolute bottom-2 right-2 bg-white hover:bg-gray-50 text-gray-600 rounded-full shadow-lg"
                            >
                                <Camera className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                            <p className="text-gray-600 mb-4">{profile.email}</p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">

                                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                                    Đã xác thực
                                </Badge>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6"
                        >
                            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                            {isEditing ? "Lưu" : "Chỉnh sửa"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Information */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                                    <Settings className="w-6 h-6 text-purple-600" />
                                    <span>Thông tin cá nhân</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-gray-700 font-medium">Họ và tên</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="name"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                disabled={!isEditing}
                                                className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-700 font-medium">Số điện thoại</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="phone"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                disabled={!isEditing}
                                                className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="birthday" className="text-gray-700 font-medium">Ngày sinh</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="birthday"
                                                type="date"
                                                value={profile.birthday}
                                                onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                                                disabled={!isEditing}
                                                className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-gray-700 font-medium">Địa chỉ</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <Textarea
                                            id="address"
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            disabled={!isEditing}
                                            className="pl-10 pt-3 border-2 border-gray-200 focus:border-purple-500 rounded-xl resize-none"
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-gray-700 font-medium">Giới thiệu bản thân</Label>
                                    <Textarea
                                        id="bio"
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        disabled={!isEditing}
                                        className="border-2 border-gray-200 focus:border-purple-500 rounded-xl resize-none"
                                        rows={3}
                                    />
                                </div>

                                {isEditing && (
                                    <div className="flex space-x-4 pt-4">
                                        <Button
                                            onClick={handleSave}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-8"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Lưu thay đổi
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditing(false)}
                                            className="border-2 border-gray-200 hover:bg-gray-50 rounded-xl px-8"
                                        >
                                            Hủy
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Orders & Wishlist */}
                    <div className="space-y-8">
                        {/* Recent Orders */}
                        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                                    <Package className="w-6 h-6 text-purple-600" />
                                    <span>Đơn hàng gần đây</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-semibold text-purple-600">{order.id}</span>
                                            <Badge className={
                                                order.status === "Đã giao"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }>
                                                {order.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">{order.date}</p>
                                        <p className="text-sm text-gray-600">{order.items} sản phẩm - {order.total}</p>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-2 border-gray-200 hover:bg-gray-50 rounded-xl">
                                    Xem tất cả đơn hàng
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;