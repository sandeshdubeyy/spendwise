import { useEffect, useState } from "react";
import { Card, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { Trash } from "lucide-react";
import { deleteCategory, getCategory, type Category } from "../../services/category.services";

interface CategoryListProps {
    refreshKey?: number;
}

const SkeletonRow = () => (
    <tr>
        <td className="px-4 py-4">
            <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </td>
        <td className="px-4 py-4">
            <div className="ml-auto h-3 w-6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </td>
    </tr>
);

const CategoryList = ({ refreshKey = 0 }: CategoryListProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getCategory();
                setCategories(data);
            } catch {
                setError("Couldn't load categories.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [refreshKey]);

    const handleDelete = async (categoryId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (!confirmed) return;

        try {
            await deleteCategory(categoryId);
            const data = await getCategory();
            setCategories(data);
        } catch {
            window.alert("Couldn't delete the category. Please try again.");
        }
    };

    return (
        <Card className="mt-6">
            <CardHeader>
                <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
                    All Categories
                </h3>
            </CardHeader>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className={cn("border-b", COLORS.cardBorder)}>
                            <th
                                className={cn(
                                    "px-4 py-3 text-xs font-medium uppercase tracking-wider",
                                    COLORS.textMuted
                                )}
                            >
                                Category Name
                            </th>
                            <th
                                className={cn(
                                    "px-4 py-3 text-right text-xs font-medium uppercase tracking-wider",
                                    COLORS.textMuted
                                )}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : error ? (
                            <tr>
                                <td colSpan={1} className={cn("px-4 py-8 text-center text-sm", COLORS.danger)}>
                                    {error}
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan={1} className={cn("px-4 py-8 text-center text-sm", COLORS.textMuted)}>
                                    No categories yet. Add your first one above.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr
                                    key={category._id}
                                    className="transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                >
                                    <td className={cn("px-4 py-4 font-medium capitalize", COLORS.textPrimary)}>
                                        {category.name}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(category._id)}
                                                className="rounded p-1.5 transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                                                aria-label="Delete category"
                                            >
                                                <Trash size={16} className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default CategoryList;