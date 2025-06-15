import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, Mail, RefreshCw, ArrowLeft } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from 'react';
import { customerResendOtp } from '../services/Customer/ApiAuth';
import { toast } from 'react-toastify';

const VerifyAccount = () => {
    const [isResending, setIsResending] = useState(false)
    const { email } = useParams()
    const navigate = useNavigate();
    const handleResendEmail = async () => {
        setIsResending(true)
        if (!email) {
            toast.error("Không Tìm Thấy Email");
            navigate(-1)
            return;
        }
        try {
            const res = await customerResendOtp(email);

            if (res.data && res.data.code === 200) {
                toast.success("Gửi Lại Xác Thực Thành Công")

            } else if (res.data && res.data.code === 400) {
                toast.error("Tài Khoản Đã Được Xác Thực");
                navigate('/login');
            } else {
                toast.error(`Không thể gửi OTP`);
            }
            setIsResending(false)
        } catch (error) {
            toast.error("Không thể kết nối tới server");
            console.log(error);
            setIsResending(false)


        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-6">
                {/* Logo */}
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">📚</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BookStore</span>
                    </Link>
                </div>

                {/* Main Card */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Clock className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Chờ xác thực tài khoản
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="text-center space-y-3">
                            <p className="text-gray-600">
                                Chúng tôi đã gửi email xác thực đến địa chỉ:
                            </p>
                            <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                <Mail className="w-4 h-4 text-purple-600" />
                                <span className="font-medium text-gray-800">{email}</span>
                            </div>
                        </div>

                        <Alert className="border-blue-200 bg-blue-50">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <AlertDescription className="text-blue-800">
                                Vui lòng kiểm tra email và nhấn vào liên kết xác thực để kích hoạt tài khoản.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800">Hướng dẫn:</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start space-x-2">
                                    <span className="text-purple-600 font-bold">1.</span>
                                    <span>Kiểm tra hộp thư đến trong email của bạn</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-purple-600 font-bold">2.</span>
                                    <span>Tìm email từ BookStore với tiêu đề "Xác thực tài khoản"</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-purple-600 font-bold">3.</span>
                                    <span>Nhấn vào liên kết "Xác thực tài khoản" trong email</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-purple-600 font-bold">4.</span>
                                    <span>Quay lại trang web để đăng nhập</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={handleResendEmail}
                                disabled={isResending}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                                {isResending ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Đang gửi lại...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-4 h-4 mr-2" />
                                        Gửi lại email xác thực
                                    </>
                                )}
                            </Button>

                            <Link to="/login" className="block">
                                <Button variant="outline" className="w-full">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Quay lại đăng nhập
                                </Button>
                            </Link>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-gray-500">
                                Không nhận được email? Kiểm tra thư mục spam hoặc liên hệ{" "}
                                <a href="#" className="text-purple-600 hover:underline">
                                    hỗ trợ khách hàng
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Info */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Cần hỗ trợ?{" "}
                        <a href="#" className="text-purple-600 hover:underline">
                            Liên hệ với chúng tôi
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;