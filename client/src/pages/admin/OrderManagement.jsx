import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Edit, Filter } from 'lucide-react';

const OrderManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    // Sample data based on your Order model
    const orders = [
        {
            id: '1',
            userId: '1',
            userEmail: 'nguyenvana@email.com',
            items: [
                { bookId: '1', bookTitle: 'Đắc Nhân Tâm', quantity: 2, price: 120000 },
                { bookId: '2', bookTitle: 'Nhà Giả Kim', quantity: 1, price: 85000 }
            ],
            status: 'paid',
            totalPrice: 325000,
            shippingInfo: {
                recipient: 'Nguyễn Văn A',
                phone: '0901234567',
                address: '123 Nguyễn Huệ, Q1, TP.HCM'
            },
            paymentId: 'PAY_123456',
            createdAt: '2024-01-20',
            updatedAt: '2024-01-20'
        },
        {
            id: '2',
            userId: '3',
            userEmail: 'lequangc@email.com',
            items: [
                { bookId: '3', bookTitle: 'Tư Duy Nhanh Và Chậm', quantity: 1, price: 200000 }
            ],
            status: 'shipped',
            totalPrice: 200000,
            shippingInfo: {
                recipient: 'Lê Quang C',
                phone: '0912345678',
                address: '789 Võ Văn Tần, Q1, TP.HCM'
            },
            paymentId: 'PAY_789012',
            createdAt: '2024-01-18',
            updatedAt: '2024-01-19'
        },
        {
            id: '3',
            userId: '1',
            userEmail: 'nguyenvana@email.com',
            items: [
                { bookId: '2', bookTitle: 'Nhà Giả Kim', quantity: 3, price: 85000 }
            ],
            status: 'pending',
            totalPrice: 255000,
            shippingInfo: {
                recipient: 'Nguyễn Văn A',
                phone: '0901234567',
                address: '123 Nguyễn Huệ, Q1, TP.HCM'
            },
            createdAt: '2024-01-22',
            updatedAt: '2024-01-22'
        }
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingInfo.recipient.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        let matchesDate = true;
        if (dateFilter !== 'all') {
            const orderDate = new Date(order.createdAt);
            const now = new Date();
            const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

            switch (dateFilter) {
                case 'today':
                    matchesDate = daysDiff === 0;
                    break;
                case 'week':
                    matchesDate = daysDiff <= 7;
                    break;
                case 'month':
                    matchesDate = daysDiff <= 30;
                    break;
            }
        }

        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: { variant: 'secondary', text: 'Chờ xử lý' },
            paid: { variant: 'default', text: 'Đã thanh toán' },
            shipped: { variant: 'default', text: 'Đã gửi hàng' },
            completed: { variant: 'default', text: 'Hoàn thành' },
            cancelled: { variant: 'destructive', text: 'Đã hủy' }
        };

        const statusInfo = statusMap[status]
        return <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>;
    };
    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Tìm kiếm đơn hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="pending">Chờ xử lý</SelectItem>
                                <SelectItem value="paid">Đã thanh toán</SelectItem>
                                <SelectItem value="shipped">Đã gửi hàng</SelectItem>
                                <SelectItem value="completed">Hoàn thành</SelectItem>
                                <SelectItem value="cancelled">Đã hủy</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={dateFilter} onValueChange={setDateFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Thời gian" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="today">Hôm nay</SelectItem>
                                <SelectItem value="week">7 ngày qua</SelectItem>
                                <SelectItem value="month">30 ngày qua</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Danh sách đơn hàng ({filteredOrders.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mã đơn</TableHead>
                                <TableHead>Khách hàng</TableHead>
                                <TableHead>Sản phẩm</TableHead>
                                <TableHead>Tổng giá</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Ngày đặt</TableHead>
                                <TableHead>Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">#{order.id}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{order.shippingInfo.recipient}</div>
                                            <div className="text-sm text-gray-600">{order.userEmail}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="text-sm">
                                                    {item.bookTitle} x{item.quantity}
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        ₫{order.totalPrice.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderManagement;