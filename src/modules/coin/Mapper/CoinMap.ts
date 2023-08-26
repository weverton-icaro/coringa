import { Coin } from "src/shared/infra/typeorm/entities/Coin";
import { ICoinResponse } from "../interfaces/ICoinResponse";
import { instanceToInstance } from "class-transformer";

export class CoinMap {
  static toDTO({ id, type, isEnabled }: Coin): ICoinResponse {
    const coin = instanceToInstance({ id, type, isEnabled });
    return coin;
  }
}