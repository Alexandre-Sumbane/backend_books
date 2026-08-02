import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z.string().min(4, { message: "O nome da categoria é obrigatorio!" }),
    description: z.string().optional().default(""),
    imageUrl: z.string().optional().default(""),
});