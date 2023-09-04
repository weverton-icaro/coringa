import { Router } from 'express'
import { CreateCoinController } from 'src/modules/coin/controllers/create/createCoin.controller'
import { DeleteCoinController } from 'src/modules/coin/controllers/delete/deleteCoin.controller'
import { GetCoinsController } from 'src/modules/coin/controllers/find/getCoins'
import { UpdateCoinController } from 'src/modules/coin/controllers/update/updateCoin'

const coinRouter = Router()

const getCoinController = new GetCoinsController()
const createCoinController = new CreateCoinController()
const updateCoinController = new UpdateCoinController()
const deleteCoinController = new DeleteCoinController()

coinRouter.get('/', getCoinController.handler)
coinRouter.post('/', createCoinController.handler)
coinRouter.post('/:id', updateCoinController.handler)
coinRouter.post('/:id', deleteCoinController.handler)

export { coinRouter }
