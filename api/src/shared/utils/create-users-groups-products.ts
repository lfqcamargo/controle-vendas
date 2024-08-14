const { hash } = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker')

const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany({})
  await prisma.group.deleteMany({})
  await prisma.user.deleteMany({})

  const groupTypes = [
    'Pão',
    'Vinho',
    'Destilado',
    'Doce',
    'Queijo',
    'Café',
    'Chá',
    'Cerveja',
    'Refrigerante',
    'Água',
    'Suco',
    'Chocolate',
    'Fruta',
    'Legume',
    'Verdura',
    'Carne',
    'Peixe',
    'Frango',
    'Arroz',
    'Feijão',
    'Massa',
    'Molho',
    'Temperos',
    'Salgados',
    'Doces',
    'Laticínios',
    'Sorvete',
    'Petiscos',
    'Biscoitos',
    'Conservas',
  ]

  const password = await hash('123456', 6)

  for (let i = 0; i < 5; i++) {
    let user
    if (i === 0) {
      user = await prisma.user.create({
        data: {
          name: 'Lucas Camargo',
          cpf_cnpj: faker.string.numeric(11),
          email: 'lfqcamargo@gmail.com',
          password,
        },
      })
    } else {
      user = await prisma.user.create({
        data: {
          name: faker.person.firstName() + ' ' + faker.person.lastName(),
          cpf_cnpj: faker.string.numeric(11),
          email: faker.internet.email(),
          password,
          last_login: faker.date.recent(),
        },
      })
    }

    // Loop para criar 30 grupos para cada usuário
    for (let g = 0; g < 30; g++) {
      const group = await prisma.group.create({
        data: {
          description: groupTypes[g % groupTypes.length], // Reutiliza os tipos de grupo
          user_id: user.id,
        },
      })

      // Loop para criar 50 produtos para cada grupo
      for (let j = 0; j < 50; j++) {
        await prisma.product.create({
          data: {
            description: faker.commerce.productName(),
            price_buy: parseFloat(faker.commerce.price()),
            price_sell: parseFloat(faker.commerce.price()),
            user_id: user.id,
            group_id: group.id,
          },
        })
      }
    }
  }

  console.log('Novos dados inseridos com sucesso')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
