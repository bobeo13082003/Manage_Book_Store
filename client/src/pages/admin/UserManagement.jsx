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
import { Search, Edit, Trash2, UserPlus, Filter } from 'lucide-react';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Sample data based on your User model
    const users = [
        {
            id: '1',
            username: 'nguyenvana',
            email: 'nguyenvana@email.com',
            fullName: 'Nguyễn Văn A',
            phone: '0901234567',
            address: '123 Nguyễn Huệ, Q1, TP.HCM',
            role: 0,
            status: 'active',
            avatar: { url: '', public_id: '' },
            createdAt: '2024-01-15',
            updatedAt: '2024-01-15'
        },
        {
            id: '2',
            username: 'tranthib',
            email: 'tranthib@email.com',
            fullName: 'Trần Thị B',
            phone: '0907654321',
            address: '456 Lê Lợi, Q3, TP.HCM',
            role: 1,
            status: 'active',
            avatar: { url: '', public_id: '' },
            createdAt: '2024-01-10',
            updatedAt: '2024-01-20'
        },
        {
            id: '3',
            username: 'lequangc',
            email: 'lequangc@email.com',
            fullName: 'Lê Quang C',
            phone: '0912345678',
            address: '789 Võ Văn Tần, Q1, TP.HCM',
            role: 0,
            status: 'inactive',
            avatar: { url: '', public_id: '' },
            createdAt: '2024-01-05',
            updatedAt: '2024-01-25'
        }
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === 'all' || user.role.toString() === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleBadge = (role) => {
        return role === 1 ? (
            <Badge variant="default">Quản trị</Badge>
        ) : (
            <Badge variant="secondary">Khách hàng</Badge>
        );
    };

    const getStatusBadge = (status) => {
        return status === 'active' ? (
            <Badge variant="default">Hoạt động</Badge>
        ) : (
            <Badge variant="destructive">Tạm dừng</Badge>
        );
    };
    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Tìm kiếm người dùng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Vai trò" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả vai trò</SelectItem>
                                <SelectItem value="0">Khách hàng</SelectItem>
                                <SelectItem value="1">Quản trị</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="active">Hoạt động</SelectItem>
                                <SelectItem value="inactive">Tạm dừng</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Thêm người dùng
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Danh sách người dùng ({filteredUsers.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên đăng nhập</TableHead>
                                <TableHead>Họ tên</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Số điện thoại</TableHead>
                                <TableHead>Vai trò</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Ngày tạo</TableHead>
                                <TableHead>Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.username}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone || '—'}</TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm">
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
};

export default UserManagement;