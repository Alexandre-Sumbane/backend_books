import z from "zod";


export const  CreateEbookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    sinopse: z.string().min(1, { message: "Sinopse is required" }),
    code: z.string().min(1, { message: "Code is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    format: z.string().min(1, { message: "Format is required" }),
    language: z.string().min(1, { message: "Language is required" }),
    price: z.number().min(1, { message: "Price is required" }),
    pages: z.number().min(1, { message: "Pages is required" })
});   