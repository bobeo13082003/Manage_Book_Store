import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { customerVerify } from "../services/Customer/ApiAuth";
const LoadingVerify = () => {
    const [status, setStatus] = useState(false);
    const { email } = useParams()
    const verifyAccount = async () => {
        try {
            const res = await customerVerify(email);
            if (res.data && res.data.code === 200) {
                toast.success("Xác Thực Tài Khoản Thành Công")
                setStatus(true)
            } else if (res.data && res.data.code === 402) {
                toast.error("Email Không Tồn Tại")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const timer = setTimeout(verifyAccount, 5000);
        return () => clearTimeout(timer);
    }, [email])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
            {/* Logo nhỏ */}
            <div className="flex items-center space-x-3 mb-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">📚</span>
                </div>
                <span className="text‑3xl font‑bold bg‑clip‑text text‑transparent bg‑gradient‑to‑r from‑purple‑600 to‑pink‑600">
                    BookStore
                </span>
            </div>

            {/* Nội dung chính */}
            {status === false && (
                <>
                    <Loader2 className="w-16 h-16 animate-spin text-purple-600 mb-6" />
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Đang xác thực tài khoản...
                    </h1>
                    <p className="text-gray-500 mt-2 text-center max-w-xs">
                        Vui lòng chờ vài giây. Đừng đóng trang này. Chúng tôi đang xử lý
                        token xác thực của bạn.
                    </p>
                </>
            )}

            {status === true && (
                <>
                    <h1 className="text-2xl font-semibold text-green-600">
                        ✅ Xác thực thành công!
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Chuyển đến trang đăng nhập...
                    </p>
                </>
            )}

        </div>
    );
};

export default LoadingVerify;