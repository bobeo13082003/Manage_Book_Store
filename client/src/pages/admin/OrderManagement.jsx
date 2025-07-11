
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderManagement = () => {
    // Dữ liệu mẫu cho danh sách sách
    const books = [
        { id: '1', title: 'Đắc Nhân Tâm', price: 120000 },
        { id: '2', title: 'Nhà Giả Kim', price: 85000 },
        { id: '3', title: 'Tư Duy Nhanh Và Chậm', price: 200000 },
    ];

    // Trạng thái biểu mẫu
    const [formData, setFormData] = useState({
        userEmail: '',
        recipient: '',
        phone: '',
        address: '',
        status: 'pending',
        items: [{ bookId: '', quantity: 1 }],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Tính tổng giá
    const totalPrice = formData.items.reduce((total, item) => {
        const book = books.find(b => b.id === item.bookId);
        return total + (book ? book.price * item.quantity : 0);
    }, 0);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý thay đổi item (sách)
    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData(prev => ({ ...prev, items: newItems }));
    };

    // Thêm item mới
    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { bookId: '', quantity: 1 }],
        }));
    };

    // Xóa item
    const removeItem = (index) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    // Xử lý gửi biểu mẫu
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Kiểm tra dữ liệu
        if (!formData.userEmail || !formData.recipient || !formData.phone || !formData.address) {
            setError('Vui lòng điền đầy đủ thông tin khách hàng.');
            toast.error('Vui lòng điền đầy đủ thông tin khách hàng.');
            setIsLoading(false);
            return;
        }

        if (formData.items.length === 0 || formData.items.some(item => !item.bookId || item.quantity <= 0)) {
            setError('Vui lòng chọn ít nhất một sách và số lượng hợp lệ.');
            toast.error('Vui lòng chọn ít nhất một sách và số lượng hợp lệ.');
            setIsLoading(false);
            return;
        }

        // Tạo FormData
        const fd = new FormData();
        fd.append('userEmail', formData.userEmail);
        fd.append('recipient', formData.recipient);
        fd.append('phone', formData.phone);
        fd.append('address', formData.address);
        fd.append('status', formData.status);
        formData.items.forEach((item, index) => {
            fd.append(`items[${index}][bookId]`, item.bookId);
            fd.append(`items[${index}][quantity]`, item.quantity);
        });

        try {
            // const res = await createOrder(fd);
            // if (res.status === 201) {
            //     toast.success('Tạo đơn hàng thành công!');
            //     setFormData({
            //         userEmail: '',
            //         recipient: '',
            //         phone: '',
            //         address: '',
            //         status: 'pending',
            //         items: [{ bookId: '', quantity: 1 }],
            //     });
            // }
        } catch (err) {
            setError('Tạo đơn hàng thất bại.');
            toast.error('Tạo đơn hàng thất bại: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Tạo đơn hàng mới</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Thông tin khách hàng */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Thông tin khách hàng</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="userEmail">Email khách hàng</Label>
                                    <Input
                                        id="userEmail"
                                        name="userEmail"
                                        value={formData.userEmail}
                                        onChange={handleInputChange}
                                        placeholder="Nhập email khách hàng"
                                        className="bg-white dark:bg-slate-800"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="recipient">Tên người nhận</Label>
                                    <Input
                                        id="recipient"
                                        name="recipient"
                                        value={formData.recipient}
                                        onChange={handleInputChange}
                                        placeholder="Nhập tên người nhận"
                                        className="bg-white dark:bg-slate-800"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Nhập số điện thoại"
                                        className="bg-white dark:bg-slate-800"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="address">Địa chỉ giao hàng</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Nhập địa chỉ giao hàng"
                                        className="bg-white dark:bg-slate-800"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Danh sách sách */}
                        <div className="space-y-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Sản phẩm</h3>
                            {formData.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Label htmlFor={`book-${index}`}>Chọn sách</Label>
                                        <Select
                                            value={item.bookId}
                                            onValueChange={(value) => handleItemChange(index, 'bookId', value)}
                                        >
                                            <SelectTrigger
                                                id={`book-${index}`}
                                                className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
                                            >
                                                <SelectValue placeholder="Chọn sách" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600">
                                                {books.map(book => (
                                                    <SelectItem key={book.id} value={book.id}>
                                                        {book.title} - ₫{book.price.toLocaleString()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-24">
                                        <Label htmlFor={`quantity-${index}`}>Số lượng</Label>
                                        <Input
                                            id={`quantity-${index}`}
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                                            className="bg-white dark:bg-slate-800"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeItem(index)}
                                        disabled={formData.items.length === 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addItem}>
                                Thêm sách
                            </Button>
                        </div>

                        {/* Trạng thái đơn hàng */}
                        <div>
                            <Label htmlFor="status">Trạng thái đơn hàng</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                            >
                                <SelectTrigger
                                    id="status"
                                    className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
                                >
                                    <SelectValue placeholder="Chọn trạng thái" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600">
                                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                                    <SelectItem value="shipped">Đã gửi hàng</SelectItem>
                                    <SelectItem value="completed">Hoàn thành</SelectItem>
                                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tổng giá */}
                        <div className="text-lg font-semibold">
                            Tổng giá: ₫{totalPrice.toLocaleString()}
                        </div>

                        {/* Thông báo lỗi */}
                        {error && <div className="text-red-500">{error}</div>}

                        {/* Nút gửi */}
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50" disabled={isLoading}>
                            {isLoading ? 'Đang xử lý...' : 'Tạo đơn hàng'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderManagement;
