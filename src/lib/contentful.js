import { createClient } from "contentful";

const IS_DEV = import.meta.env.DEV;
const SPACE = import.meta.env.CONTENTFUL_SPACE_ID
const TOKEN = IS_DEV ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN : import.meta.env.CONTENTFUL_DELIVERY_TOKEN

const contentful = createClient({
  space: SPACE,
  accessToken: TOKEN,
});

async function getAllBooks() {
  const response = await contentful.getEntries({
    content_type: "bookReferencePage",
  });

  return response.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    author: item.fields.author?.fields?.name,
    coverImage: item.fields.coverImage?.fields?.file?.url,
  }));
}

async function getSingleBook(id) {
  const entry = await contentful.getEntry(id);

  return {
    title: entry.fields.title,
    coverImage: entry.fields.coverImage?.fields?.file?.url,
    description: entry.fields.description,
    author: {
      id: entry.fields.author?.sys.id,
      name: entry.fields.author?.fields?.name,
    },
  };
}

async function getAuthor(id) {
  const entry = await contentful.getEntry(id);

  return {
    name: entry.fields.name,
    avatar: {
      url: entry.fields.avatar?.fields?.file?.url,
      description: entry.fields.avatar?.fields?.description,
    },
    bio: entry.fields.bio,
    books:
      entry.fields.linkedFrom?.bookReferencePageCollection?.items?.map(
        (item) => item.fields.title
      ) || [],
  };
}

export const client = {
  getAllBooks,
  getSingleBook,
  getAuthor,
};
