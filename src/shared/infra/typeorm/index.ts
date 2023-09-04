import AppError from 'src/http/error/AppError'
import { ConnectionOptions, createConnection } from 'typeorm'
import config from '../../../../ormconfig'

export const dataBaseConnection = createConnection(config as ConnectionOptions)
    .then(() => console.log('Banco de dados conectado com sucesso'))
    .catch(error => {
        console.log(`Error:${error}`)
        throw new AppError(`Não foi possível conectar ao banco de dados! \n ${error.message}`)
    })
