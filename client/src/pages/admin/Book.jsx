import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import CategoryModal from './CategoryModal';
import { getAllCategories, createCategory, updateCategory, deleteCategory, createBook, updateBook } from '../../services/Admin/ApiBook';

const BookManagement = ({ book, isOpen, onClose, onSave, getAllBook }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        coverUrl: [],
        authors: [''],
        categoryId: '',
        tags: [''],
        status: 'active',
    });
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [selectedCategoryForEdit, setSelectedCategoryForEdit] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await getAllCategories();
                const mappedCategories = response.data.map((cat) => ({
                    id: cat._id,
                    name: cat.name,
                    description: cat.description,
                    createdAt: cat.createdAt,
                    updatedAt: cat.updatedAt,
                }));
                setCategories(mappedCategories || []);
            } catch (err) {
                setError('Không thể tải danh sách danh mục.');
                toast.error('Không thể tải danh sách danh mục.');
                console.log(err);

            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();

    }, []);

    useEffect(() => {
        if (book) {
            const initialcoverUrl = Array.isArray(book.coverUrl) ? book.coverUrl.map(item => item.url || item) : [];
            setFormData({
                title: book.title || '',
                description: book.description || '',
                price: book.price !== undefined ? String(book.price) : '',
                stock: book.stock !== undefined ? String(book.stock) : '',
                coverUrl: initialcoverUrl,
                authors: book.authors && book.authors.length > 0 ? book.authors : [''],
                categoryId: book.category?._id || (typeof book.category === 'string' ? book.category : ''),
                tags: book.tags && book.tags.length > 0 ? book.tags : [''],
                status: book.status || 'active',
            });
            setPreviewImages(initialcoverUrl);
        } else {
            setFormData({
                title: '',
                description: '',
                price: '',
                stock: '',
                coverUrl: [],
                authors: [''],
                categoryId: '',
                tags: [''],
                status: 'active',
            });
            setPreviewImages([]);
        }
        setFiles([]);
        setError(null);

        setHasChanges(false);
    }, [book]);

    useEffect(() => {
        if (book) {
            const cleanedFormData = {
                ...formData,
                authors: formData.authors.filter((a) => a.trim()),
                tags: formData.tags.filter((t) => t.trim()),
                category: formData.categoryId,
                price: parseInt(formData.price) || 0,
                stock: parseInt(formData.stock) || 0,
                coverUrl: formData.coverUrl,
            };
            const initialcoverUrl = Array.isArray(book.coverUrl) ? book.coverUrl.map(item => item.url || item) : [];
            const changesDetected =
                book.title !== cleanedFormData.title ||
                book.description !== cleanedFormData.description ||
                book.price !== cleanedFormData.price ||
                book.stock !== cleanedFormData.stock ||
                book.category?._id !== cleanedFormData.category ||
                JSON.stringify(book.authors || ['']) !== JSON.stringify(cleanedFormData.authors) ||
                JSON.stringify(book.tags || ['']) !== JSON.stringify(cleanedFormData.tags) ||
                book.status !== cleanedFormData.status ||
                JSON.stringify(initialcoverUrl) !== JSON.stringify(cleanedFormData.coverUrl) ||
                files.length > 0;
            setHasChanges(changesDetected);
        }
    }, [formData, files, book]);



    useEffect(() => {
        return () => {
            previewImages.forEach((url) => {
                if (url && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previewImages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (formData.price === '' || formData.stock === '') {
            setError('Giá và số lượng tồn kho không được để trống.');
            toast.error('Giá và số lượng tồn kho không được để trống.');
            setIsLoading(false);
            return;
        }

        if (parseInt(formData.price) <= 0 || parseInt(formData.stock) < 0) {
            setError('Giá phải lớn hơn 0 và số lượng tồn kho không được âm.');
            toast.error('Giá phải lớn hơn 0 và số lượng tồn kho không được âm.');
            setIsLoading(false);
            return;
        }

        const cleanedFormData = {
            ...formData,
            authors: formData.authors.filter((a) => a.trim()),
            tags: formData.tags.filter((t) => t.trim()),
            category: formData.categoryId,
            price: parseInt(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            coverUrl: formData.coverUrl,
        };

        if (book && !hasChanges) {
            setError('Không có thay đổi để cập nhật.');
            toast.info('Không có thay đổi để cập nhật.');
            setIsLoading(false);
            return;
        }

        try {
            if (book) {
                const fd = new FormData();
                fd.append('title', cleanedFormData.title.trim());
                fd.append('description', cleanedFormData.description.trim());
                fd.append('price', cleanedFormData.price);
                fd.append('stock', cleanedFormData.stock);
                fd.append('category', cleanedFormData.category);
                cleanedFormData.authors.forEach(a => fd.append('authors', a));
                cleanedFormData.tags.forEach(t => fd.append('tags', t));
                fd.append('status', cleanedFormData.status);
                cleanedFormData.coverUrl.forEach(url => fd.append('coverUrl', url));
                files.forEach(f => fd.append('coverUrl', f));
                const res = await updateBook(book._id, fd);
                if (res.status === 200) {
                    toast.success('Cập nhật sách thành công!');
                    await getAllBook();
                }
            } else {
                const fd = new FormData();
                fd.append('title', cleanedFormData.title.trim());
                fd.append('description', cleanedFormData.description.trim());
                fd.append('price', cleanedFormData.price);
                fd.append('stock', cleanedFormData.stock);
                fd.append('category', cleanedFormData.category);
                fd.append('status', cleanedFormData.status);
                cleanedFormData.authors.forEach(a => fd.append('authors', a));
                cleanedFormData.tags.forEach(t => fd.append('tags', t));
                files.forEach(f => fd.append('coverUrl', f));
                const res = await createBook(fd);

                if (res.status === 201) {
                    toast.success('Thêm sách thành công!');
                    await getAllBook();
                    onSave(cleanedFormData);
                    onClose();
                }
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Có lỗi xảy ra khi lưu sách.';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: field === 'price' || field === 'stock' ? (value === '' ? '' : parseInt(value) || 0) : value,
        }));
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData((prev) => ({
            ...prev,
            [field]: newArray,
        }));
    };

    const addArrayItem = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ''],
        }));
    };

    const removeArrayItem = (field, index) => {
        if (formData[field].length > 1) {
            const newArray = formData[field].filter((_, i) => i !== index);
            setFormData((prev) => ({
                ...prev,
                [field]: newArray,
            }));
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        const validFiles = selectedFiles.filter(file => {
            if (!validTypes.includes(file.type)) {
                toast.error(`File ${file.name} không phải ảnh (JPEG, PNG, hoặc GIF).`);
                return false;
            }
            if (file.size > maxSize) {
                toast.error(`File ${file.name} quá lớn. Vui lòng chọn file nhỏ hơn 5MB.`);
                return false;
            }
            return true;
        });

        setFiles(prev => [...prev, ...validFiles]);
        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index, isExistingUrl = false) => {
        if (isExistingUrl) {
            setFormData(prev => ({
                ...prev,
                coverUrl: prev.coverUrl.filter((_, i) => i !== index),
            }));
            setPreviewImages(prev => prev.filter((_, i) => i !== index));
        } else {
            const fileIndex = index - formData.coverUrl.length;
            setFiles(prev => prev.filter((_, i) => i !== fileIndex));
            setPreviewImages(prev => {
                const newPreviews = prev.filter((_, i) => i !== index);
                URL.revokeObjectURL(prev[index]);
                return newPreviews;
            });
            setFormData(prev => ({
                ...prev,
                coverUrl: prev.coverUrl.filter((_, i) => i !== index),
            }));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active':
                return 'Đang kinh doanh';
            case 'inactive':
                return 'Tạm ngừng';
            default:
                return 'Không xác định';
        }
    };

    const handleCategorySave = async (categoryData) => {
        setIsLoading(true);
        setError(null);

        try {
            if (selectedCategoryForEdit) {
                await updateCategory(selectedCategoryForEdit.id, categoryData);
                setCategories((prev) =>
                    prev.map((cat) =>
                        cat.id === selectedCategoryForEdit.id
                            ? { ...cat, ...categoryData, updatedAt: new Date().toISOString() }
                            : cat
                    )
                );
                toast.success('Cập nhật danh mục thành công!');
            } else {
                const response = await createCategory(categoryData);
                const newCategory = {
                    id: response.data._id || Date.now().toString(),
                    ...categoryData,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                setCategories((prev) => [...prev, newCategory]);
                setFormData((prev) => ({ ...prev, categoryId: newCategory.id }));
                toast.success('Thêm danh mục thành công!');
            }
            setIsCategoryModalOpen(false);
            setSelectedCategoryForEdit(null);
        } catch (err) {
            const message = err.response?.data?.message || 'Có lỗi xảy ra khi lưu danh mục.';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryDelete = async (categoryId) => {
        setIsLoading(true);
        setError(null);

        try {
            await deleteCategory(categoryId);
            if (formData.categoryId === categoryId) {
                setFormData((prev) => ({ ...prev, categoryId: '' }));
            }
            setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
            toast.success('Xóa danh mục thành công!');
        } catch (err) {
            const message = err.response?.data?.message || 'Không thể xóa danh mục.';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const openCategoryModal = (category = null) => {
        setSelectedCategoryForEdit(category);
        setIsCategoryModalOpen(true);
    };

    if (!isOpen) return null;


    // const isButtonDisabled =
    //     !formData.title ||
    //     formData.authors.every((a) => !a) ||
    //     !formData.categoryId ||
    //     formData.price === '' ||
    //     formData.stock === '' ||
    //     (book && !hasChanges) ||
    //     isLoading;
    // console.log({
    //     isButtonDisabled,
    //     title: formData.title,
    //     authors: formData.authors,
    //     categoryId: formData.categoryId,
    //     price: formData.price,
    //     stock: formData.stock,
    //     hasChanges,
    //     isLoading,
    // });


    console.log('Category ID in form:', JSON.stringify(formData));

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-xl font-bold">
                            {book ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                                disabled={isLoading}
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
                                                disabled={isLoading}
                                            />
                                            <Label htmlFor="inactive" className="text-sm">Tạm ngừng kinh doanh</Label>
                                        </div>
                                        <Badge className="bg-yellow-100 text-yellow-800">Tạm dừng</Badge>
                                    </div>
                                </div>
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
                                        disabled={isLoading}
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
                                    disabled={isLoading}
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
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeArrayItem('authors', index)}
                                            disabled={formData.authors.length === 1 || isLoading}
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
                                    disabled={isLoading}
                                >
                                    Thêm tác giả
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="category">Danh mục *</Label>
                                        <div className="text-xs text-gray-500">{categories.length} danh mục</div>
                                    </div>
                                    <div className="flex gap-2">
                                        {categories.length > 0 ? (
                                            <Select
                                                value={formData.categoryId}
                                                onValueChange={(value) => handleChange('categoryId', value)}
                                                disabled={isLoading}
                                            >
                                                <SelectTrigger className="flex-1">
                                                    <SelectValue placeholder="Chọn danh mục..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-slate-800 border shadow-lg">
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            <div className="flex items-center justify-between w-full">
                                                                <span>{category.name}</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <div className="text-sm text-red-500 italic">⚠️ Chưa có danh mục nào, hãy thêm danh mục trước.</div>
                                        )}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openCategoryModal()}
                                            className="px-3"
                                            title="Thêm danh mục mới"
                                            disabled={isLoading}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    {categories.length > 0 && (
                                        <div className="mt-2">
                                            <div className="text-xs text-gray-600 mb-2">Quản lý danh mục:</div>
                                            <div className="flex flex-wrap gap-1">
                                                {categories.map((category) => (
                                                    <Badge
                                                        key={category.id}
                                                        variant="secondary"
                                                        className="cursor-pointer hover:bg-gray-200 text-xs"
                                                        onClick={() => openCategoryModal(category)}
                                                        title="Click để chỉnh sửa hoặc xóa"
                                                    >
                                                        {category.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Giá (VNĐ) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleChange('price', e.target.value)}
                                        placeholder="0"
                                        min="0"
                                        required
                                        disabled={isLoading}
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
                                        onChange={(e) => handleChange('stock', e.target.value)}
                                        placeholder="0"
                                        min="0"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="coverUrl">Ảnh bìa</Label>
                                    <Input
                                        id="coverUrl"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        disabled={isLoading}
                                    />
                                    {previewImages.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {previewImages.map((url, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={url}
                                                        alt={`Ảnh bìa ${index + 1}`}
                                                        className="w-32 h-32 object-cover rounded-md"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="absolute top-0 right-0 w-6 h-6"
                                                        onClick={() => removeImage(index, index < formData.coverUrl.length)}
                                                        disabled={isLoading}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeArrayItem('tags', index)}
                                            disabled={formData.tags.length === 1 || isLoading}
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
                                    disabled={isLoading}
                                >
                                    Thêm tag
                                </Button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Xem trước thông tin:</h4>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Tên sách:</span> {formData.title || 'Chưa nhập'}</p>
                                    <p><span className="font-medium">Tác giả:</span> {formData.authors.filter((a) => a).join(', ') || 'Chưa nhập'}</p>
                                    <p>
                                        <span className="font-medium">Danh mục:</span>{' '}
                                        {categories.find((cat) => cat.id === formData.categoryId)?.name || 'Chưa nhập'}
                                    </p>
                                    <p><span className="font-medium">Giá:</span> ₫{formData.price ? parseInt(formData.price).toLocaleString() : 'Chưa nhập'}</p>
                                    <p><span className="font-medium">Tồn kho:</span> {formData.stock ? formData.stock : 'Chưa nhập'} cuốn</p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Trạng thái:</span>
                                        <Badge className={getStatusColor(formData.status)}>{getStatusText(formData.status)}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Tags:</span>
                                        {formData.tags
                                            .filter((t) => t)
                                            .map((tag, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {tag}
                                                </Badge>
                                            ))}
                                    </div>
                                    {previewImages.length > 0 && (
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-medium">Ảnh bìa:</span>
                                            {previewImages.map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`Ảnh bìa ${index + 1}`}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    disabled={
                                        !formData.title ||
                                        formData.authors.every((a) => !a) ||
                                        !formData.categoryId ||
                                        formData.price === '' ||
                                        formData.stock === '' ||
                                        (book && !hasChanges) ||
                                        isLoading
                                    }
                                >
                                    {isLoading ? 'Đang xử lý...' : book ? 'Cập nhật' : 'Thêm sách'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <CategoryModal
                category={selectedCategoryForEdit}
                isOpen={isCategoryModalOpen}
                onClose={() => {
                    setIsCategoryModalOpen(false);
                    setSelectedCategoryForEdit(null);
                }}
                onSave={handleCategorySave}
                onDelete={handleCategoryDelete}
            />
        </>
    );
};

export default BookManagement;