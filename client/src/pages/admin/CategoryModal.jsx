import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const CategoryModal = ({ category, isOpen, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || '',
            });
        } else {
            setFormData({
                name: '',
                description: '',
            });
        }
        setShowDeleteConfirm(false);
        setError(null);
    }, [category, isOpen]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await onSave(formData);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi lưu danh mục.');
            toast.error(err.response?.data?.message || 'Có lỗi xảy ra khi lưu danh mục.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!category || !onDelete) return;
        setIsLoading(true);
        setError(null);

        try {
            await onDelete(category.id);
            setShowDeleteConfirm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Không thể xóa danh mục.');
            toast.error(err.response?.data?.message || 'Không thể xóa danh mục.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-bold">
                        {category ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {category && onDelete && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowDeleteConfirm(true)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                disabled={isLoading}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                    {showDeleteConfirm ? (
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="font-medium text-red-800 mb-2">Xác nhận xóa danh mục</h3>
                                <p className="text-sm text-red-700 mb-4">
                                    Bạn có chắc chắn muốn xóa danh mục "<strong>{category?.name}</strong>" không? Hành động này không thể hoàn tác.
                                </p>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                                    <p className="text-sm text-yellow-700">
                                        ⚠️ <strong>Lưu ý:</strong> Việc xóa danh mục có thể ảnh hưởng đến các sách đang sử dụng danh mục này.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1"
                                    disabled={isLoading}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Đang xóa...' : 'Xóa danh mục'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Tên danh mục *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="Nhập tên danh mục..."
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Mô tả</Label>
                                <Input
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="Nhập mô tả danh mục..."
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Xem trước thông tin:</h4>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Tên danh mục:</span> {formData.name || 'Chưa nhập'}</p>
                                    <p><span className="font-medium">Mô tả:</span> {formData.description || 'Chưa nhập'}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    disabled={!formData.name || isLoading}
                                >
                                    {isLoading ? 'Đang xử lý...' : category ? 'Cập nhật' : 'Thêm danh mục'}
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default CategoryModal;