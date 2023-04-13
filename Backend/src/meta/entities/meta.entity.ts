import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    emailAddress: String;

    @Column()
    metamaskId: String;

    @Column()
    fullName: String;
}
