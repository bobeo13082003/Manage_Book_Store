import React from 'react';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, ArrowLeft, Mail, Lock, BookOpen, Sparkles, Shield, Star } from "lucide-react"
import { customerLogin } from '../services/Customer/ApiAuth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../store/customer/authSlice';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            if (!email || !password) {
                return toast.error("Email Hoặc Mật Khẩu Không Để Trống")
            }
            if (!isValidEmail(email)) {
                return toast.error("Email Không Đúng Định Dạng")
            }
            const res = await customerLogin(email, password);
            if (res.data && res.data.code === 200) {
                const dataToken = {
                    accessToken: res.data?.accessToken,
                    refreshToken: res.data?.refreshToken
                }
                dispatch(login(dataToken))
                toast.success("Đăng Nhập Thành Công")
                navigate('/')
            } else if (res.data) {
                const status = res.data.code;
                switch (status) {
                    case 400:
                        toast.error("Email Không Tồn Tại");
                        break;
                    case 403:
                        toast.error("Mật Khẩu Không Đúng");
                        break;
                    case 402:
                        toast.error("Tài Khoản Không Tồn Tại");
                        break;
                    case 401:
                        toast.error("Tài Khoản Chưa Xác Thực");
                        navigate(`/verify/${email}`);
                        break;
                    default:
                        toast.error("Đăng Nhập Thất Bại");
                        break;
                }
            } else {
                toast.error("Không thể kết nối đến máy chủ");
            }
        } catch (error) {
            toast.error("Không thể kết nối đến máy chủ");
            console.log(error);

        }
    }
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
            {/* Left side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 relative">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-40 left-40 w-24 h-24 bg-pink-500/30 rounded-full blur-lg animate-pulse delay-1000"></div>
                    <div className="absolute top-60 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
                </div>

                <div className="w-full max-w-md space-y-8 relative z-10">
                    {/* Back to home button */}
                    <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Quay về trang chủ
                    </Link>

                    <div className="text-center space-y-6">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transform hover:scale-105 transition-transform">
                            <BookOpen className="w-12 h-12 text-white" />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-white">Chào mừng trở lại!</h1>
                            <p className="text-white/70 text-lg">Đăng nhập để tiếp tục hành trình khám phá tri thức</p>
                        </div>
                    </div>

                    <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-xl">
                        <CardContent className="p-8">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-white font-medium text-base">Email</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-12 h-14 text-base border-0 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="password" className="text-white font-medium text-base">Mật khẩu</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-12 pr-14 h-14 text-base border-0 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm"
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-white/10 text-white/50 hover:text-white"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">

                                    <Link to="/forgot-password" className="text-purple-300 hover:text-purple-200 font-medium transition-colors">
                                        Quên mật khẩu?
                                    </Link>
                                </div>

                                <Button type="submit" className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Đăng nhập
                                </Button>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-white/20" />
                                    </div>
                                    <div className="relative flex justify-center text-sm uppercase">
                                        <span className="bg-transparent px-4 text-white/60 font-medium">Hoặc tiếp tục với</span>
                                    </div>
                                </div>

                                <div className="grid place-items-center  mt-6">
                                    <Button variant="outline" className="h-12 border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all">
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Google
                                    </Button>

                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center">
                        <p className="text-white/70">
                            Chưa có tài khoản?{" "}
                            <Link to="/register" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                                Đăng ký miễn phí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Hero Image */}
            <div className="flex-1 relative hidden lg:flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-indigo-500/30 backdrop-blur-sm" />

                <div className="relative z-10 text-center text-white space-y-8 p-12 max-w-lg">
                    <div className="space-y-6">
                        <div className="flex items-center justify-center space-x-2 mb-8">
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                        </div>

                        <h2 className="text-5xl font-bold leading-tight">
                            Hành trình
                            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                tri thức
                            </span>
                            <span className="block">bắt đầu từ đây</span>
                        </h2>

                        <p className="text-xl text-white/80 leading-relaxed">
                            Tham gia cộng đồng 100,000+ độc giả thông thái. Khám phá kho tàng tri thức vô tận với hàng nghìn cuốn sách chất lượng.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mt-12">
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <div className="text-3xl font-bold">5000+</div>
                            <div className="text-sm text-white/70">Đầu sách</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                                <Shield className="w-8 h-8" />
                            </div>
                            <div className="text-3xl font-bold">100k+</div>
                            <div className="text-sm text-white/70">Khách hàng</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div className="text-3xl font-bold">24h</div>
                            <div className="text-sm text-white/70">Giao hàng</div>
                        </div>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-3xl backdrop-blur-sm transform rotate-12 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-10 w-24 h-24 bg-pink-500/20 rounded-2xl transform -rotate-12 animate-pulse delay-500"></div>
            </div>
        </div>
    );
};

export default Login;