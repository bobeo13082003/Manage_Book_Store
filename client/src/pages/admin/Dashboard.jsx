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
import {
    Book,
    ShoppingCart,
    Users,
    DollarSign,
    Search,
    Plus,
    Edit,
    Trash2,
    Filter
} from 'lucide-react';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import BookManagement from './Book';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample data with enhanced structure based on your models
    const stats = [
        { title: 'Tổng sách', value: '1,234', icon: Book, color: 'text-blue-600' },
        { title: 'Đơn hàng hôm nay', value: '89', icon: ShoppingCart, color: 'text-green-600' },
        { title: 'Khách hàng', value: '456', icon: Users, color: 'text-purple-600' },
        { title: 'Doanh thu tháng', value: '₫15.2M', icon: DollarSign, color: 'text-orange-600' },
    ];

    const books = [
        {
            id: '1',
            title: 'Đắc Nhân Tâm',
            slug: 'dac-nhan-tam',
            description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử',
            price: 120000,
            stock: 50,
            coverUrl: '',
            authors: ['Dale Carnegie'],
            category: 'Tâm lý học',
            tags: ['tâm lý', 'kỹ năng sống', 'giao tiếp'],
            status: 'active',
            avgRating: 4.5,
            numReviews: 245,
            createdAt: '2024-01-15',
            updatedAt: '2024-01-15'
        },
        {
            id: '2',
            title: 'Nhà Giả Kim',
            slug: 'nha-gia-kim',
            description: 'Câu chuyện về hành trình tìm kiếm ước mơ',
            price: 85000,
            stock: 30,
            coverUrl: '',
            authors: ['Paulo Coelho'],
            category: 'Tiểu thuyết',
            tags: ['tiểu thuyết', 'triết học', 'ước mơ'],
            status: 'active',
            avgRating: 4.3,
            numReviews: 189,
            createdAt: '2024-01-10',
            updatedAt: '2024-01-10'
        },
        {
            id: '3',
            title: 'Tư Duy Nhanh Và Chậm',
            slug: 'tu-duy-nhanh-va-cham',
            description: 'Khám phá cách thức hoạt động của bộ não',
            price: 200000,
            stock: 0,
            coverUrl: '',
            authors: ['Daniel Kahneman'],
            category: 'Khoa học',
            tags: ['tâm lý học', 'khoa học', 'tư duy'],
            status: 'inactive',
            avgRating: 4.7,
            numReviews: 78,
            createdAt: '2024-01-05',
            updatedAt: '2024-01-05'
        },
    ];

    const categories = [...new Set(books.map(book => book.category))];

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleAddBook = () => {
        setSelectedBook(null);
        setIsModalOpen(true);
    };

    const handleEditBook = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

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
    const renderDashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Sách bán chạy nhất</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {books.slice(0, 3).map((book) => (
                                <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">{book.title}</p>
                                        <p className="text-sm text-gray-600">{book.authors.join(', ')}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-xs text-yellow-600">★</span>
                                            <span className="text-xs text-gray-600">{book.avgRating} ({book.numReviews} đánh giá)</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600">{book.numReviews} đánh giá</p>
                                        <p className="text-sm text-gray-600">₫{book.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sách sắp hết hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {books.filter(book => book.stock < 20).map((book) => (
                                <div key={book.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                    <div>
                                        <p className="font-medium">{book.title}</p>
                                        <p className="text-sm text-gray-600">{book.authors.join(', ')}</p>
                                    </div>
                                    <Badge variant={book.stock === 0 ? "destructive" : "secondary"}>
                                        {book.stock === 0 ? 'Hết hàng' : `${book.stock} còn lại`}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    const renderBooks = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Tìm kiếm sách..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="active">Đang bán</SelectItem>
                                <SelectItem value="inactive">Tạm ngừng</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-40">
                                <Filter className="w-4 h-4 mr-2" />
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

                <Button onClick={handleAddBook} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm sách mới
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Danh sách sách ({filteredBooks.length} / {books.length})
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
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
                            {filteredBooks.map((book) => (
                                <TableRow key={book.id} className={book.status === 'inactive' ? 'opacity-60' : ''}>
                                    <TableCell className="font-medium">{book.title}</TableCell>
                                    <TableCell>{book.authors.join(', ')}</TableCell>
                                    <TableCell>{book.category}</TableCell>
                                    <TableCell>₫{book.price.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={book.stock === 0 ? "destructive" : book.stock < 20 ? "secondary" : "default"}>
                                            {book.stock}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(book.status)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★</span>
                                            <span>{book.avgRating}</span>
                                            <span className="text-gray-500 text-sm">({book.numReviews})</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleEditBook(book)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Book className="w-8 h-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">BookStore Admin</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                                Đăng xuất
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Tổng quan
                        </button>
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'books'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Quản lý sách
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orders'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Đơn hàng
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Người dùng
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'books' && renderBooks()}
                    {activeTab === 'orders' && <OrderManagement />}
                    {activeTab === 'users' && <UserManagement />}
                </div>
            </main>

            {/* Book Modal */}
            <BookManagement
                book={selectedBook}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={(bookData) => {
                    console.log('Saving book:', bookData);
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
};

export default Dashboard;