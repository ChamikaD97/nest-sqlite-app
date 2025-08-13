import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Target } from './target/target.entity';
import { User } from './user/user.entity'; // ✅ import User entity
import { TargetModule } from './target/target.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module'; // ✅ also import UserModule
import { LeafCount } from './leaf/leaf-count.entity';
import { LeafCountModule } from './leaf/leaf-count.module';
import { FacLineModule } from './lines/facLine.module';
import { FacLine } from './lines/facLine.entity';
import { OfficerModule } from './officers/officer.module';
import { Officer } from './officers/officer.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.sqlite',
      synchronize: true,
      entities: [Target, User, Officer,LeafCount,FacLine], // ✅ include User entity here
    }),
    TargetModule,OfficerModule,
    UserModule,   // ✅ ensure this is also imported
    AuthModule,LeafCountModule,FacLineModule
  ],
})
export class AppModule {}
