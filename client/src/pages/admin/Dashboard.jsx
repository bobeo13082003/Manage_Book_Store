import React, { useEffect, useState } from 'react';
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
import {
    Book,
    Search,
    Plus,
    Edit,
    Trash2,
    Filter,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import BookManagement from './Book';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/customer/authSlice';
import { useNavigate } from 'react-router-dom';
import { allBook, deleteBook } from '../../services/Admin/ApiBook';
import OrderList from './OrderList';
import { toast } from 'react-toastify';
// import { getDashBoard } from '../../services/Admin/ApiDashBoard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('books');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    // const [year, setYear] = useState(new Date().getFullYear().toString());
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [books, setBooks] = useState([]);
    // const [ordersByMonth, setOrdersByMonth] = useState({ labels: [], data: [] });
    // const [stats, setStats] = useState({ totalOrders: 0, totalCustomers: 0 });
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const yearOptions = Array.from({ length: 21 }, (_, i) => (new Date().getFullYear() - 10 + i).toString());

    // const fetchDashboardData = async () => {
    //     setLoading(true);
    //     setFetchError(null);
    //     try {
    //         const res = await getDashBoard(year);
    //         if (res.status === 200) {
    //             setStats(res.data.stats);
    //             setOrdersByMonth(res.data.ordersByMonth);
    //         }
    //     } catch (err) {
    //         const message = err.response?.data?.message || 'Không thể tải dữ liệu dashboard';
    //         setFetchError(message);
    //         toast.error(message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const getAllBook = async () => {
        setLoading(true);
        setFetchError(null);
        try {
            const res = await allBook();
            const mappedBooks = res.data.map((book) => ({
                ...book,
                id: book._id,
            }));
            setBooks(mappedBooks || []);
        } catch (err) {
            const message = err.response?.data?.message || 'Không thể tải danh sách sách';
            setFetchError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // if (activeTab === 'dashboard') {
        //     fetchDashboardData();
        // } else if (activeTab === 'books') {
        //     getAllBook();
        // }
        getAllBook();
    }, [activeTab]); //[activeTab, year]

    const handleDeleteBook = async (bookId) => {
        if (window.confirm('Bạn có chắc muốn xóa sách này?')) {
            setLoading(true);
            try {
                await deleteBook(bookId);
                toast.success('Xóa sách thành công!');
                getAllBook();
            } catch (err) {
                const message = err.response?.data?.message || 'Không thể xóa sách';
                setFetchError(message);
                toast.error(message);
            } finally {
                setLoading(false);
            }
        }
    };

    const categories = [...new Set(books.map((b) => b.category?.name).filter(Boolean))];

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.authors.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || book.category?.name === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const totalPages = Math.ceil(filteredBooks.length / limit);
    const paginatedBooks = filteredBooks.slice((currentPage - 1) * limit, currentPage * limit);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleLimitChange = (value) => {
        setLimit(parseInt(value));
        setCurrentPage(1);
    };

    const handleAddBook = () => {
        setSelectedBook(null);
        setIsModalOpen(true);
    };

    const handleEditBook = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleLogout = async () => {
        dispatch(logout());
        navigate('/login');
    };

    // const handleResetYear = () => {
    //     setYear(new Date().getFullYear().toString());
    //     toast.info('Đã đặt lại năm về mặc định');
    // };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-100 text-green-800">Đang bán</Badge>;
            case 'inactive':
                return <Badge className="bg-yellow-100 text-yellow-800">Tạm ngừng</Badge>;
            default:
                return <Badge variant="secondary">Không xác định</Badge>;
        }
    };

    // const getOrdersByMonthChartData = () => ({
    //     labels: ordersByMonth.labels,
    //     datasets: [
    //         {
    //             label: 'Số lượng đơn hàng',
    //             data: ordersByMonth.data,
    //             backgroundColor: 'rgba(59, 130, 246, 0.6)',
    //             borderColor: 'rgba(59, 130, 246, 1)',
    //             borderWidth: 1,
    //         },
    //     ],
    // });

    // const renderDashboard = () => (
    //     <div className="space-y-6">
    //         <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
    //             <div className="flex gap-2 items-center">
    //                 <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
    //                 <Select value={year} onValueChange={setYear} disabled={loading}>
    //                     <SelectTrigger className="w-40">
    //                         <SelectValue placeholder="Chọn năm" />
    //                     </SelectTrigger>
    //                     <SelectContent
    //                         className="bg-white">
    //                         {yearOptions.map((y) => (
    //                             <SelectItem key={y} value={y}>
    //                                 {y}
    //                             </SelectItem>
    //                         ))}
    //                     </SelectContent>
    //                 </Select>
    //             </div>
    //             <Button
    //                 variant="outline"
    //                 onClick={handleResetYear}
    //                 disabled={loading}
    //                 aria-label="Đặt lại năm"
    //             >
    //                 <RotateCcw className="w-4 h-4 mr-2" />
    //                 Đặt lại
    //             </Button>
    //         </div>

    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //             {[
    //                 { title: 'Đơn hàng', value: stats.totalOrders, icon: ShoppingCart, color: 'text-green-600' },
    //                 { title: 'Khách hàng', value: stats.totalCustomers, icon: Users, color: 'text-purple-600' },
    //             ].map((stat, index) => (
    //                 <Card key={index} className="hover:shadow-lg transition-shadow">
    //                     <CardContent className="p-6">
    //                         <div className="flex items-center justify-between">
    //                             <div>
    //                                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
    //                                 <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
    //                             </div>
    //                             <stat.icon className={`w-8 h-8 ${stat.color}`} />
    //                         </div>
    //                     </CardContent>
    //                 </Card>
    //             ))}
    //         </div>

    //         <div className="grid grid-cols-1">
    //             <Card>
    //                 <CardHeader>
    //                     <CardTitle>
    //                         Đơn hàng theo tháng trong năm {year}
    //                     </CardTitle>
    //                 </CardHeader>
    //                 <CardContent>
    //                     {stats.totalOrders > 0 ? (
    //                         <Bar
    //                             data={getOrdersByMonthChartData()}
    //                             options={{
    //                                 scales: {
    //                                     y: {
    //                                         beginAtZero: true,
    //                                         title: { display: true, text: 'Số lượng đơn hàng' },
    //                                     },
    //                                     x: {
    //                                         title: { display: true, text: 'Tháng' },
    //                                     },
    //                                 },
    //                                 plugins: {
    //                                     legend: { display: false },
    //                                 },
    //                             }}
    //                         />
    //                     ) : (
    //                         <div className="text-center py-8 text-gray-500 dark:text-gray-400">
    //                             Không có dữ liệu đơn hàng để hiển thị trong năm {year}
    //                         </div>
    //                     )}
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     </div>
    // );

    const renderBooks = () => (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Tìm kiếm sách..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                            disabled={loading}
                            aria-label="Tìm kiếm sách"
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <Select value={statusFilter} onValueChange={setStatusFilter} disabled={loading}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="active">Đang bán</SelectItem>
                                <SelectItem value="inactive">Tạm ngừng</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter} disabled={loading}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả danh mục</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button
                    onClick={handleAddBook}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={loading}
                    aria-label="Thêm sách mới"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm sách mới
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Danh sách sách ({filteredBooks.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Đang tải...</div>
                    ) : fetchError ? (
                        <div className="text-center py-8 text-red-600 dark:text-red-400">{fetchError}</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sách</TableHead>
                                    <TableHead>Tác giả</TableHead>
                                    <TableHead>Danh mục</TableHead>
                                    <TableHead>Giá</TableHead>
                                    <TableHead>Tồn kho</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead>Đánh giá</TableHead>
                                    <TableHead>Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedBooks.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            Không tìm thấy sách nào
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedBooks.map((book) => (
                                        <TableRow key={book._id} className={book.status === 'inactive' ? 'opacity-60' : ''}>
                                            <TableCell className="font-medium">{book.title}</TableCell>
                                            <TableCell>{book.authors.join(', ')}</TableCell>
                                            <TableCell>{book.category?.name || 'Chưa có'}</TableCell>
                                            <TableCell>₫{book.price.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={book.stock === 0 ? 'destructive' : book.stock < 20 ? 'secondary' : 'default'}>
                                                    {book.stock}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(book.status)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-500">★</span>
                                                    <span>{book.avgRating || '0'}</span>
                                                    <span className="text-gray-500 dark:text-gray-400 text-sm">({book.numReviews || 0})</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditBook(book)}
                                                        disabled={loading}
                                                        title="Chỉnh sửa sách"
                                                        aria-label={`Chỉnh sửa sách ${book.title}`}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() => handleDeleteBook(book._id)}
                                                        disabled={loading}
                                                        title="Xóa sách"
                                                        aria-label={`Xóa sách ${book.title}`}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span>
                                <Select value={limit.toString()} onValueChange={handleLimitChange} disabled={loading}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                    aria-label="Trang trước"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        disabled={loading}
                                        aria-label={`Trang ${page}`}
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
                                    aria-label="Trang sau"
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
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
            <header className="bg-white dark:bg-slate-900 shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Book className="w-8 h-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">BookStore Admin</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button onClick={handleLogout} variant="outline" size="sm" aria-label="Đăng xuất">
                                Đăng xuất
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="bg-white dark:bg-slate-900 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {/* <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard'
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300'
                                }`}
                            aria-label="Tổng quan"
                        >
                            Tổng quan
                        </button> */}
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'books'
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300'
                                }`}
                            aria-label="Quản lý sách"
                        >
                            Quản lý sách
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orders'
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300'
                                }`}
                            aria-label="Tạo Đơn hàng"
                        >
                            Tạo Đơn hàng
                        </button>
                        <button
                            onClick={() => setActiveTab('orders-list')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orders-list'
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300'
                                }`}
                            aria-label="Danh Sách Đơn hàng"
                        >
                            Danh Sách Đơn hàng
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users'
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300'
                                }`}
                            aria-label="Người dùng"
                        >
                            Người dùng
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* {activeTab === 'dashboard' && renderDashboard()} */}
                    {activeTab === 'books' && renderBooks()}
                    {activeTab === 'orders' && <OrderManagement />}
                    {activeTab === 'orders-list' && <OrderList />}
                    {activeTab === 'users' && <UserManagement />}
                </div>
            </main>

            <BookManagement
                book={selectedBook}
                isOpen={isModalOpen}
                getAllBook={getAllBook}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedBook(null);
                }}
                onSave={(bookData) => {
                    console.log('Saving book:', bookData);
                    setIsModalOpen(false);
                    setSelectedBook(null);
                    getAllBook();
                }}
            />
        </div>
    );
};


export default Dashboard;