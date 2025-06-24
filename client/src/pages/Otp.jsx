import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, CheckCircle, RotateCcw } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { otpForgot } from '../services/Customer/ApiAuth';


const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleInputChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('').concat(['', '', '', '', '', '']).slice(0, 6);
            setOtp(newOtp);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            toast.error("Vui lòng nhập đầy đủ 6 số");
            return;
        }

        setIsLoading(true);

        try {
            if (!otpString) {
                return toast.error("Vui Lòng Nhập OTP")
            }
            const res = await otpForgot(otpString, email);
            if (res.data && res.data.code === 200) {
                navigate('/reset-password', { state: { email } })
            } else if (res.data && res.data.code === 400) {
                toast.error("Mã OTP Không Đúng")
            } else if (res.data && res.data.code === 401) {
                toast.error("Email Không Tồn Tại")
            } else {
                toast.error("Gửi OTP Thất Bại")
            }
            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }


    };

    const handleResendOTP = () => {
        setTimeLeft(300);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        // Simulate resend API call here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-4 text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Nhập mã OTP
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-2">
                                Mã xác thực đã được gửi đến
                                <br />
                                <span className="font-medium text-gray-800">{email}</span>
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-center space-x-3">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => inputRefs.current[index] = el}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                                        />
                                    ))}
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Mã sẽ hết hạn sau: <span className="font-medium text-red-600">{formatTime(timeLeft)}</span>
                                    </p>

                                    {canResend ? (
                                        <button
                                            type="button"
                                            onClick={handleResendOTP}
                                            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            <span>Gửi lại mã OTP</span>
                                        </button>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Chưa nhận được mã?{' '}
                                            <span className="text-gray-400">Vui lòng đợi {formatTime(timeLeft)}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={otp.join('').length !== 6 || isLoading}
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Đang xác thực...</span>
                                    </div>
                                ) : (
                                    'Xác thực OTP'
                                )}
                            </Button>
                        </form>

                        <div className="pt-4 border-t border-gray-200">
                            <Link
                                to="/forgot-password"
                                className="flex items-center justify-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Quay lại</span>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Otp;