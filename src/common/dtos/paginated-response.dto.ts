import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: '전체 데이터 수', example: 100 })
  readonly totalSize: number;
  @ApiProperty({ description: '이번 응답에 포함된 데이터 수', example: 10 })
  readonly size: number;
  @ApiProperty({ description: '데이터 배열' })
  readonly data: T[];

  constructor(totalSize: number, data: T[]) {
    this.totalSize = totalSize;
    this.size = data.length;
    this.data = data;
  }
}
