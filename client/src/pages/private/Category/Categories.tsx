import { useState } from "react";
import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import AddCategoryPrompt from "../../../components/category/AddCategoryPrompt";
import CategoryList from "../../../components/category/CategoryList";

const Categories = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <>
            <div className="mb-6">
                <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Categories</h1>
                <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
                    Organize your expenses and income with custom categories.
                </p>
            </div>

            <AddCategoryPrompt onSuccess={() => setRefreshKey((prev) => prev + 1)} />

            <CategoryList refreshKey={refreshKey} />
        </>
    );
};

export default Categories;