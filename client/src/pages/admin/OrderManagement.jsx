import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { allBook, allUser, createOrder } from '../../services/Admin/ApiOrder';



const OrderManagement = () => {
    // Trạng thái biểu mẫu
    const [formData, setFormData] = useState({
        customerId: '',
        userEmail: '',
        recipient: '',
        phone: '',
        address: '',
        status: 'pending',
        items: [{ bookId: '', quantity: 1 }],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [phoneSearch, setPhoneSearch] = useState('');
    const [bookSearch, setBookSearch] = useState('');
    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);

    // Lọc khách hàng dựa trên số điện thoại
    const filteredCustomers = useMemo(() => {
        return customers.filter(customer =>
            customer.phone.toLowerCase().includes(phoneSearch.toLowerCase()) ||
            customer.username.toLowerCase().includes(phoneSearch.toLowerCase())
        );
    }, [phoneSearch, customers]);

    // Lọc sách dựa trên tiêu đề
    const filteredBooks = useMemo(() => {
        return books.filter(book =>
            book.title.toLowerCase().includes(bookSearch.toLowerCase())
        );
    }, [bookSearch, books]);

    // Tính tổng giá
    const totalPrice = formData.items.reduce((total, item) => {
        const book = books.find(b => b.id === item.bookId);
        return total + (book ? book.price * item.quantity : 0);
    }, 0);

    // Xử lý chọn khách hàng
    const handleCustomerChange = (customerId) => {
        const customer = customers.find(c => c.id === customerId);
        if (customer) {
            setFormData(prev => ({
                ...prev,
                customerId,
                userEmail: customer.email,
                recipient: customer.username,
                phone: customer.phone,
                address: customer.address,
            }));
        }
    };

    const getAllUser = async () => {
        try {
            const res = await allUser();
            setCustomers(res.data)
        } catch (err) {
            console.error(err);
            toast.error("Không lấy được danh sách người dùng");
        }
    }

    const getAllBook = async () => {
        try {
            const res = await allBook();
            setBooks(res.data)
        } catch (err) {
            console.error(err);
            toast.error("Không lấy được danh sách sách");
        }
    }


    useEffect(() => {
        getAllUser();
        getAllBook();
    }, []);



    // Xử lý thay đổi item (sách)
    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        const bookId = newItems[index].bookId || '';
        const selectedBook = books.find(b => b.id === (field === 'bookId' ? value : bookId));

        if (field === 'quantity') {
            const quantity = parseInt(value);
            if (selectedBook && quantity > selectedBook.stock) {
                toast.error(`Số lượng vượt quá tồn kho (${selectedBook.stock})`);
                return;
            }
            newItems[index][field] = quantity;
        } else {
            newItems[index][field] = value;
        }

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

        if (formData.items.length === 0 || formData.items.some(item => !item.bookId || item.quantity <= 0)) {
            setError('Vui lòng chọn ít nhất một sách và số lượng hợp lệ.');
            toast.error('Vui lòng chọn ít nhất một sách và số lượng hợp lệ.');
            setIsLoading(false);
            return;
        }

        try {
            const res = await createOrder(formData);
            if (res.status === 201) {
                toast.success('Tạo đơn hàng thành công!');
                setFormData({
                    customerId: '',
                    userEmail: '',
                    recipient: '',
                    phone: '',
                    address: '',
                    status: 'pending',
                    items: [{ bookId: '', quantity: 1 }],
                });
                setPhoneSearch('');
                setBookSearch('');
            }
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
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <Label htmlFor="phoneSearch">Tìm khách hàng (số điện thoại hoặc tên)</Label>
                                    <Input
                                        id="phoneSearch"
                                        value={phoneSearch}
                                        onChange={(e) => setPhoneSearch(e.target.value)}
                                        placeholder="Nhập số điện thoại hoặc tên khách hàng"
                                        className="bg-white dark:bg-slate-800"
                                    />
                                    <Select
                                        value={formData.customerId}
                                        onValueChange={handleCustomerChange}
                                    >
                                        <SelectTrigger
                                            className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 mt-2"
                                        >
                                            <SelectValue placeholder="Chọn khách hàng" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600">
                                            {filteredCustomers.map(customer => (
                                                <SelectItem key={customer.id} value={customer.id}>
                                                    {customer.username} - {customer.phone}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="userEmail">Email khách hàng</Label>
                                        <Input
                                            id="userEmail"
                                            name="userEmail"
                                            value={formData.userEmail}
                                            readOnly
                                            className="bg-gray-100 dark:bg-slate-700"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="recipient">Tên người nhận</Label>
                                        <Input
                                            id="recipient"
                                            name="recipient"
                                            value={formData.recipient}
                                            readOnly
                                            className="bg-gray-100 dark:bg-slate-700"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Số điện thoại</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            readOnly
                                            className="bg-gray-100 dark:bg-slate-700"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="address">Địa chỉ giao hàng</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            readOnly
                                            className="bg-gray-100 dark:bg-slate-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Danh sách sách */}
                        <div className="space-y-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Sản phẩm</h3>
                            <div>
                                <Label htmlFor="bookSearch">Tìm sách</Label>
                                <Input
                                    id="bookSearch"
                                    value={bookSearch}
                                    onChange={(e) => setBookSearch(e.target.value)}
                                    placeholder="Nhập tên sách"
                                    className="bg-white dark:bg-slate-800"
                                />
                            </div>
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
                                                {filteredBooks.map(book => (
                                                    <SelectItem key={book.id} value={book.id} disabled={book.stock === 0}>
                                                        {book.title} - ₫{book.price.toLocaleString()} {book.stock === 0 ? '(Hết hàng)' : `(Còn: ${book.stock})`}
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
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
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