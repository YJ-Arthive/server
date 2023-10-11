import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'artists' })
export class ArtistEntity {
  @PrimaryKey({ autoincrement: true })
  id?: bigint;
  @Property({ nullable: false, length: 255 })
  name: string;
  @Property({ nullable: false, length: 255 })
  field: string;
  @Property({ nullable: false, length: 255 })
  country: string;
  @Property({ nullable: true, length: 255 })
  enName?: string;
  @Property({ nullable: true, length: 2000 })
  posterUrl?: string;
  @Property({ nullable: false, onCreate: () => new Date() })
  createdAt: Date = new Date();
  @Property({ nullable: false, onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(name: string, field: string, country: string, enName?: string, posterUrl?: string) {
    this.name = name;
    this.field = field;
    this.country = country;
    this.enName = enName;
    this.posterUrl = posterUrl;
  }
}
