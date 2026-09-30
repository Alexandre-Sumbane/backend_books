import z from "zod";

const isMissing = (input: unknown) =>
  input === undefined || input === null || input === "";

const requiredString = (label: string) =>
  z
    .string({
      error: (issue) =>
        isMissing(issue.input)
          ? `O campo "${label}" é obrigatório.`
          : `O campo "${label}" deve ser um texto.`,
    })
    .trim()
    .min(1, { error: `O campo "${label}" é obrigatório.` });

const requiredPositiveNumber = (label: string) =>
  z.preprocess(
    (value) => (isMissing(value) ? undefined : Number(value)),
    z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? `O campo "${label}" é obrigatório.`
            : `O campo "${label}" deve ser um número válido.`,
      })
      .min(1, { error: `O campo "${label}" deve ser maior que 0.` }),
  );

const requiredEnum = <const T extends readonly [string, ...string[]]>(
  label: string,
  values: T,
) =>
  z.enum(values, {
    error: (issue) =>
      isMissing(issue.input)
        ? `O campo "${label}" é obrigatório.`
        : `O campo "${label}" é inválido. Valores aceites: ${values.join(", ")}.`,
  });

export const CreateEbookSchema = z.object({
  title: requiredString("title"),
  sinopse: requiredString("sinopse"),
  code: requiredString("code"),
  description: requiredString("description"),
  author: requiredString("author"),
  categoryId: requiredString("categoryId"),
  format: requiredEnum("format", ["pdf", "physical"]),
  language: requiredString("language"),
  price: requiredPositiveNumber("price"),
  pages: requiredPositiveNumber("pages"),
  type: requiredEnum("type", ["used", "new", "ebook"]).optional(),
});
