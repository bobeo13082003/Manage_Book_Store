import React from 'react';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { forgot } from '../services/Customer/ApiAuth';
import { toast } from 'react-toastify';
const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error("Vui lòng nhập email",
            );
            return;
        }
        try {
            if (!email) {
                return toast.error("Vui Lòng Nhập Email")
            }
            const res = await forgot(email);
            if (res.data && res.data.code === 200) {
                navigate(`/otp`, { state: { email } });
            } else if (res.data && res.data.code === 401) {
                toast.error("Email Không Tồn Tại")
            }

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-4 text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Quên mật khẩu?
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-2">
                                Nhập email của bạn để nhận liên kết đặt lại mật khẩu
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 font-medium">
                                    Địa chỉ email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Nhập email của bạn..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                Gửi liên kết đặt lại
                            </Button>
                        </form>


                        <div className="pt-4 border-t border-gray-200">
                            <Link
                                to="/login"
                                className="flex items-center justify-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Quay lại đăng nhập</span>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPassword;