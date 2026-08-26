import { z } from "zod";

export const CreateLocationSchema = z.object({
  name: z.string().min(1, { message: "O nome do local é obrigatório" }),
  description: z.string().optional().default(""),
  price: z.number({ message: "Preço deve ser um número" }).positive({ message: "Preço deve ser maior que zero" }),
  estimatedTime: z.number({ message: "Tempo estimado deve ser um número" }).positive({ message: "Tempo estimado deve ser maior que zero" }),
});

export const UpdateLocationSchema = CreateLocationSchema.partial();
