import { EntityRepository, Repository } from "typeorm";
import { skuData } from "./entity/skudata.entity";

@EntityRepository(skuData)
export class SkuRepository extends Repository<skuData> {}