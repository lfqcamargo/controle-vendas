import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileService } from '@/modules/user/factories/make-get-user-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  })
}
