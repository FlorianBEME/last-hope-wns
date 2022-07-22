import { Context } from "../../../resolvers/types";

export default async (
  _obj: any,
  { userId }: { userId: string },
  context: Context
) => {
  const result = await context.prisma.notification.findMany({
    where: { user_id: userId },
    include: {
      user: true,
    },
  });

  return result;
};
