import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'donation',
  title: 'Donation',
  type: 'document',
  fields: [
    defineField({
      name: 'donorName',
      title: 'Donor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pan',
      title: 'PAN',
      type: 'string',
    }),
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
    }),
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: ['pending', 'success', 'failed'],
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
