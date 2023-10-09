import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'galleries' })
export class GalleryEntity {
  @PrimaryKey({ autoincrement: true })
  id?: bigint;
  @Property({ nullable: false, length: 255 })
  name: string;
  @Property({ nullable: false, length: 400 })
  address: string;
  @Property({ nullable: true, length: 255 })
  closeDay?: string;
  @Property({ nullable: true, type: 'time' })
  openTime?: Date;
  @Property({ nullable: true, type: 'time' })
  closeTime?: Date;
  @Property({ nullable: true, length: 2000 })
  posterUrl?: string;
  @Property({ nullable: true, length: 2000 })
  homepageUrl?: string;
  @Property({ nullable: false, onCreate: () => new Date() })
  createdAt: Date = new Date();
  @Property({ nullable: false, onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(
    name: string,
    address: string,
    closeDay?: string,
    openTime?: Date,
    closeTime?: Date,
    posterUrl?: string,
    homepageUrl?: string,
  ) {
    this.name = name;
    this.address = address;
    this.closeDay = closeDay;
    this.openTime = openTime;
    this.closeTime = closeTime;
    this.posterUrl = posterUrl;
    this.homepageUrl = homepageUrl;
  }
}
