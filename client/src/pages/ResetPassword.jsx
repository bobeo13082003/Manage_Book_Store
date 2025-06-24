import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { reset } from '../services/Customer/ApiAuth';
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp");
            return;
        }

        if (password.length < 8) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setIsLoading(false);

        try {
            const res = await reset(email, password);
            if (res.data && res.data.code === 200) {
                toast.success("Cập Nhật Mật khẩu Thành Công");
                setIsSuccess(true);
                navigate('/login')
            } else {
                toast.error("Cập Nhật Mật Khẩu Thất Bại")
            }
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }


    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-8 text-center space-y-6">
                            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Đặt mật khẩu thành công!</h3>
                                <p className="text-gray-600">
                                    Mật khẩu mới đã được tạo thành công.
                                    <br />
                                    Đang chuyển về trang chủ...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-4 text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Tạo mật khẩu mới
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-2">
                                Nhập mật khẩu mới cho tài khoản của bạn
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700 font-medium">
                                    Mật khẩu mới
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nhập mật khẩu mới..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                                    Xác nhận mật khẩu
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Nhập lại mật khẩu..."
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="text-red-500 text-sm">Mật khẩu không khớp</p>
                                )}
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-blue-800 mb-2">
                                    Yêu cầu mật khẩu:
                                </p>
                                <ul className="text-xs text-blue-700 space-y-1">
                                    <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
                                        • Ít nhất 8 ký tự {password.length >= 8 && '✓'}
                                    </li>
                                    <li className={`flex items-center ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-green-600' : ''}`}>
                                        • Chứa chữ hoa và chữ thường {/[A-Z]/.test(password) && /[a-z]/.test(password) && '✓'}
                                    </li>
                                    <li className={`flex items-center ${/\d/.test(password) ? 'text-green-600' : ''}`}>
                                        • Có ít nhất 1 số {/\d/.test(password) && '✓'}
                                    </li>
                                </ul>
                            </div>

                            <Button
                                type="submit"
                                disabled={!password || !confirmPassword || password !== confirmPassword || password.length < 8 || isLoading}
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Đang tạo mật khẩu...</span>
                                    </div>
                                ) : (
                                    'Tạo mật khẩu mới'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResetPassword;