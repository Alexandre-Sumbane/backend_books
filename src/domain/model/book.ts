import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '@/infra/database/config/database'
import { CoverImage } from './coverImage'
import { EbookFile } from './bookFile'

enum EbookStatus {
    pendent,
    published,
    blocked
}

export interface EBookModel {
    id: string
    title: string
    code: string
    author: string
    description: string
    price: number
    rating: number
    totalReviews: number
    categoryId: string 
    format: string
    pages?: number
    publishDate?: Date
    statePublisher?: EbookStatus
    userId?: string
}

export interface EBookDto
    extends Optional<EBookModel, 'id' | 'publishDate' | 'statePublisher'  | 'rating' | 'totalReviews'> {}


export class EBook 
    extends Model<EBookModel, EBookDto>
    implements EBookModel
{
    declare id: string
    declare title: string
    declare code: string
    declare author: string
    declare description: string
    declare price: number
    declare rating: number
    declare totalReviews: number
    declare categoryId: string
    declare format: string
    declare pages?: number
    declare publishDate?: Date
    declare statePublisher?: EbookStatus  
    declare userId?: string        
}

EBook.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        totalReviews: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "Categories",
                key: "id"
            },
            onDelete: 'CASCADE'
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pages: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        publishDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        statePublisher: {
            type: DataTypes.ENUM('pendent', 'published', 'blocked'),
            defaultValue: 'pendent',
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        }, 
               
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true,
        tableName: 'eBooks', 
    },   
)

EBook.hasOne(CoverImage, {
    sourceKey: 'id',
    foreignKey: 'ebookId',
    as: 'cover'
})

EBook.hasOne(EbookFile, {
    foreignKey: 'ebookId',
    as: 'ebookDoc'
})



