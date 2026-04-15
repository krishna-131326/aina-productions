import { defineType } from 'sanity';

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
});