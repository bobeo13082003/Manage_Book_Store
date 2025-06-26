import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';

const BookManagement = ({ book, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        price: 0,
        stock: 0,
        coverUrl: '',
        authors: [''],
        category: '',
        tags: [''],
        status: 'active',
    });
    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                slug: book.slug,
                description: book.description || '',
                price: book.price,
                stock: book.stock,
                coverUrl: book.coverUrl || '',
                authors: book.authors,
                category: book.category,
                tags: book.tags,
                status: book.status,
            });
        } else {
            setFormData({
                title: '',
                slug: '',
                description: '',
                price: 0,
                stock: 0,
                coverUrl: '',
                authors: [''],
                category: '',
                tags: [''],
                status: 'active',
            });
        }
    }, [book]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData(prev => ({
            ...prev,
            [field]: newArray
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        if (formData[field].length > 1) {
            const newArray = formData[field].filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                [field]: newArray
            }));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active': return 'Đang kinh doanh';
            case 'inactive': return 'Tạm ngừng';
            default: return 'Không xác định';
        }
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-bold">
                        {book ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Status Section */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <Label className="text-base font-medium mb-3 block">Trạng thái kinh doanh</Label>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="active"
                                            name="status"
                                            value="active"
                                            checked={formData.status === 'active'}
                                            onChange={(e) => handleChange('status', e.target.value)}
                                            className="w-4 h-4 text-green-600"
                                        />
                                        <Label htmlFor="active" className="text-sm">Đang kinh doanh</Label>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="inactive"
                                            name="status"
                                            value="inactive"
                                            checked={formData.status === 'inactive'}
                                            onChange={(e) => handleChange('status', e.target.value)}
                                            className="w-4 h-4 text-yellow-600"
                                        />
                                        <Label htmlFor="inactive" className="text-sm">Tạm ngừng kinh doanh</Label>
                                    </div>
                                    <Badge className="bg-yellow-100 text-yellow-800">Tạm dừng</Badge>
                                </div>
                            </div>

                            {formData.status === 'inactive' && (
                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <p className="text-sm text-yellow-700">
                                        ⚠️ Sách tạm ngừng kinh doanh sẽ không hiển thị cho khách hàng mới nhưng vẫn có thể quản lý.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Tên sách *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="Nhập tên sách..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug *</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => handleChange('slug', e.target.value)}
                                    placeholder="ten-sach-khong-dau..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Mô tả</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                placeholder="Nhập mô tả sách..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Tác giả *</Label>
                            {formData.authors.map((author, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={author}
                                        onChange={(e) => handleArrayChange('authors', index, e.target.value)}
                                        placeholder="Nhập tên tác giả..."
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeArrayItem('authors', index)}
                                        disabled={formData.authors.length === 1}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addArrayItem('authors')}
                            >
                                Thêm tác giả
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Danh mục *</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    placeholder="Nhập danh mục..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Giá (VNĐ) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="stock">Số lượng tồn kho *</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverUrl">URL ảnh bìa</Label>
                                <Input
                                    id="coverUrl"
                                    value={formData.coverUrl}
                                    onChange={(e) => handleChange('coverUrl', e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tags</Label>
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={tag}
                                        onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                                        placeholder="Nhập tag..."
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeArrayItem('tags', index)}
                                        disabled={formData.tags.length === 1}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addArrayItem('tags')}
                            >
                                Thêm tag
                            </Button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Xem trước thông tin:</h4>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Tên sách:</span> {formData.title || 'Chưa nhập'}</p>
                                <p><span className="font-medium">Tác giả:</span> {formData.authors.filter(a => a).join(', ') || 'Chưa nhập'}</p>
                                <p><span className="font-medium">Danh mục:</span> {formData.category || 'Chưa nhập'}</p>
                                <p><span className="font-medium">Giá:</span> ₫{formData.price.toLocaleString()}</p>
                                <p><span className="font-medium">Tồn kho:</span> {formData.stock} cuốn</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Trạng thái:</span>
                                    <Badge className={getStatusColor(formData.status)}>
                                        {getStatusText(formData.status)}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Tags:</span>
                                    {formData.tags.filter(t => t).map((tag, index) => (
                                        <Badge key={index} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                disabled={!formData.title || !formData.slug || formData.authors.every(a => !a) || !formData.category}
                            >
                                {book ? 'Cập nhật' : 'Thêm sách'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookManagement;
