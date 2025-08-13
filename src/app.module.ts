import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Target } from './target/target.entity';
import { User } from './user/user.entity'; // ✅ import User entity
import { TargetModule } from './target/target.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module'; // ✅ also import UserModule
import { LeafCountService } from './leaf/leaf-count.service';
import { LeafCountController } from './leaf/leaf-count.controller';
import { LeafCount } from './leaf/leaf-count.entity';
import { LeafCountModule } from './leaf/leaf-count.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.sqlite',
      synchronize: true,
      entities: [Target, User, LeafCount], // ✅ include User entity here
    }),
    TargetModule,
    UserModule,   // ✅ ensure this is also imported
    AuthModule,LeafCountModule
  ],
})
export class AppModule {}
