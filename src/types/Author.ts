

export interface AuthorAttributes {
    id: string;
    name: string;
    lastName: string;
    imageUrl?: string;
}

export interface AuthorBookAttributes {
    id: string;
    authorId: string;
    bookId: string;
}