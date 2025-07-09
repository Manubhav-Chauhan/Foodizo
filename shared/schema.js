// User management
export const users = {
  id: 'integer primary key',
  email: 'varchar unique',
  firstName: 'varchar',
  lastName: 'varchar',
  phone: 'varchar',
  addresses: 'json',
  createdAt: 'timestamp default now',
  updatedAt: 'timestamp default now'
}

// Orders
export const orders = {
  id: 'integer primary key',
  userId: 'integer references users(id)',
  restaurantId: 'integer',
  items: 'json',
  totalAmount: 'decimal',
  deliveryAddress: 'json',
  status: 'varchar', // pending, confirmed, preparing, out_for_delivery, delivered, cancelled
  paymentMethod: 'varchar',
  couponCode: 'varchar',
  discount: 'decimal',
  deliveryFee: 'decimal',
  tip: 'decimal',
  estimatedDelivery: 'timestamp',
  scheduledFor: 'timestamp',
  createdAt: 'timestamp default now'
}

// User favorites
export const favorites = {
  id: 'integer primary key',
  userId: 'integer references users(id)',
  restaurantId: 'integer',
  itemId: 'integer',
  type: 'varchar', // restaurant, item
  createdAt: 'timestamp default now'
}

// Coupons
export const coupons = {
  id: 'integer primary key',
  code: 'varchar unique',
  description: 'varchar',
  discountType: 'varchar', // percentage, fixed
  discountValue: 'decimal',
  minOrderAmount: 'decimal',
  maxDiscount: 'decimal',
  validFrom: 'timestamp',
  validUntil: 'timestamp',
  usageLimit: 'integer',
  usedCount: 'integer default 0',
  isActive: 'boolean default true'
}