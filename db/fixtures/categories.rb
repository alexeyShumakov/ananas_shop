root_categories = [
  { id: 1, title: Faker::Commerce.department(2, true) },
  { id: 2, title: Faker::Commerce.department(2, true) },
  { id: 3, title: Faker::Commerce.department(2, true) },
  { id: 4, title: Faker::Commerce.department(2, true) }
]

descendants_categories = [
  { id: 5, title: Faker::Commerce.department(2, true), parent: Category.find(1) },
  { id: 6, title: Faker::Commerce.department(2, true), parent: Category.find(1) },
  { id: 7, title: Faker::Commerce.department(2, true), parent: Category.find(1) },
  { id: 8, title: Faker::Commerce.department(2, true), parent: Category.find(5) },
  { id: 9, title: Faker::Commerce.department(2, true), parent: Category.find(5) },
]
Category.seed(:id, root_categories)
Category.seed(:id, descendants_categories)
