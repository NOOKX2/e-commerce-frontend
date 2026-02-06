"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Loader2, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { uploadToR2 } from '@/lib/r2-upload';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [availableCategories, setAvailableCategories] = useState<{ id: number; name: string }[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        cost_price: '',
        quantity: '0',
        category: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (isOpen) {
            const fetchCategories = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/seller/categories`, {
                        credentials: 'include'
                    });
                    const result = await res.json();
                    console.log("category result", result.data);
                    if (result.success) {
                        setAvailableCategories(result.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch categories:", error);
                }
            };
            fetchCategories();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let finalImageUrl = "";
            let finalImageHash = "";
            if (imageFile) {
                const { publicUrl, fileHash } = await uploadToR2(imageFile);
                finalImageUrl = publicUrl;
                finalImageHash = fileHash;
            }

            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                cost_price: parseFloat(formData.cost_price),
                quantity: parseInt(formData.quantity),
                image_url: finalImageUrl,
                image_hash: finalImageHash,
                sku: "",
                category: formData.category,
            };
            console.log("Image Url", finalImageUrl);
            const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/seller/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
                credentials: 'include'
            });

            console.log(res.body);
            if (!res.ok) throw new Error('Failed to add product');

            toast.success('Product added successfully!');
            router.refresh();
            onClose();

            setFormData({ name: '', description: '', price: '', cost_price: '', quantity: '0', category: "" });
            setImageFile(null);

        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error("error add product", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            required
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Nike Air Max"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            required
                            list='category-list'
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="e.g. Electronics, Food, Fashion"
                        />
                        <datalist id="category-list">
                            {availableCategories.map((cat) => (
                                <option key={cat.id} value={cat.name} />
                            ))}
                        </datalist>
                        <p className="text-[10px] text-gray-400 mt-1">* If category doesn't exist, it will be created automatically.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Tell more about your product..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                            <input
                                required
                                type="number"
                                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (฿)</label>
                            <input
                                required
                                type="number"
                                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (฿)</label>
                            <input
                                required
                                type="number"
                                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.cost_price}
                                onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                            />
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-all relative">
                            <div className="space-y-1 text-center">
                                {imageFile ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {imageFile.name}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setImageFile(null)}
                                            className="text-xs text-red-500 underline"
                                        >
                                            Change image
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                <span>Upload a file</span>
                                                <input
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-all font-medium flex justify-center items-center shadow-lg shadow-blue-100"
                        >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}