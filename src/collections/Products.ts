import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Product Name',
      type: 'text',
      required: true,
    },
    {
      name: 'Product Description',
      type: 'text',
      required: true,
    },
    {
      name: 'Product Price',
      type: 'number',
      required: true,
    },
    {
      name: 'Product Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
