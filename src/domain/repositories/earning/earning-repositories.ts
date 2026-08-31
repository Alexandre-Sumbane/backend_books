import { get } from "axios";
import { SellerSituation } from "./sequelize-earning";

export interface EarningRepository {
    getSellerEarnings(sellerId: string): Promise<{total: number}> 
    getTotalEarningsComplete(sellerId: string, token: string): Promise<any>
    getSellerSituation(sellerId: string): Promise<SellerSituation>
}