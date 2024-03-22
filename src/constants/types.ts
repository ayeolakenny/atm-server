import { Prisma } from '@prisma/client';

export const iAuthUser = {
  select: {
    id: true,
    name: true,
    email: true,
  },
} satisfies Prisma.UserDefaultArgs;

export type IAuthUser = Prisma.UserGetPayload<typeof iAuthUser>;
