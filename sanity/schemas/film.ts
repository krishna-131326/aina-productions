import { defineType } from 'sanity';

export default defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
    },
  },
});