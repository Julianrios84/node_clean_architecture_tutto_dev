import { GraphQL } from './graphql'

export class TuttoDataFakerGraphQL {
  private _graphQL?: GraphQL

  async start (): Promise<void> {
    const port: string = process.env.GRAPHQL_PORT ?? '2427'
    this._graphQL = new GraphQL(port)
    return this._graphQL.listen()
  }

  async stop (): Promise<void> {
    return this._graphQL?.stop()
  }
}