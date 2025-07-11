import React from 'react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { customerLogin } from '../services/Customer/ApiAuth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../store/customer/authSlice';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                return toast.error("Email hoặc Mật khẩu không được để trống");
            }
            if (!isValidEmail(email)) {
                return toast.error("Định dạng email không hợp lệ");
            }
            const res = await customerLogin(email, password);
            if (res.data && res.data.code === 200) {
                const dataToken = {
                    accessToken: res.data?.accessToken,
                    refreshToken: res.data?.refreshToken
                };
                const decoded = jwtDecode(dataToken.accessToken);
                if (decoded?.role !== 1) {
                    return toast.error("Truy cập bị từ chối: Yêu cầu vai trò quản trị");
                }
                dispatch(login(dataToken));
                toast.success("Đăng nhập quản trị thành công");
                navigate("/admin");
            } else if (res.data) {
                const status = res.data.code;
                switch (status) {
                    case 400:
                        toast.error("Email không tồn tại");
                        break;
                    case 403:
                        toast.error("Mật khẩu không đúng");
                        break;
                    case 402:
                        toast.error("Tài khoản không tồn tại");
                        break;
                    case 401:
                        toast.error("Tài khoản chưa được xác thực");
                        navigate(`/verify/${email}`);
                        break;
                    default:
                        toast.error("Đăng nhập thất bại");
                        break;
                }
            } else {
                toast.error("Không thể kết nối đến máy chủ");
            }
        } catch (error) {
            toast.error("Không thể kết nối đến máy chủ");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-gray-800 via-blue-900 to-indigo-900">
            {/* Left side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">


                    <div className="text-center space-y-4">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Cổng Quản Trị</h1>
                        <p className="text-white/70">Đăng nhập để quản lý nền tảng</p>
                    </div>

                    <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-lg">
                        <CardContent className="p-6">
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white font-medium">Email Quản Trị</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="admin@domain.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 h-12 text-white bg-white/10 border-0 focus:ring-2 focus:ring-blue-400 placeholder-white/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-white font-medium">Mật Khẩu</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 pr-12 h-12 text-white bg-white/10 border-0 focus:ring-2 focus:ring-blue-400 placeholder-white/50"
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <Link to="/forgot-password" className="text-blue-300 hover:text-blue-200 text-sm">
                                        Quên Mật Khẩu?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                                >
                                    Đăng Nhập
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>

            {/* Right side - Branding */}
            <div className="flex-1 hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                <div className="text-center text-white space-y-6 p-12 max-w-lg">
                    <h2 className="text-4xl font-bold">Trung Tâm Quản Trị</h2>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="text-center">
                            <ShieldCheck className="w-10 h-10 mx-auto mb-2" />
                            <div className="text-2xl font-bold">An Toàn</div>
                            <div className="text-sm text-white/70">Kiểm soát truy cập nâng cao</div>
                        </div>
                        <div className="text-center">
                            <Sparkles className="w-10 h-10 mx-auto mb-2" />
                            <div className="text-2xl font-bold">Hiệu Quả</div>
                            <div className="text-sm text-white/70">Quản lý tối ưu</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;