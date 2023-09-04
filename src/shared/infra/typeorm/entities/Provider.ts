import moment from 'moment-timezone'

import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('providers')
export class Provider {
    @PrimaryGeneratedColumn()
    id: number

    @Column('longtext')
    slug: string

    @Column()
    name: string

    @Column()
    module: string

    @Column('longtext')
    url: string

    @Column()
    public_key: string

    @Column()
    able: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    insertCreated() {
        this.createdAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
        this.updatedAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updatedAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
    }
}
