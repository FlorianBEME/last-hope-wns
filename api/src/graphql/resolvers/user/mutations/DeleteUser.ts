import {Context} from '../../../../context'

export default async (_: any, { userId }: { userId: string }, context:Context) => {
  const deleteUser = await context.prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return deleteUser;
};
