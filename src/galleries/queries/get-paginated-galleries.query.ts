export class GetPaginatedGalleriesQuery {
  constructor(
    readonly page: number = 1,
    readonly size: number = 10,
  ) {}
}
