import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Tag } from './tag.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    owner: string;
    
    @Column()
    description: string;
    
    @JoinTable({ name: 'projects_tags' })
    @ManyToMany(() => Tag, (tag: Tag) => { tag.projects }, {
        cascade: true
    })
    tags: Tag[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) return;
        this.id = uuidv4();
    }
}