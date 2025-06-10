import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Eye, EyeOff, ArrowLeft, Check, User, Mail, Lock, Sparkles, Shield, Star } from "lucide-react"

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false
    })

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleRegister = (e) => {
        e.preventDefault()
        console.log("Register attempt:", formData)
        // Handle registration logic here
    }

    const passwordRequirements = [
        { text: "Ít nhất 8 ký tự", met: formData.password.length >= 8 },
        { text: "Có chữ hoa và chữ thường", met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) },
        { text: "Có ít nhất 1 số", met: /\d/.test(formData.password) },
    ]
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Back to home button */}
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 group transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Quay về trang chủ
                </Link>

                <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-xl">
                    <CardHeader className="text-center pb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                            <Sparkles className="text-white font-bold text-2xl w-10 h-10" />
                        </div>
                        <CardTitle className="text-3xl font-bold text-white">Tạo tài khoản</CardTitle>
                        <CardDescription className="text-white/70 text-lg">
                            Tham gia cộng đồng độc giả thông thái
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 px-8 pb-8">
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="fullName" className="text-white font-medium">Họ và tên</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Nhập họ và tên"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                                        className="pl-12 h-12 border-0 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-white font-medium">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="pl-12 h-12 border-0 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="password" className="text-white font-medium">Mật khẩu</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Tạo mật khẩu"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        className="pl-12 pr-12 h-12 border-0 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-white/10 text-white/50 hover:text-white"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>

                                {/* Password requirements */}
                                {formData.password && (
                                    <div className="mt-3 space-y-2 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                                        <p className="text-white/80 text-sm font-medium mb-2">Yêu cầu mật khẩu:</p>
                                        {passwordRequirements.map((req, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500' : 'bg-white/20'} transition-colors`}>
                                                    {req.met && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <span className={`text-sm ${req.met ? 'text-green-300' : 'text-white/60'} transition-colors`}>
                                                    {req.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="confirmPassword" className="text-white font-medium">Xác nhận mật khẩu</Label>
                                <div className="relative group">
                                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Nhập lại mật khẩu"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                        className="pl-12 pr-12 h-12 border-0 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-white/10 text-white/50 hover:text-white"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="text-red-300 text-sm flex items-center">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                                        Mật khẩu không khớp
                                    </p>
                                )}
                            </div>

                            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                                <Label htmlFor="agreeTerms" className="text-white/90 text-sm leading-6">
                                    Tôi đồng ý với{" "}
                                    <Link to="/terms" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                                        Điều khoản sử dụng
                                    </Link>{" "}
                                    và{" "}
                                    <Link to="/privacy" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                                        Chính sách bảo mật
                                    </Link>
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                                disabled={!formData.agreeTerms || formData.password !== formData.confirmPassword}
                            >
                                <Star className="w-5 h-5 mr-2" />
                                Tạo tài khoản
                            </Button>
                        </form>

                        <div className="relative mt-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/20" />
                            </div>
                            <div className="relative flex justify-center text-sm uppercase">
                                <span className="bg-transparent px-4 text-white/60 font-medium">Hoặc đăng ký với</span>
                            </div>
                        </div>

                        <div className="grid px-6 place-items-center gap-4">
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

                        <div className="text-center mt-6">
                            <p className="text-white/70">
                                Đã có tài khoản?{" "}
                                <Link to="/login" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                                    Đăng nhập ngay
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;