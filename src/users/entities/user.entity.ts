import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey({ autoincrement: true })
  id?: bigint;
  @Property({ length: 30, nullable: false })
  name: string;
  @Property({ length: 255, nullable: false })
  emailAddress: string;
  @Property({ length: 255, nullable: false })
  password: string;
  @Property({ length: 11, nullable: false })
  phoneNumber: string;
  @Property({ type: 'enum', nullable: false })
  status: 'IN_USE' | 'DELETED';
  @Property({ onCreate: () => new Date(), nullable: false })
  createdAt: Date;
  @Property({ onUpdate: () => new Date(), nullable: false })
  updatedAt: Date;
  @Property({ nullable: true })
  deletedAt: Date;

  constructor(name: string, emailAddress: string, password: string, phoneNumber: string) {
    dayjs.extend(utc);
    this.name = name;
    this.emailAddress = emailAddress;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.createdAt = dayjs().toDate();
    this.updatedAt = dayjs().toDate();
    this.status = 'IN_USE';
  }

  deleteAccount() {
    dayjs.extend(utc);
    this.status = 'DELETED';
    this.deletedAt = dayjs().toDate();
  }
}
