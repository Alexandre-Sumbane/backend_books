import { Router } from "express";
import { CreateEbook } from "../controllers/ebook.ts/create-ebook-controller";
import { GetAllEbooks } from "../controllers/ebook.ts/findall-ebooks-controller";
import { GetEbookById } from "../controllers/ebook.ts/find-by-ebook-by-id-controller";
import { UpdateEbook } from "../controllers/ebook.ts/update-ebook-controller";
import { DeleteEbook } from "../controllers/ebook.ts/delete-ebook-controller";


export async function BookRoutes(router: Router) {
    router.post("/", CreateEbook);
    router.get("/", GetAllEbooks);
    router.get("/:ebookId", GetEbookById);
    router.put("/:ebookId", UpdateEbook);
    router.delete("/:ebookId", DeleteEbook);
}