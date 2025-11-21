//Seed Category about  farmers products
import { Category } from "../models/categoryModel";

export const seedCategories = async () => {
    try {
        const categories = [    
            { name: "Fruits", description: "Fresh fruits from local farms" },
            { name: "Vegetables", description: "Organic and fresh vegetables" },
            { name: "Grains", description: "Various types of grains and cereals" },
            { name: "Dairy", description: "Milk, cheese, and other dairy products" },
            { name: "Meat", description: "Fresh and processed meat products" }
        ];

        for (const categoryData of categories) {
            const existingCategory = await Category.findOne({ name: categoryData.name });
            if (!existingCategory) {
                await Category.create(categoryData);
                console.log(`Seeded category: ${categoryData.name}`);
            } else {
                console.log(`Category already exists: ${categoryData.name}`);
            }
        }
    } catch (error) {
        console.error("Error seeding categories:", error);
    }
};