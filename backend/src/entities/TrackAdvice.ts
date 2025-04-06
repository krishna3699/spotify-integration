import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'track_advice' })
export class TrackAdvice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    track_id: string;

    @Column()
    track_name: string;

    @Column()
    track_artist: string;

    @Column('text')
    advice: string;

    @Column({
        name: 'searched_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    searched_at: Date;
}
