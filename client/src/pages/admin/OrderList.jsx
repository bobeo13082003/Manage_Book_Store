import React, { useState, useEffect } from 'react';
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
import { Search, Filter, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { toast } from 'react-toastify';
import SearchableUserSelect from '../../components/SearchableUserSelect';
import { getOrder, updateStatusOrder } from '../../services/Admin/ApiOrder';

const OrderList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [userFilter, setUserFilter] = useState('all');
    const [orders, setOrders] = useState([]);
    const [loadingOrderId, setLoadingOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Fetch all orders
    const getAllOrders = async () => {
        setLoading(true);
        try {
            const res = await getOrder({ search: searchTerm, status: statusFilter, user: userFilter });
            if (res.status === 200) {
                setOrders(res.data.data || []);
            } else {
                toast.error('Không tải được danh sách đơn hàng');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Lỗi khi tải danh sách đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    // Update order status
    const handleStatusChange = async (orderId, newStatus) => {
        setLoadingOrderId(orderId);
        try {
            const res = await updateStatusOrder(orderId, newStatus);
            if (res.status === 200) {
                toast.success(`Cập nhật trạng thái đơn hàng #${orderId.slice(-8)} thành công`);
                await getAllOrders();
            } else {
                toast.error('Cập nhật trạng thái thất bại');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Lỗi khi cập nhật trạng thái');
        } finally {
            setLoadingOrderId(null);
        }
    };

    // Open order details modal
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    // Close order details modal
    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingInfo.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingInfo.phone.includes(searchTerm) ||
            order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.items.some(item => item.book.title.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesUser = userFilter === 'all' || order.user._id === userFilter;

        return matchesSearch && matchesStatus && matchesUser;
    });

    const totalPages = Math.ceil(filteredOrders.length / limit);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleLimitChange = (value) => {
        setLimit(parseInt(value));
        setCurrentPage(1);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, userFilter]);

    useEffect(() => {
        getAllOrders();
    }, [searchTerm, statusFilter, userFilter]);
    console.log(orders);

    const users = [...new Set(orders.map(order => ({
        id: order?.user?._id,
        name: order?.shippingInfo?.recipient,
        email: order?.user?.email,
    })))];

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: { variant: 'secondary', text: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
            paid: { variant: 'default', text: 'Đã thanh toán', color: 'bg-blue-100 text-blue-800' },
            shipped: { variant: 'default', text: 'Đã gửi hàng', color: 'bg-purple-100 text-purple-800' },
            completed: { variant: 'default', text: 'Hoàn thành', color: 'bg-green-100 text-green-800' },
            cancelled: { variant: 'destructive', text: 'Đã hủy', color: 'bg-red-100 text-red-800' },
        };

        const statusInfo = statusMap[status] || statusMap.pending;
        return <Badge className={statusInfo.color}>{statusInfo.text}</Badge>;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number' || isNaN(price)) return '0 ₫';
        return price.toLocaleString('vi-VN') + ' ₫';
    };

    console.log(orders);


    return (
        <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Tìm kiếm đơn hàng, khách hàng, sách..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-2 items-center">
                        <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <Select value={statusFilter} onValueChange={setStatusFilter} disabled={loading}>
                            <SelectTrigger className="w-40 bg-white dark:bg-slate-800">
                                <SelectValue placeholder="Trạng thái" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-slate-800">
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="pending">Chờ xử lý</SelectItem>
                                <SelectItem value="paid">Đã thanh toán</SelectItem>
                                <SelectItem value="shipped">Đã gửi hàng</SelectItem>
                                <SelectItem value="completed">Hoàn thành</SelectItem>
                                <SelectItem value="cancelled">Đã hủy</SelectItem>
                            </SelectContent>
                        </Select>

                        <SearchableUserSelect
                            users={users}
                            value={userFilter}
                            onChange={setUserFilter}
                            placeholder="Tìm khách hàng..."
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách đơn hàng ({filteredOrders.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">Đang tải...</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mã đơn</TableHead>
                                        <TableHead>Khách hàng</TableHead>
                                        <TableHead>Sản phẩm</TableHead>
                                        <TableHead>Tổng tiền</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                        <TableHead>Ngày đặt</TableHead>
                                        <TableHead>Thao tác</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedOrders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                                Không tìm thấy đơn hàng nào
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedOrders.map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell className="font-medium">#{order._id.slice(-8)}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{order?.shippingInfo?.recipient}</div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">{order?.user?.email}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-500">{order?.shippingInfo?.phone}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        {order.items.map((item, index) => (
                                                            <div key={index} className="text-sm">
                                                                <div className="font-medium">{item.book.title}</div>
                                                                <div className="text-gray-600 dark:text-gray-400">
                                                                    SL: {item.qty} × {formatPrice(item.unitPrice)}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-semibold">{formatPrice(order.totalPrice)}</TableCell>
                                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleViewDetails(order)}
                                                            title="Xem chi tiết"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        <Select
                                                            value={order.status}
                                                            onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)}
                                                            disabled={loadingOrderId === order._id || loading}
                                                        >
                                                            <SelectTrigger className="w-32 bg-white dark:bg-slate-800">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-white dark:bg-slate-800">
                                                                <SelectItem value="pending">Chờ xử lý</SelectItem>
                                                                <SelectItem value="paid">Đã thanh toán</SelectItem>
                                                                <SelectItem value="shipped">Đã gửi hàng</SelectItem>
                                                                <SelectItem value="completed">Hoàn thành</SelectItem>
                                                                <SelectItem value="cancelled">Đã hủy</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span>
                                <Select
                                    value={limit.toString()}
                                    onValueChange={handleLimitChange}
                                    disabled={loading}
                                >
                                    <SelectTrigger className="w-20 bg-white dark:bg-slate-800">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-slate-800">
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-gray-600 dark:text-gray-400">mục / trang</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || loading}
                                    title="Trang trước"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        disabled={loading}
                                    >
                                        {page}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || loading}
                                    title="Trang sau"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Trang {currentPage} / {totalPages}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                            {filteredOrders.filter(o => o.status === 'pending').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Chờ xử lý</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {filteredOrders.filter(o => o.status === 'completed').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Hoàn thành</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {filteredOrders.filter(o => o.status === 'shipped').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Đang giao</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {formatPrice(filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0))}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Tổng doanh thu</div>
                    </CardContent>
                </Card>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-2xl bg-white dark:bg-slate-800 max-h-[80vh] overflow-y-auto">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Chi tiết đơn hàng #{selectedOrder._id.slice(-8)}</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseModal}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                title="Đóng"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Thông tin khách hàng</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Họ tên</p>
                                        <p className="font-medium">{selectedOrder?.shippingInfo?.recipient || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                        <p className="font-medium">{selectedOrder?.user?.email || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Số điện thoại</p>
                                        <p className="font-medium">{selectedOrder?.shippingInfo?.phone || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Địa chỉ</p>
                                        <p className="font-medium">{selectedOrder.shippingInfo.address || 'Chưa cập nhật'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sản phẩm</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Sách</TableHead>
                                            <TableHead>Số lượng</TableHead>
                                            <TableHead>Đơn giá</TableHead>
                                            <TableHead>Tổng</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedOrder.items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.book.title}</TableCell>
                                                <TableCell>{item.qty}</TableCell>
                                                <TableCell>{formatPrice(item.unitPrice)}</TableCell>
                                                <TableCell>{formatPrice(item.qty * item.unitPrice)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Thông tin đơn hàng</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Mã đơn hàng</p>
                                        <p className="font-medium">#{selectedOrder._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Trạng thái</p>
                                        <p>{getStatusBadge(selectedOrder.status)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Ngày đặt</p>
                                        <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Tổng tiền</p>
                                        <p className="font-semibold text-green-600">{formatPrice(selectedOrder.totalPrice)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    onClick={handleCloseModal}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Đóng
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default OrderList;