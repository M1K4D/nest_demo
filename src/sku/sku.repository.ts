import { EntityRepository, Repository } from "typeorm";
import { skuData } from "./skudata.entity";

@EntityRepository(skuData)
export class SkuRepository extends Repository<skuData> {}