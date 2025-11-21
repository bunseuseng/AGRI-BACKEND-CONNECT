// 
export interface ICategory extends Document {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}