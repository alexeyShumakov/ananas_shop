Category.seed(:id,
  { id: 1, title: Faker::Commerce.department(2, true) },
  { id: 2, title: Faker::Commerce.department(2, true) },
  { id: 3, title: Faker::Commerce.department(2, true) },
  { id: 4, title: Faker::Commerce.department(2, true) }
)

Category.seed(:id, { id: 5, title: Faker::Commerce.department(2, true), parent: Category.find(1) })
Category.seed(:id,
  { id: 6, title: Faker::Commerce.department(2, true), parent: Category.find(1) },
  { id: 7, title: Faker::Commerce.department(2, true), parent: Category.find(1) },
  { id: 8, title: Faker::Commerce.department(2, true), parent: Category.find(5) },
  { id: 9, title: Faker::Commerce.department(2, true), parent: Category.find(5) }
)
