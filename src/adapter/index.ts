import { PostgresAdapter } from './PostgresAdapter'
import { DB2Adapter } from './DB2Adapter'
import { configOptions } from '../config'

/**
 * Adapter factory returns an instance of the deployment/migration handler.
 *
 * @param {string} service
 * @param {configOptions} options
 */
const getAdapter = async (service: string, options: configOptions) => {
  await cds.connect()

  switch (cds.services[service].constructor.name) {
    case 'PostgresDatabase':
      return new PostgresAdapter(service, options)
    case 'DB2Database':
      return new DB2Adapter(service,options)  
    default:
      throw 'Unsupported database. Currently only PostgreSQL (cds-pg) and DB2 (cds-db2) is supported.'
  }
}

export default getAdapter
