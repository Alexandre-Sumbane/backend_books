import { get } from "axios";

export interface EarningRepository {
    getSellerEarnings(sellerId: string): Promise<{total: number}> 
    getTotalEarningsComplete(sellerId: string, token: string): Promise<any>
    
}