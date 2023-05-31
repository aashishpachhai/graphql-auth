import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: 'admin',
          database: 'nest',
        },
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [UsersModule],
      useFactory: () => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts'),
        },
        context: ({ req, res }) => ({ req, res }),
      }),
    }),
  ],
})
export class AppModule {}
